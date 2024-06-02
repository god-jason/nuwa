import {SmartField, SmartSelectOption} from "iot-master-smart";
import {NuwaEvent} from "../nuwa";

const fontFamilies: SmartSelectOption[] = [
    {value: "SimHei", label: "黑体"},
    {value: "SimSun", label: "宋体"},
    {value: "FangSong", label: "仿宋"},
    {value: "KaiTi", label: "楷体"},
    {value: "LiSu", label: "隶书"},
    {value: "YouYuan", label: "幼圆"},
]

const fontWeights: SmartSelectOption[] = [
    {value: "lighter", label: "细"},
    {value: "normal", label: "正常"},
    {value: "bold", label: "粗"},
    {value: "bolder", label: "加粗"},
]

const fontStyles: SmartSelectOption[] = [
    {value: "normal", label: "正常"},
    {value: "italic", label: "斜体"},
]

export var DefaultEvents: NuwaEvent[] = [
    {name: "click", label: "点击"},
]

export function RadiusProperties(id: string): SmartField[] {
    return [
        {label: "X圆角", key: `attrs/${id}/rx`, type: "number", min: 0, max: 65535},
        {label: "Y圆角", key: `attrs/${id}/ry`, type: "number", min: 0, max: 65535},
    ]
}

export function LineProperties(id: string, prefix: string = ""): SmartField[] {
    return [
        {label: prefix + "边框颜色", key: `attrs/${id}/stroke`, type: "color", clear: true},
        {label: prefix + "边框大小", key: `attrs/${id}/strokeWidth`, type: "number", min: 0, max: 65535},
        {
            label: prefix + "边框线形", key: `attrs/${id}/strokeDasharray`, type: "select", default: '', options: [
                {value: "", label: "实线"},
                {value: "5 5", label: "虚线1"},
                {value: "10 10", label: "虚线2"},
                {value: "15 15", label: "虚线3"},
                {value: "20 20", label: "虚线4"},
                {value: "30 30", label: "虚线5"},
                {value: "50 50", label: "虚线6"},
                {value: "80 80", label: "虚线7"},
            ]
        },
    ]
}

export function StrokeProperties(id: string, prefix: string = ""): SmartField[] {
    return [
        {label: prefix + "填充颜色", key: `attrs/${id}/fill`, type: "color", clear: true},
        {label: prefix + "边框颜色", key: `attrs/${id}/stroke`, type: "color", clear: true},
        {label: prefix + "边框大小", key: `attrs/${id}/strokeWidth`, type: "number", min: 0, max: 65535},
        {
            label: prefix + "边框线形", key: `attrs/${id}/strokeDasharray`, type: "select", default: '', options: [
                {value: "", label: "实线"},
                {value: "5 5", label: "虚线1"},
                {value: "10 10", label: "虚线2"},
                {value: "15 15", label: "虚线3"},
                {value: "20 20", label: "虚线4"},
                {value: "30 30", label: "虚线5"},
                {value: "50 50", label: "虚线6"},
                {value: "80 80", label: "虚线7"},
            ]
        },
        // {
        //     label: "边框动画", key: `attrs/${id}/style/animation`, type: "select", default: '', options: [
        //         {value: "", label: "无"},
        //         {value: "line-flow-animation 30s infinite linear", label: "测试"},
        //     ]
        // },
    ]
}

export const TextProperties: SmartField[] = [
    {label: "文本", key: "attrs/text/text", type: "text", max: 200},
    {label: "颜色", key: "attrs/text/fill", type: "color", clear: true},
    {label: "字号", key: "attrs/text/fontSize", type: "number", min: 0, max: 65535, default: 16},
    {label: "字体", key: "attrs/text/fontFamily", type: "select", options: fontFamilies, default: "SimHei"},
    {label: "加粗", key: "attrs/text/fontWeight", type: "select", options: fontWeights, default: "normal"},
    {label: "风格", key: "attrs/text/fontStyle", type: "select", options: fontStyles, default: "normal"},
    // {
    //     label: "对齐", key: "attrs/text/textAnchor", type: "select", default: "middle", options: [
    //         {value: "start", label: "左对齐"},
    //         {value: "middle", label: "居中对齐"},
    //         {value: "end", label: "右对齐"},
    //     ]
    // },
]
