import {NuwaWidget, NuwaEventData} from "../../nuwa";
import {NzProgressComponent} from "ng-zorro-antd/progress";
import {Component, ElementRef, EventEmitter, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DefaultEvents} from "../properties";
import {ProgressSvgBase64} from "./progress_svg";

@Component({
    selector: 'nuwa-control-progress',
    standalone: true,
    imports: [
        CommonModule,
        NzProgressComponent,
    ],
    styles: `
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }

        nz-progress {
            width: 100%;
            height: 100%;
        }`,
    template: `
        <nz-progress [nzPercent]="value" [nzShowInfo]="false" [nzStrokeColor]="color"
                     [nzStrokeWidth]="elementRef.nativeElement.clientHeight || 10"
                     nzStrokeLinecap="square"></nz-progress>`
})
class ControlProgressComponent {
    @Input() listener = new EventEmitter<NuwaEventData>();

    @Input() value = 60
    @Input() color = "#6992ff"

    constructor(protected elementRef: ElementRef) {
    }
}


export const ControlProgress: NuwaWidget = {
    name: '进度条', id: ':progress:',
    icon: ProgressSvgBase64, //icon: "assets/widgets/progress.svg",
    type: "angular",
    metadata: {width: 200, height: 30},
    content: ControlProgressComponent,
    events: [
        ...DefaultEvents,
    ],
    properties: [
        {key: 'data/ngArguments/value', label: '进度', type: 'number', min: 0, max: 100},
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
