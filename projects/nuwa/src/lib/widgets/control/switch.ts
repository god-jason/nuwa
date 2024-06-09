import {NuwaComponent} from "../../nuwa";
import {NzSwitchComponent} from "ng-zorro-antd/switch";
import {Component, EventEmitter, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DefaultEvents} from "../properties";
import {CircleSvg} from "../base/circle_svg";
import {SwitchSvg} from "./switch_svg";


@Component({
    selector: 'nuwa-control-switch',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        NzSwitchComponent,
    ],
    styles: `
        :host{
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
                   (change)="onChange($event)"></nz-switch>`
})
class ControlSwitchComponent {
    @Input() listener = new EventEmitter();

    @Input() value = 60

    onChange($event: Event) {
        this.listener.emit(this.value)
    }
}
export const ControlSwitch: NuwaComponent = {
    name: '开关', id: ':switch:',
    svg: SwitchSvg, //icon: "assets/widgets/switch.svg",
    type: "angular",
    metadata: {width: 100, height: 40},
    content: ControlSwitchComponent,
    events: [
        ...DefaultEvents,
        {name:"change", label: "变化"},
    ],
    properties: [],
    bindings: [],
    hooks: {},
}
