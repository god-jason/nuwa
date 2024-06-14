import {NuwaComponent} from "../../nuwa";
import {ImagesSvgBase64} from "./images_svg";
import {DefaultEvents} from "../properties";
import {Cell, ObjectExt} from "@antv/x6";
import {isUndefined} from "lodash-es";

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
            },
        },
        propHooks:(metadata:Cell.Metadata)=>{
            let index = metadata.data?.value
            if (!isUndefined(index)) {
                let images = metadata.data.urls as string[]
                let img = images[index]
                //更新图片
                if (img) ObjectExt.setByPath(metadata, "attrs/image/xlink:href", img)
            }
            return metadata
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
        },
        attrs: {
            image: {
                "xlink:href": ImagesSvgBase64
            }
        }
    },
    properties: [
        {label: "顺序", key: "data/value", type: "number"},
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
            let images = cell.data.urls as string[]
            //更新图片
            cell.setPropByPath("attrs/image/xlink:href", images[value])
        }
    },
}
