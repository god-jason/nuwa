import {NuwaComponent} from "../../nuwa";
import {AfterViewInit, Component, ElementRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import type {EChartsOption} from "echarts";
import {EchartsBarSvg} from "./echarts-bar_svg";

interface ChartValue {
    name: string
    value: number
}

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
class EchartsBarComponent implements AfterViewInit {
    chart: any;

    _values: ChartValue[] = [
        {name: "一", value: 100},
        {name: "二", value: 110},
        {name: "三", value: 120},
        {name: "四", value: 130},
        {name: "五", value: 120},
        {name: "六", value: 100},
        {name: "日", value: 125},
    ]

    option: any = this.getOption()

    @Input() set values(v: ChartValue[]) {
        this._values = v
        this.option = this.getOption()
    }

    getOption(): EChartsOption {
        return {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: this._values.map(v => v.name),
            },
            yAxis: {
                type: 'value',
                splitLine: {show: false},
                axisLine: {show: true},
                axisTick: {show: true},
            },
            series: [
                {
                    data: this._values.map(v => v.value),
                    type: 'bar'
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

export const EchartsBar: NuwaComponent = {
    name: '柱状图', id: ':echarts-bar:',
    svg: EchartsBarSvg, //icon: "assets/widgets/echarts-bar.svg",
    type: "angular",
    metadata: {width: 400, height: 300},
    content: EchartsBarComponent,
    properties: [
        {
            key: "data/ngArguments/values", label: "数据", type: "table", children: [
                {key: 'name', label: 'X轴', type: 'text'},
                {key: 'value', label: 'Y轴', type: 'number'},
            ]
        },
    ],
    bindings: [],
    hooks: {},
}
