import {NuwaWidget} from "../../nuwa";
import {DefaultEvents} from "../properties";
import {Cell, ObjectExt} from "@antv/x6";
import {ImageSvgBase64} from "./image_svg";
import {isUndefined} from "lodash-es";

export const MiscImage: NuwaWidget = {
    name: '图片', id: ':image:',
    icon: ImageSvgBase64,
    type: "shape",
    extends: {
        //inherit: 'image',
        markup: [
            {
                tagName: 'image',
                selector: 'image',
            }
        ],
        attrs: {
            image: {
                refWidth: '100%',
                refHeight: '100%',
            },
        },
        propHooks:(metadata:Cell.Metadata)=>{
            if (!isUndefined(metadata.data?.value)) {
                let img = metadata.data?.value ? metadata.data.on : metadata.data.off
                ObjectExt.setByPath(metadata, "attrs/image/xlink:href", img)
            }
            return metadata
        }
    },
    events: [
        ...DefaultEvents,
    ],
    metadata: {
        width: 100, height: 100,
        attrs: {
            image: {
                "xlink:href": ImageSvgBase64
            }
        }
    },
    properties: [
        {label: "图片", key: "attrs/image/xlink:href", type: "file"},
        {
            label: "缩放", key: "attrs/image/preserveAspectRatio", type: "select", options: [
                {label: "居中", value: "xMidYMid meet"},
                {label: "拉伸", value: "none"},
            ], default: "xMidYMid meet"
        },
    ]
}
