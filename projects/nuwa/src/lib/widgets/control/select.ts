import {NuwaComponent, NuwaEventData} from "../../nuwa";
import {NzSelectComponent} from "ng-zorro-antd/select";
import {Component, EventEmitter, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DefaultEvents} from "../properties";
import {SelectSvgBase64} from "./select_svg";


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
                   (change)="onChange()"></nz-select>    `
})
class ControlSelectComponent {
    @Input() listener = new EventEmitter<NuwaEventData>();

    @Input() value: any
    @Input() options: any = []

    onChange() {
        this.listener.emit({event:'change', data:this.value})
    }
}


export const ControlSelect: NuwaComponent = {
    name: '下拉选择', id: ':select:',
    icon: SelectSvgBase64, //icon: "assets/widgets/select.svg",
    type: "angular",
    metadata: {width: 100, height: 40},
    content: ControlSelectComponent,
    events: [
        ...DefaultEvents,
        {name: "change", label: "变化"},
    ],
    properties: [
        {key: 'data/ngArguments/value', label: '值', type: 'text',},
        {
            key: 'data/ngArguments/options', label: '选项', type: 'table', children: [
                {key: 'label', label: '显示', type: 'text'},
                {key: 'value', label: '值', type: 'text'},
            ]
        },
    ],
    bindings: [
        {name: 'value', label: "选择"},
    ],
    hooks: {
        value(cell, value) {
            cell.setPropByPath("data/ngArguments/value", value);
        }
    },
}
