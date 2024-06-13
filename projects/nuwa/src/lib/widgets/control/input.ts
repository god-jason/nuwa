import {NuwaComponent, NuwaEventData} from "../../nuwa";
import {Component, EventEmitter, HostBinding, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DefaultEvents, ngTextProperties} from "../properties";
import {InputSvgBase64} from "./input_svg";

@Component({
    selector: 'nuwa-control-input',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
    ],
    styles: `input {
        width: 100%;
        height: 100%;
        border: none;
    }`,
    template: `<input [(ngModel)]="value" [ngModelOptions]="{standalone: true}" [type]="type"
                      [style.color]="color" [style.font-size]="fontSize+'px'"
                      [style.font-family]="fontFamily" [style.font-weight]="fontWeight"
                      [style.font-style]="fontStyle" [style.text-align]="textAlign"
                      [style.background-color]="background"
                      [placeholder]="placeholder" (change)="onChange(box.value)" #box>`
})
class ControlInputComponent {
    @Input() listener = new EventEmitter<NuwaEventData>();

    @Input() value: any
    @Input() type = "text"
    @Input() placeholder = "输入框"

    @Input() color = "black";
    @Input() fontSize = 16;
    @Input() fontFamily = "SimHei";
    @Input() fontWeight = "normal";
    @Input() fontStyle = "normal";
    @Input() textAlign = "left";
    @Input() background = "";

    onChange(value: any) {
        this.listener.emit({event:'change', data:this.value})
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
    properties: [
        {label: "类型", key: `data/ngArguments/type`, type: "select", default: 'text', options:[
                {label: '文本', value: 'text'},
                {label: '密码', value: 'password'},
                {label: '数值', value: 'number'},
                {label: '日期', value: 'date'},
            ]},
        {label: "内容", key: `data/ngArguments/value`, type: "text"},
        {label: "提示", key: `data/ngArguments/placeholder`, type: "text", default: '输入框'},
        {label: "背景色", key: `data/ngArguments/background`, type: "color", clear: true},
        ...ngTextProperties,
    ],
    bindings: [
        {name: 'value', label: "输入"},
    ],
    hooks: {
        value(cell, value) {
            cell.setPropByPath("data/ngArguments/value", value);
        }
    },
}
