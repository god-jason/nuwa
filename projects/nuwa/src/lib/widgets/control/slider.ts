import {NuwaComponent} from "../../nuwa";
import {NzSliderComponent} from "ng-zorro-antd/slider";
import {Component, EventEmitter, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DefaultEvents} from "../properties";
import {SliderSvg} from "./slider_svg";


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
                   (change)="onChange($event)"></nz-slider>`
})
class ControlSliderComponent {
    @Input() listener = new EventEmitter();

    @Input() value = 60
    @Input() min = 0
    @Input() max = 100
    @Input() step = 1
    @Input() vertical = false

    onChange($event: Event) {
        this.listener.emit(this.value)
    }
}

export const ControlSlider: NuwaComponent = {
    name: '滑块', id: ':slider:',
    svg: SliderSvg, //icon: "assets/widgets/slider.svg",
    type: "angular",
    metadata: {width: 200, height: 200},
    content: ControlSliderComponent,
    events: [
        ...DefaultEvents,
        {name:"change", label: "变化"},
    ],
    properties: [
        {key:'data/ngArguments/value',label:'进度', type:'number', min: 0, max: 100},
    ],
    bindings: [
        {name: 'value', label: "进度", default: ''},
    ],
    hooks: {
        value(cell, value) {
            cell.setPropByPath("data/ngArguments/value", value);
        }
    },
}
