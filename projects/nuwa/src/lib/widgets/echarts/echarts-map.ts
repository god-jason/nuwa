import {NuwaComponent} from "../../nuwa";
import {Component} from "@angular/core";
import {EchartsMapSvgBase64} from "./echarts-map_svg";

@Component({
    standalone: true,
    template: `Echarts`
})
class EchartsMapComponent {

}

export const EchartsMap: NuwaComponent = {
    name: '地图', id: ':echarts-map:',
    icon: EchartsMapSvgBase64, //icon: "assets/widgets/echarts-map.svg",
    type: "angular",
    metadata: {width: 100, height: 40},
    content: EchartsMapComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
