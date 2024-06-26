import {NuwaWidget, NuwaEventData} from "../../nuwa";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {Component, EventEmitter, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DefaultEvents} from "../properties";
import {SwitchSvgBase64} from "./switch_svg";


@Component({
    selector: 'nuwa-control-switch',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        NzSwitchComponent,
    ],
    styles: `
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }

        nz-switch {
            width: 100%;
            height: 100%;
        }`,
    template: `
        <nz-switch [(ngModel)]="value" [ngModelOptions]="{standalone:true}"
                   (change)="onChange($event)" (ngModelChange)="onChange($event)"></nz-switch>`
})
class ControlSwitchComponent {
    @Input() listener = new EventEmitter<NuwaEventData>();

    @Input() value = false

    onChange($event: Event) {
        this.listener.emit({event:'change', data:this.value})
    }
}

export const ControlSwitch: NuwaWidget = {
    name: '开关', id: ':switch:',
    icon: SwitchSvgBase64, //icon: "assets/widgets/switch.svg",
    type: "angular",
    metadata: {width: 100, height: 40},
    content: ControlSwitchComponent,
    events: [
        ...DefaultEvents,
        {name: "change", label: "变化"},
    ],
    properties: [
        {key: 'data/ngArguments/value', label: '开关', type: 'switch'},
    ],
    bindings: [
        {name: 'value', label: "开关"},
    ],
    hooks: {
        value(cell, value) {
            cell.setPropByPath("data/ngArguments/value", value);
        }
    },
}
