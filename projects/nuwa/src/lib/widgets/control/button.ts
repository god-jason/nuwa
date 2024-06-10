import {NuwaComponent, NuwaEventData} from "../../nuwa";
import {Component, EventEmitter, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DefaultEvents, ngTextProperties} from "../properties";
import {ButtonSvgBase64} from "./button_svg";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'nuwa-control-button',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
    ],
    styles: `button {
        width: 100%;
        height: 100%;
        border: none;
    }`,
    template: `
        <button type="button"
                [style.color]="color" [style.font-size]="fontSize+'px'"
                [style.font-family]="fontFamily" [style.font-weight]="fontWeight"
                [style.font-style]="fontStyle" [style.text-align]="textAlign"
                [style.background-color]="background"
                (click)="onClick($event)">{{ text }}</button>`
})
class ControlButtonComponent {
    @Input() listener = new EventEmitter<NuwaEventData>();

    @Input() text = "按钮"

    @Input() color = "black";
    @Input() fontSize = 16;
    @Input() fontFamily = "SimHei";
    @Input() fontWeight = "normal";
    @Input() fontStyle = "normal";
    @Input() textAlign = "left";
    @Input() background = "";

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
        {label: "显示", key: "data/ngArguments/text", type: "text", default: '按钮'},
        {label: "背景色", key: `data/ngArguments/background`, type: "color", clear: true},
        ...ngTextProperties,
    ],
    bindings: [],
    hooks: {},
}
