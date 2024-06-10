import {DefaultEvents, StrokeProperties} from "../properties";
import {NuwaComponent} from "../../nuwa";
import {CircleSvgBase64} from "./circle_svg";

export const BaseCircle: NuwaComponent = {
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
