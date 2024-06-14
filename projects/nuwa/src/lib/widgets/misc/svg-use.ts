import {NuwaWidget} from "../../nuwa";
import {DefaultEvents} from "../properties";
import {ImageSvgBase64} from "./image_svg";

export const SvgUse: NuwaWidget = {
    name: 'Svg图片',
    id: ':svg-use:',
    icon: ImageSvgBase64,
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
    },
    properties: [
        {label: "图片", key: "attrs/image/xlink:href", type: "file"},
        {label: "颜色", key: "attrs/image/stroke", type: "color"},
    ]
}

