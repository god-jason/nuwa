import {NuwaComponent} from "../../nuwa";
import {AfterViewInit, Component, ElementRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import type {EChartsOption} from "echarts";
import {EchartsLineSvgBase64} from "./echarts-line_svg";

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
class EchartsLineComponent implements AfterViewInit {
    chart: any;

    constructor(protected elementRef: ElementRef) {
    }

    _color = '#15c40b'
    @Input() set color(value: string) {
        this._color = value;
        this.option = this.getOption()
    }

    _textColor = '#000'
    @Input() set textColor(value: string) {
        this._textColor = value;
        this.option = this.getOption()
    }

    _textFontSize = 14
    @Input() set textFontSize(value: number) {
        this._textFontSize = value;
        this.option = this.getOption()
    }

    _barWidth = ''
    @Input() set barWidth(value: string) {
        this._barWidth = value;
        this.option = this.getOption()
    }

    _values: ChartValue[] = [
        {name: "一", value: 100},
        {name: "二", value: 110},
        {name: "三", value: 120},
        {name: "四", value: 130},
        {name: "五", value: 120},
        {name: "六", value: 100},
        {name: "日", value: 125},
    ]

    @Input() set values(v: ChartValue[]) {
        this._values = v || []
        this.option = this.getOption()
    }

    _darkMode: boolean = false;

    @Input() set darkMode(value: boolean) {
        this._darkMode = value;
        this.option = this.getOption()
    }

    option: any = this.getOption()

    getOption(): EChartsOption {
        return {
            darkMode: this._darkMode,
            tooltip: {
                trigger: 'axis'
            },
            color: this._color,
            textStyle: {
                color: this._textColor,
                fontSize: this._textFontSize,
            },
            xAxis: {
                type: 'category',
                data: this._values.map(v => v.name),
                axisLabel:{
                    color: this._textColor,
                    fontSize: this._textFontSize
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {show: false},
                axisLine: {show: true},
                axisTick: {show: true},
                axisLabel:{
                    color: this._textColor,
                    fontSize: this._textFontSize
                }
            },
            series: [
                {
                    data: this._values.map(v => v.value),
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
        this.chart?.resize()
    }

    ngAfterViewInit() {
        new ResizeObserver(entries => this.resize()).observe(this.elementRef.nativeElement);
    }
}

export const EchartsLine: NuwaComponent = {
    name: '折线图', id: ':echarts-line:',
    icon: EchartsLineSvgBase64, //icon: "assets/widgets/echarts-line.svg",
    type: "angular",
    metadata: {width: 400, height: 300},
    content: EchartsLineComponent,
    properties: [
        {key: "data/ngArguments/color", label: "颜色", type: "color", default: '#15c40b'},
        {key: "data/ngArguments/textColor", label: "文本颜色", type: "color", default: '#000'},
        {key: "data/ngArguments/textFontSize", label: "字体大小", type: "number", min: 10, max: 200, step: 1, default: 14},
        {key: "data/ngArguments/darkMode", label: "暗色", type: "switch"},
        {
            key: "data/ngArguments/values", label: "数据", type: "table", children: [
                {key: 'name', label: 'X轴', type: 'text'},
                {key: 'value', label: 'Y轴', type: 'number'},
            ], default: [
                {name: "一", value: 100},
                {name: "二", value: 110},
                {name: "三", value: 120},
                {name: "四", value: 130},
                {name: "五", value: 120},
                {name: "六", value: 100},
                {name: "日", value: 125},
            ]
        },
    ],
    bindings: [
        {name: 'values', label: "数据集", default: ''},
    ],
    hooks: {
        values(cell, value) {
            cell.setPropByPath("data/ngArguments/values", value);
        }
    },
}
