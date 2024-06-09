import {NuwaComponent} from "../../nuwa";
import {OutletSvg} from "./outlet_svg";
import {RenderComponent} from "../../viewer/render/render.component";

export const MiscOutlet: NuwaComponent = {
    name: '子页面', id: ':outlet:',
    svg: OutletSvg, //icon: "assets/widgets/outlet.svg",
    type: "angular",
    metadata: {width: 300, height: 200},
    content: RenderComponent,
    properties: [
        {key: "data/ngArguments/name", label: "名称", type: "text", default: "新建子页面"},
        //{key:"data/name", label: "名称", type: "text", default: "新建子页面"},
        //{key:"data/ngArguments/page", label: "URL", type: "text"},
    ],
    bindings: [],
    hooks: {},
}
