import {NuwaWidget} from "../../nuwa";
import {DefaultEvents} from "../properties";
import {Cell, ObjectExt} from "@antv/x6";
import {ImageSwitchOffSvgBase64} from "./image-switch-off_svg";
import {ImageSwitchOnSvgBase64} from "./image-switch-on_svg";
import {isUndefined} from "lodash-es";

export const SvgUseSwitch: NuwaWidget = {
    name: 'Svg开关图', id: ':svg-use-switch:',
    icon: ImageSwitchOffSvgBase64,
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
            if (!isUndefined(metadata.data?.value)) {
                let img = metadata.data?.value ? metadata.data.on : metadata.data.off
                ObjectExt.setByPath(metadata, "attrs/image/xlink:href", img)
            }
            return metadata
        }
    },
    events: [
        ...DefaultEvents,
        {name: "change", label: "变化"},
    ],
    metadata: {
        width: 100, height: 100,
        data: {
            on: ImageSwitchOnSvgBase64,
            off: ImageSwitchOffSvgBase64,
            value: false,
        },
        attrs: {
            image: {
                "xlink:href": ImageSwitchOffSvgBase64
            }
        }
    },
    properties: [
        {label: "颜色", key: "attrs/image/stroke", type: "color"},
        {label: "开关响应", key: "data/switch", type: "switch", default: false},
        {label: "开关", key: "data/value", type: "switch", default: false},
        {label: "通", key: "data/on", type: "file"},
        {label: "断", key: "data/off", type: "file"},
    ],
    listeners: {
        click(cell: Cell, event: Event) {
            //开关响应
            if (!cell.data.switch)
                return

            //翻转
            let value = !cell.data.value
            //设置值
            cell.data.value = !value
            //更新图片
            let img = value ? cell.data.on : cell.data.off
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
            cell.data.value = value
            //更新图片
            let img = value ? cell.data.on : cell.data.off
            cell.setPropByPath("attrs/image/xlink:href", img)
        }
    },
}

