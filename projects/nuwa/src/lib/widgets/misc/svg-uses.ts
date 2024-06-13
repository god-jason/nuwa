import {NuwaComponent} from "../../nuwa";
import {ImagesSvgBase64} from "./images_svg";
import {DefaultEvents} from "../properties";

export const SvgUses: NuwaComponent = {
    name: 'Svg图集',
    id: ':svg-uses:',
    icon: ImagesSvgBase64,
    type: "shape",
    extends: {
        markup: [
            {
                tagName: 'use',
                selector: 'image'
            },
        ],
        attrs: {
            image:{
                //"xlink:href": "",
                preserveAspectRatio: "none meet",
                stroke: 'black',
                refWidth: '100%',
                refHeight: '100%',
            }
        }
    },
    events: [
        ...DefaultEvents,
    ],
    metadata: {
        width: 200,
        height: 200,
        data: {
            value: false,
        }
    },
    properties: [
        {label: "图片集", key: "data/urls", type: "files"},
        {label: "颜色", key: "attrs/image/stroke", type: "color"},
    ],
    listeners: {
    },
    bindings: [
        {name: 'value', label: "顺序", type: "number"},
    ],
    hooks: {
        value(cell, value: number) {
            //设置值
            //cell.setPropByPath("data/value", value)
            //更新图片
            let images = cell.getPropByPath("data/urls") as string[]

            //更新图片
            cell.setPropByPath("attrs/image/xlink:href", images[value])
        }
    },
}
