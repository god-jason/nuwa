import {NuwaWidget} from "../../nuwa";
import {DefaultEvents, StrokeProperties, TextProperties} from "../properties";
import {TextSvgBase64} from "./text_svg";

export const BaseText: NuwaWidget = {
    name: '文本', id: ':text:',
    icon: TextSvgBase64, //icon: "assets/widgets/text.svg",
    type: "shape",
    extends: {inherit: "rect"},
    metadata: {
        width: 100,
        height: 30,
        attrs: {
            rect: {
                fill: 'none',
                stroke: 'none',
                strokeWidth: 2
            },
            text: {text: '文本框'},
        }
    },
    events: [
        ...DefaultEvents,
    ],
    properties: [
        ...TextProperties,
        ...StrokeProperties('rect'),
    ],
    bindings: [],
    hooks: {},
}
