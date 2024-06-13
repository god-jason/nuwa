import {NuwaComponent} from "../../nuwa";
import {DefaultEvents} from "../properties";
import {Cell} from "@antv/x6";
import {ImagesSvgBase64} from "./images_svg";

export const Images: NuwaComponent = {
    name: '开关图', id: ':images:',
    icon: ImagesSvgBase64,
    type: "shape",
    extends: {inherit: 'image'},
    events: [
        ...DefaultEvents,
    ],
    metadata: {
        width: 100, height: 100,
        imageUrl: ImagesSvgBase64,//"assets/widgets/image.svg",
        data: {
            value: false,
        }
    },
    properties: [
        {key: "data/urls", label: "图片集", type: "files"},
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

export function createImages(urls: string[]): NuwaComponent {
    return {
        name:'开关', id: ':images:',
        icon: urls[0],
        type: "shape",
        extends: {inherit: 'image'},
        metadata: {
            width:100, height:100, imageUrl: urls[0],
            data: {urls, value: false}
        },
    }
}


