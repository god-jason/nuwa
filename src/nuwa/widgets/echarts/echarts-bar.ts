import {NuwaComponent} from "../../nuwa";
import {Component, ElementRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import type {EChartsOption} from "echarts";
import {CircleSvg} from "../base/circle_svg";
import {EchartsBarSvg} from "./echarts-bar_svg";

@Component({
    selector: 'app-echarts-bar',
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
                 [options]="option()" (chartInit)="chartInit($event)"></echarts>`

})
class EchartsBarComponent {
    chart: any;

    @Input() xAxis: string[] = ['一', '二', '三', '四', '五', '六', '七']
    @Input() yAxis: number[] = [100, 110, 120, 130, 120, 110, 100]

    option(): EChartsOption {
        return {
            xAxis: {
                type: 'category',
                    data: this.xAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: this.yAxis,
                    type: 'bar'
                }
            ]
        }
    }

    chartInit(ec: any) {
        this.chart = ec
    }

    resize(){
        this.chart.resize()
    }

    constructor(protected elementRef: ElementRef) {
    }
}

export const EchartsBar: NuwaComponent = {
    name: '柱状图', id: ':echarts-bar:',
    svg: EchartsBarSvg, //icon: "assets/widgets/echarts-bar.svg",
    type: "angular",
    metadata: {width: 400, height: 300},
    content: EchartsBarComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
