import {NuwaComponent} from "../../nuwa";
import {NzSelectComponent} from "ng-zorro-antd/select";
import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DefaultEvents} from "../properties";
import {CircleSvg} from "../base/circle_svg";
import {SelectSvg} from "./select_svg";


@Component({
    selector: 'nuwa-control-select',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        NzSelectComponent,
    ],
    styles: `nz-select {
        width: 100%;
    }`,
    template: `
        <nz-select [(ngModel)]="value" [ngModelOptions]="{standalone:true}" [nzOptions]="options"
                   (change)="onChange($event)"></nz-select>    `
})
class ControlSelectComponent {
    @Input() value: any
    @Input() options: any = []

    //TODO 事件
    onChange($event: Event) {

    }
}


export const ControlSelect: NuwaComponent = {
    name: '选择', id: ':select:',
    svg: SelectSvg, //icon: "assets/widgets/select.svg",
    type: "angular",
    metadata: {width: 100, height: 40},
    content: ControlSelectComponent,
    events: [
        ...DefaultEvents,
        {name:"change", label: "变化"},
    ],
    properties: [],
    bindings: [],
    hooks: {},
}
