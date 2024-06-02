import {NuwaComponent} from "../../nuwa";
import {Component} from "@angular/core";
import {CircleSvg} from "../base/circle_svg";
import {EchartsMapSvg} from "./echarts-map_svg";

@Component({
    standalone: true,
    template: `Echarts`
})
class EchartsMapComponent {

}

export const EchartsMap: NuwaComponent = {
    name: '地图', id: ':echarts-map:',
    svg: EchartsMapSvg, //icon: "assets/widgets/echarts-map.svg",
    type: "angular",
    metadata: {width: 100, height: 40},
    content: EchartsMapComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
