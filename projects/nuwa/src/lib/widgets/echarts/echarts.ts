import {NuwaWidget} from "../../nuwa";
import {Component, ElementRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import type {EChartsOption} from "echarts";
import {EchartsSvgBase64} from "./echarts_svg";

@Component({
    selector: 'app-echarts',
    standalone: true,
    imports: [
        CommonModule,
        NgxEchartsModule,
    ],
    styles: `:host{width: 100%; height: 100%; display: block; overflow: hidden;}`,
    template: `
        <echarts class="chart"
                 [autoResize]="true"
                 [style.width]="elementRef.nativeElement.clientWidth+'px'"
                 [style.height]="elementRef.nativeElement.clientHeight+'px'"
                 [options]="option" (chartInit)="chartInit($event)"></echarts>`

})
class EchartsComponent {
    chart: any;

    @Input() option: EChartsOption = {
        title: {
            text: "echarts"
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            },
            {
                data: [100, 200, 200, 60, 90, 177, 130],
                type: 'bar'
            }
        ]
    }

    constructor(protected elementRef: ElementRef) {
    }

    chartInit(ec: any) {
        this.chart = ec
        console.log(this.elementRef.nativeElement.clientWidth, this.elementRef.nativeElement.clientHeight)
    }

    resize() {
        this.chart?.resize()
    }

    ngAfterViewInit() {
        new ResizeObserver(entries => this.resize()).observe(this.elementRef.nativeElement);
    }
}

export const Echarts: NuwaWidget = {
    name: '图表', id: ':echarts:',
    icon: EchartsSvgBase64, //icon: "assets/widgets/echarts.svg",
    type: "angular",
    metadata: {width: 400, height: 300},
    content: EchartsComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
