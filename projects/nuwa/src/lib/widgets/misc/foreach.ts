import {NuwaComponent, NuwaEventData} from "../../nuwa";
import {Component, EventEmitter, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ForeachSvgBase64} from "./foreach_svg";
import {RenderComponent} from "../../viewer/render/render.component";

@Component({
    selector: '$nuwa-misc-foreach',
    standalone: true,
    imports: [
        CommonModule,
        RenderComponent,
    ],
    styles: `
        :host {
            display: block;
            overflow-x: hidden;
            overflow-y: auto;
        }
        nuwa-render{
            display: inline-block;
        }
    `,
    template: `
        [暂未完成]
        @for (item of items; track $index) {
            <nuwa-render></nuwa-render>
        }
    `
})
class MiscForeachComponent {
    @Input() listener = new EventEmitter<NuwaEventData>();

    @Input() page: string = ""
    @Input() items: any[] = [{},{},{}]

    constructor() {
    }

}

export const MiscForeach: NuwaComponent = {
    name: '迭代器', id: ':foreach:',
    icon: ForeachSvgBase64, //icon: "assets/widgets/foreach.svg",
    type: "angular",
    metadata: {width: 400, height: 400},
    content: MiscForeachComponent,
    properties: [
        {label: "页面", key: "data/ngArguments/page", type: "text"},
    ],
    bindings: [
        {name: 'items', label: "输入", default: ''},
    ],
    hooks: {
        value(cell, value) {
            cell.setPropByPath("data/ngArguments/items", value);
        }
    },
}
