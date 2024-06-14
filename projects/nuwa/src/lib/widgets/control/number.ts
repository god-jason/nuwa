import {NuwaWidget, NuwaEventData} from "../../nuwa";
import {Component, EventEmitter, HostBinding, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DefaultEvents, ngTextProperties} from "../properties";
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
    @Input() listener = new EventEmitter<NuwaEventData>();

    @Input() value = Math.PI
    @Input() min = 0
    @Input() max = 2

    @Input() @HostBinding("style.color") color = "black";

    @HostBinding("style.font-size") _fontSize = '16px';
    @Input() set fontSize(fontSize: number) {
        this._fontSize = fontSize + 'px';
    }

    @Input() @HostBinding("style.font-family") fontFamily = "SimHei";

    @Input() @HostBinding("style.font-weight") fontWeight = "normal";

    @Input() @HostBinding("style.font-style") fontStyle = "normal";

    @Input() @HostBinding("style.text-align") textAlign = "left";
}

export const ControlNumber: NuwaWidget = {
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
