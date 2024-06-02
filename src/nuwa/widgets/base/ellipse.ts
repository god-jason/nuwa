import {DefaultEvents, StrokeProperties} from "../properties";
import {NuwaComponent} from "../../nuwa";
import {EllipseSvg} from "./ellipse_svg";

export const BaseEllipse: NuwaComponent = {
    name: '椭圆', id: 'ellipse',
    svg: EllipseSvg, //icon: "assets/widgets/ellipse.svg",
    type: "shape", internal: true,
    metadata: {width: 100, height: 60},
    events: [
        ...DefaultEvents,
    ],
    properties: [
        ...StrokeProperties('ellipse'),
    ],
    bindings: [],
    hooks: {},
}
