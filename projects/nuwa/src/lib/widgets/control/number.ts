import {NuwaComponent} from "../../nuwa";
import {DefaultEvents, StrokeProperties, TextProperties} from "../properties";
import {NumberSvg} from "./number_svg";

export const ControlNumber: NuwaComponent = {
    name: '数值', id: ':number:',
    icon: NumberSvg, //icon: "assets/widgets/number.svg",
    type: "shape", extends: {inherit: "rect"},
    metadata: {
        width: 100,
        height: 30,
        attrs: {
            rect: {fill: 'none', stroke: 'none'},
            text: {text: 'XXX.XX'},
        },
    },
    events: [
        ...DefaultEvents,
    ],
    properties: [
        ...TextProperties,
        ...StrokeProperties('rect'),
        {label: "小数位数", key: `data/fixed`, type: "number", default: 0},
    ],
    bindings: [
        {name: 'value', label: "数值", default: ''},
    ],
    hooks: {
        value(cell, value) {
            let fixed = cell.getPropByPath("data/fixed") || 0
            cell.setPropByPath("attrs/text/text", value?.toFixed(fixed))
        }
    },
}
