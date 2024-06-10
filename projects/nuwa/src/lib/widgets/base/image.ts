import {NuwaComponent} from "../../nuwa";
import {DefaultEvents} from "../properties";
import {ImageSvgBase64} from "./image_svg";

export const BaseImage: NuwaComponent = {
    name: '图片',
    id: 'image',
    icon: ImageSvgBase64, //icon: "assets/widgets/image.svg",
    type: "shape", internal: true,
    extends: {inherit: 'image'},
    events: [
        ...DefaultEvents,
    ],
    metadata: {
        width: 100, height: 80,
        imageUrl: ImageSvgBase64,//"assets/widgets/image.svg",
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
