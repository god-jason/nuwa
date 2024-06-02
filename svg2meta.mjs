import fs from "fs"
import path from "path"
import xml2js from 'xml2js'
import camelCase from 'camelcase';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const svg2Path = require('./svg2path.js')

const input = process.argv[2] || '.'
const output = process.argv[3]

const prefix = ""
let allPath = "";

console.log('convert', input, output)

const stat = fs.statSync(input)
if (stat.isFile()) {
    convert(input).then()
} else {
    let files = fs.readdirSync(input)
    files.forEach(async file => {
        const filename = path.join(input, file)
        const stat = fs.statSync(filename)
        const ext = path.extname(file)
        if (stat.isFile() && ext === ".svg") {
            await convert(filename)
        }
    })
}

async function convert(filename) {
    const ext = path.extname(filename)
    const base = path.basename(filename, ext)
    const out = path.join(output || path.dirname(filename), base + '.meta.ts')

    fs.writeFileSync(out, "//!!! Generated by svg2meta.mjs\n")
    fs.appendFileSync(out, `// From ${filename} \n`)

    let variable = prefix + base + "_meta"
    variable = camelCase(variable, { pascalCase: true })

    fs.appendFileSync(out, `export const  ${variable} = `)
    let meta = await parseSvg(filename)
    const content = JSON.stringify(meta, undefined, '\t')

    fs.appendFileSync(out, content)
    fs.appendFileSync(out, "\n")
}


const tags = ["path", "rect", "line", "circle", "ellipse", "polyline", "polygon"]

//number, string
const refs = {
    "d": 1, //path
    // "x": 1, "y": 1, "width": 1, "height": 1, //rect
    // "x1": 1, "y1": 1, "x2": 1, "y2": 1, //line
    // "rx": 1, "ry": 1, "cx": 1, "cy": 1, //ellipse
    // "r": 1, //circle
    // "points": 1, //poly
    "fill": 0,
    "stroke": 0,
    "stroke-width": 0,
    "stroke-linecap": 0,
    "stroke-linejoin": 0,
}

function parseRefs(xml) {
    const attrs = {}

    for (let ref in refs) {
        if (!refs.hasOwnProperty(ref)) continue
        let type = refs[ref]

        if (xml.hasOwnProperty(ref)) {
            const value = xml[ref]

            const key = type === 1 ? camelCase('ref-' + ref) : ref
            attrs[key] = value
            if (type === 1) {
                allPath += `${value},`;
            }
            if (/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(value))
                attrs[key] = parseFloat(value)
        }
    }

    return attrs
}

async function parseSvg(filename) {
    const content = fs.readFileSync(filename)
    const parser = new xml2js.Parser();
    const obj = await parser.parseStringPromise(content.toString())
    //console.dir(obj.svg)
    console.log("parse", filename, obj.svg.$)
    allPath = "";
    const markup = {
        width: parseInt(obj.svg.$.width) || 100,
        height: parseInt(obj.svg.$.height) || 100,
        viewBox: obj.svg.$.viewBox,
        version: obj.svg.$.version,
        xmlns: obj.svg.$.xmlns,
        "xmlns:xlink": obj.svg.$['xmlns:xlink'],
        fill: obj.svg.$.fill,
        stroke: obj.svg.$.stroke,
        "stroke-linecap'": obj.svg.$['stroke-linecap'],
        "stroke-linejoin'": obj.svg.$['stroke-linejoin'],
        "stroke-width": obj.svg.$['stroke-width'],
        markup: [],
        attrs: {},
    }

    let i = 1

    const tag = 'path';
    function parse(obj) {
        for (let k in obj) {
            if (!obj.hasOwnProperty(k)) continue
            //群组调用子级
            if (k === "g") obj[k].forEach(gg => parse(gg))
            if (tags.indexOf(k) === -1) continue
            obj[k].forEach(s => {
                markup.markup.push({
                    tagName: tag,
                    selector: tag + i,
                    groupSelector: 'all'
                    //attrs: parseRefs(s.$)
                })
                s.$.d = svg2Path(k, s.$);//把所有标签转成path  返回路径
                // markup.attrs[k + i] = parseRefs(s.$)
                markup.attrs[tag + i] = parseRefs(s.$)

                i++
            })
        }
    }

    parse(obj.svg)
    markup.path = allPath;
    return markup
}
