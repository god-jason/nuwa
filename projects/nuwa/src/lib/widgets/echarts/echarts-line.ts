import {NuwaComponent} from "../../nuwa";
import {Component, ElementRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import type {EChartsOption} from "echarts";
import {EchartsLineSvg} from "./echarts-line_svg";

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
        display: block;
        overflow: hidden;
    }`,
    template: `
        <echarts class="chart"
                 [autoResize]="true"
                 [style.width]="elementRef.nativeElement.clientWidth+'px'"
                 [style.height]="elementRef.nativeElement.clientHeight+'px'"
                 [options]="option" (chartInit)="chartInit($event)"></echarts>`

})
class EchartsLineComponent {
    chart: any;


    _xAxis: string[] = ['一', '二', '三', '四', '五', '六', '七']
    _yAxis: number[] = [100, 110, 120, 130, 120, 110, 100]
    option: any = this.getOption()

    @Input() set xAxis(v: string[]) {
        this._xAxis = v
        this.option = this.getOption()
    }

    @Input() set yAxis(v: number[]) {
        this._yAxis = v
        this.option = this.getOption()
    }

    getOption(): EChartsOption {
        return {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: this._xAxis
            },
            yAxis: {
                type: 'value',
                splitLine: {show:false},
                axisLine:{show:true},
                axisTick:{show:true},
            },
            series: [
                {
                    data: this._yAxis,
                    type: 'line',
                    smooth: true
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

    ngAfterViewInit() {
        new ResizeObserver(entries => this.resize()).observe(this.elementRef.nativeElement);
    }
}

export const EchartsLine: NuwaComponent = {
    name: '折线图', id: ':echarts-line:',
    svg: EchartsLineSvg, //icon: "assets/widgets/echarts-line.svg",
    type: "angular",
    metadata: {width: 400, height: 300},
    content: EchartsLineComponent,
    properties: [
        {key: "data/ngArguments/xAxis", label: "X轴", type: "text", array: true},
        {key: "data/ngArguments/yAxis", label: "Y轴", type: "number", array: true},
    ],
    bindings: [],
    hooks: {},
}
