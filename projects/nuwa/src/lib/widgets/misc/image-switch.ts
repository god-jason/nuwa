import {NuwaComponent} from "../../nuwa";
import {DefaultEvents} from "../properties";
import {Cell} from "@antv/x6";
import {ImageSwitchOffSvgBase64} from "./image-switch-off_svg";
import {ImageSwitchOnSvgBase64} from "./image-switch-on_svg";

export const ImageSwitch: NuwaComponent = {
    name: '开关', id: ':image-switch:',
    icon: ImageSwitchOffSvgBase64, //icon: "assets/widgets/image.svg",
    type: "shape",
    extends: {inherit: 'image'},
    events: [
        ...DefaultEvents,
        {name: "change", label: "变化"},
    ],
    metadata: {
        width: 100, height: 100,
        imageUrl: ImageSwitchOffSvgBase64,//"assets/widgets/image.svg",
        data: {
            on: ImageSwitchOnSvgBase64,
            off: ImageSwitchOffSvgBase64,
            value: false,
        }
    },
    properties: [
        //{label: "开关", key: "data/value", type: "switch", default: false},
    ],
    listeners: {
        click(cell: Cell, event: Event) {
            //翻转
            let value = !cell.getPropByPath("data/value")
            //设置值
            cell.setPropByPath("data/value", value)
            //更新图片
            let img = cell.getPropByPath(value ? "data/on" : "data/off")
            cell.setPropByPath("attrs/image/xlink:href", img)

            //回传
            //@ts-ignore
            this.handleEvent(cell, "change", value)
        }
    },
    bindings: [
        {name: 'value', label: "开关", default: ''},
    ],
    hooks: {
        value(cell, value) {
            //设置值
            cell.setPropByPath("data/value", value)
            //更新图片
            let img = cell.getPropByPath(value ? "data/on" : "data/off")
            cell.setPropByPath("attrs/image/xlink:href", img)
        }
    },
}

export function createImageSwitch(name: string, id: string,
                                  width: number, height: number,
                                  on: string, off: string): NuwaComponent {
    return {
        name, id,
        icon: off,
        type: "shape",
        extends: {inherit: 'image'},
        events: [
            ...DefaultEvents,
            {name: "change", label: "变化"},
        ],
        metadata: {
            width, height, imageUrl: off,
            data: {on, off, value: false}
        },
        properties: [
            //{label: "开关", key: "data/value", type: "switch", default: false},
        ],
        listeners: {
            click(cell: Cell, event: Event) {
                //翻转
                let value = !cell.getPropByPath("data/value")

                //设置值
                cell.setPropByPath("data/value", value)

                //更新图片
                let img = cell.getPropByPath(value ? "data/on" : "data/off")
                cell.setPropByPath("attrs/image/xlink:href", img)

                //回传
                //@ts-ignore
                this.handleEvent(cell, "change", value)
            }
        },
        bindings: [
            {name: 'value', label: "开关", default: ''},
        ],
        hooks: {
            value(cell, value) {
                //设置值
                cell.setPropByPath("data/value", value)
                //更新图片
                let img = cell.getPropByPath(value ? "data/on" : "data/off")
                cell.setPropByPath("attrs/image/xlink:href", img)
            }
        },
    }
}


