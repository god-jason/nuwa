import {NuwaComponent} from "../../nuwa";
import {Component, EventEmitter, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {DefaultEvents} from "../properties";
import {InputSvgBase64} from "./input_svg";

@Component({
    selector: 'nuwa-control-input',
    standalone: true,
    imports: [
        CommonModule,
        NzInputDirective,
        FormsModule,
    ],
    styles: `input {
        width: 100%;
        height: 100%
    }`,
    template: `<input nz-input [(ngModel)]="value" [ngModelOptions]="{standalone: true}" [type]="type"
                      [placeholder]="placeholder" (change)="onChange(box.value)" #box>`
})
class ControlInputComponent {
    @Input() listener = new EventEmitter();

    @Input() value: any
    @Input() type = ""
    @Input() placeholder = ""

    onChange(value: any) {
        this.listener.emit(this.value)
    }
}

export const ControlInput: NuwaComponent = {
    name: '输入框', id: ':input:',
    icon: InputSvgBase64, //icon: "assets/widgets/input.svg",
    type: "angular",
    metadata: {width: 160, height: 30},
    content: ControlInputComponent,
    events: [
        ...DefaultEvents,
        {name: "blur", label: "失去焦点"},
        {name: "change", label: "变化"},
    ],
    properties: [],
    bindings: [
        {name: 'value', label: "输入", default: ''},
    ],
    hooks: {
        value(cell, value) {
            cell.setPropByPath("data/ngArguments/value", value);
        }
    },
}
