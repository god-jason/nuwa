import {NuwaComponent} from "../../nuwa";
import {DefaultEvents} from "../properties";
import {Cell} from "@antv/x6";
import {ImageSwitchOffSvgBase64} from "./image-switch-off_svg";

export const SvgUseSwitch: NuwaComponent = {
    name: '开关图', id: ':svg-use-switch:',
    icon: ImageSwitchOffSvgBase64, //icon: "assets/widgets/image.svg",
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
        {name: "change", label: "变化"},
    ],
    metadata: {
        width: 200,
        height: 200,
    },
    properties: [
        {label: "颜色", key: "attrs/image/stroke", type: "color"},
        {label: "开关响应", key: "data/switch", type: "switch", default: false},
        {label: "通", key: "data/on", type: "file"},
        {label: "断", key: "data/off", type: "file"},
    ],
    listeners: {
        click(cell: Cell, event: Event) {
            //开关响应
            if (!cell.getPropByPath("data/switch"))
                return

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
        {name: 'value', label: "开关"},
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
