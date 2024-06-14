import {NuwaWidget} from "../../nuwa";
import {DefaultEvents, RadiusProperties, StrokeProperties} from "../properties";
import {RectSvgBase64} from "./rect_svg";

export const BaseRect: NuwaWidget = {
    name: '矩形', id: 'rect',
    icon: RectSvgBase64, //icon: "assets/widgets/rect.svg",
    type: "shape", internal: true,
    metadata: {width: 100, height: 40},
    events: [
        ...DefaultEvents,
    ],
    properties: [
        ...StrokeProperties('rect'),
        ...RadiusProperties('rect'),
    ],
    bindings: [],
    hooks: {},
}
