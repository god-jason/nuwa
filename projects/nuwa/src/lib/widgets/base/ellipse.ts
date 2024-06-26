import {DefaultEvents, StrokeProperties} from "../properties";
import {NuwaWidget} from "../../nuwa";
import {EllipseSvgBase64} from "./ellipse_svg";

export const BaseEllipse: NuwaWidget = {
    name: '椭圆', id: 'ellipse',
    icon: EllipseSvgBase64, //icon: "assets/widgets/ellipse.svg",
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
