import {NuwaComponent, NuwaEventData} from "../../nuwa";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {Component, EventEmitter, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DefaultEvents} from "../properties";
import {ButtonSvgBase64} from "./button_svg";

@Component({
    selector: 'nuwa-control-button',
    standalone: true,
    imports: [
        CommonModule,
        NzButtonComponent,
    ],
    styles: `button {
        width: 100%;
        height: 100%
    }`,
    template: `
        <button type="button" nz-button
                [style.font-size]="fontSize+'px'"
                (click)="onClick($event)">{{ text }}</button>`
})
class ControlButtonComponent {
    @Input() listener = new EventEmitter<NuwaEventData>();

    @Input() text = "按钮"
    @Input() fontSize = 16

    onClick($event: MouseEvent) {
        this.listener.emit({event:'click', data: $event})
    }
}

export const ControlButton: NuwaComponent = {
    name: '按钮', id: ':button:',
    icon: ButtonSvgBase64, //icon: "assets/widgets/button.svg",
    type: "angular",
    metadata: {width: 100, height: 40},
    content: ControlButtonComponent,
    events: [
        ...DefaultEvents,
    ],
    properties: [
        {label: "字号", key: "data/ngArguments/fontSize", type: "number", min: 0, max: 255, default: 16},
    ],
    bindings: [],
    hooks: {},
}
