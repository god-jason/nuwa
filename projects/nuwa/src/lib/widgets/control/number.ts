import {NuwaComponent} from "../../nuwa";
import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DefaultEvents} from "../properties";
import {NumberSvgBase64} from "./number_svg";

@Component({
    selector: 'nuwa-control-number',
    standalone: true,
    imports: [
        CommonModule,
    ],
    styles: ``,
    template: `{{ value | number: "1."+min+"-"+max }}`
})
class ControlNumberComponent {
    @Input() value = Math.PI
    @Input() min = 0
    @Input() max = 2
}

export const ControlNumber: NuwaComponent = {
    name: '格式化数值', id: ':number:',
    icon: NumberSvgBase64,
    type: "angular",
    metadata: {width: 160, height: 30},
    content: ControlNumberComponent,
    events: [
        ...DefaultEvents,
    ],
    properties: [
        {label: "值", key: `data/ngArguments/value`, type: "number", default: Math.PI},
        {label: "最少保留小位数", key: `data/ngArguments/min`, type: "number", step: 1, min: 0, max: 100, default: 0},
        {label: "最多保留小位数", key: `data/ngArguments/max`, type: "number", step: 1, min: 1, max: 100, default: 2},
    ],
    bindings: [
        {name: 'value', label: "输入", default: ''},
    ],
    hooks: {
        value(cell, value) {
            cell.setPropByPath("data/ngArguments/value", value);
        }
    },
}
