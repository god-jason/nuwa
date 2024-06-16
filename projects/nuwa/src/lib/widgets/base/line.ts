import {NuwaWidget} from "../../nuwa";
import {LineProperties} from "../properties";
import {LineSvgBase64} from "./line_svg";

export const BaseLine: NuwaWidget = {
    name: '线条',
    id: ':line:',
    icon: LineSvgBase64, //icon: "assets/widgets/line.svg",
    type: "line",
    extends: {
        inherit: "edge", //不用继承就好了
        attrs: {
            // wrap: {
            //     fill: 'none',
            //     strokeWidth: 0,
            //     strokeLinejoin: 'round',
            // },
            wrap: {
                fill: 'none',
                connection: true,
                stroke: '#000',
                strokeWidth: 2,
                strokeLinejoin: 'round',
                targetMarker: null,
            },
            line: {
                fill: 'none',
                connection: true,
                strokeWidth: 0,
                targetMarker: null,
            },
        },
        tools: {items: ['edge-editor']},
    },
    metadata: {
    },
    properties: [
        ...LineProperties('wrap'),
    ],
    bindings: [],
    hooks: {},
}
