import {NuwaComponent} from "../../nuwa";
import {DefaultEvents, StrokeProperties, TextProperties} from "../properties";
import {TextSvg} from "./text_svg";

export const BaseText: NuwaComponent = {
    name: '文本', id: ':text:',
    icon: TextSvg, //icon: "assets/widgets/text.svg",
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
