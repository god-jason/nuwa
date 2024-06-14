import {NuwaWidget, NuwaEventData} from "../../nuwa";
import {NzSliderComponent} from "ng-zorro-antd/slider";
import {Component, EventEmitter, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DefaultEvents} from "../properties";
import {SliderSvgBase64} from "./slider_svg";


@Component({
    selector: 'nuwa-control-slider',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        NzSliderComponent,
    ],
    styles: `nz-select {
        width: 100%;
        height: 100%;
    }`,
    template: `
        <nz-slider [(ngModel)]="value" [ngModelOptions]="{standalone:true}"
                   [nzMin]="min" [nzMax]="max" [nzStep]="step"
                   [nzVertical]="vertical"
                   (ngModelChange)="onChange($event)"
                   (change)="onChange($event)"></nz-slider>`
})
class ControlSliderComponent {
    @Input() listener = new EventEmitter<NuwaEventData>();

    @Input() value = 60
    @Input() min = 0
    @Input() max = 100
    @Input() step = 1
    @Input() vertical = false

    onChange($event: Event) {
        this.listener.emit({event:'change', data:this.value})
    }
}

export const ControlSlider: NuwaWidget = {
    name: '滑块', id: ':slider:',
    icon: SliderSvgBase64, //icon: "assets/widgets/slider.svg",
    type: "angular",
    metadata: {width: 200, height: 200},
    content: ControlSliderComponent,
    events: [
        ...DefaultEvents,
        {name: "change", label: "变化"},
    ],
    properties: [
        {key: 'data/ngArguments/value', label: '进度', type: 'number'},
        {key: 'data/ngArguments/min', label: '最小值', type: 'number', default: 0},
        {key: 'data/ngArguments/max', label: '最大值', type: 'number', default: 100},
        {key: 'data/ngArguments/step', label: '步长', type: 'number', default: 1},
        {key: 'data/ngArguments/vertical', label: '垂直', type: 'switch'},
    ],
    bindings: [
        {name: 'value', label: "进度"},
    ],
    hooks: {
        value(cell, value) {
            cell.setPropByPath("data/ngArguments/value", value);
        }
    },
}
