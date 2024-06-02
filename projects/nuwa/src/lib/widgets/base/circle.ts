import {DefaultEvents, StrokeProperties} from "../properties";
import {NuwaComponent} from "../../nuwa";
import {CircleSvg} from "./circle_svg";

export const BaseCircle: NuwaComponent = {
    name: '圆形', id: 'circle',
    svg: CircleSvg, //icon: "assets/widgets/circle.svg",
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
