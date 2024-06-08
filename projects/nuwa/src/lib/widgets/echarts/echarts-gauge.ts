import {NuwaComponent} from "../../nuwa";
import {Component, ElementRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import type {EChartsOption} from "echarts";
import {CircleSvg} from "../base/circle_svg";
import {EchartsGaugeSvg} from "./echarts-gauge_svg";


@Component({
    selector: 'app-echarts-bar',
    standalone: true,
    imports: [
        CommonModule,
        NgxEchartsModule,
    ],
    styles: `:host {
        width: 100%;
        height: 100%;
        display: block; overflow: hidden;
    }`,
    template: `
        <echarts class="chart"
                 [autoResize]="true"
                 [style.width]="elementRef.nativeElement.clientWidth+'px'"
                 [style.height]="elementRef.nativeElement.clientHeight+'px'"
                 [options]="option()" (chartInit)="chartInit($event)"></echarts>`

})
class EchartsGaugeComponent {
    chart: any;

    @Input() name = ''
    @Input() value = 30

    option(): EChartsOption {
        return {
            series: [
                {
                    type: 'gauge',
                    progress: {show: true},
                    axisTick: {show: false}, //小刻度
                    data: [
                        {value: this.value}
                    ]
                }
            ]
        }
    }

    chartInit(ec: any) {
        this.chart = ec
    }

    resize() {
        this.chart.resize()
    }

    constructor(protected elementRef: ElementRef) {
    }
}

export const EchartsGauge: NuwaComponent = {
    name: '仪表盘', id: ':echarts-gauge:',
    svg: EchartsGaugeSvg, //icon: "assets/widgets/echarts-gauge.svg",
    type: "angular",
    metadata: {width: 300, height: 300},
    content: EchartsGaugeComponent,
    properties: [
        {key: "data/ngArguments/value", label: "值", type: "number"},
    ],
    bindings: [],
    hooks: {},
}
