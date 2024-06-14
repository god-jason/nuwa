import {DefaultEvents, StrokeProperties} from "../properties";
import {NuwaWidget} from "../../nuwa";
import {CircleSvgBase64} from "./circle_svg";

export const BaseCircle: NuwaWidget = {
    name: '圆形', id: 'circle',
    icon: CircleSvgBase64, //icon: "assets/widgets/circle.svg",
    type: "shape", internal: true,
    metadata: {width: 100, height: 100},
    events: [
        ...DefaultEvents,
    ],
    properties: [
        ...StrokeProperties('circle'),
    ],
    bindings: [],
    hooks: {},
}
