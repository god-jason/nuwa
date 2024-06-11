import {NuwaComponent, NuwaEventData} from "../../nuwa";
import {Component, ElementRef, EventEmitter, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import {EchartsGaugeSvgBase64} from "./echarts-gauge_svg";


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
class EchartsGaugeComponent {
    @Input() listener = new EventEmitter<NuwaEventData>();

    chart: any;

    @Input() name = ''

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

    _value = 30

    @Input() set value(v: number) {
        this._value = v;
        this.option = this.getOption()
    }


    _min = 0
    @Input() set min(value: number) {
        this._min = value;
        this.option = this.getOption()
    }

    _max = 0
    @Input() set max(value: number) {
        this._max = value;
        this.option = this.getOption()
    }

    _darkMode: boolean = false;

    @Input() set darkMode(value: boolean) {
        this._darkMode = value;
        this.option = this.getOption()
    }

    option: any = this.getOption()

    getOption(): any {
        return {
            darkMode: this._darkMode,
            color: this._color,
            series: [
                {
                    type: 'gauge',
                    progress: {show: true},
                    axisTick: {show: false}, //小刻度
                    splitLine: {show: true}, //分割线
                    axisLabel: {show: false},
                    min: this._min,
                    max: this._max,
                    data: [{
                        value: this._value,
                        detail: {
                            color: this._textColor,
                            fontSize: this._textFontSize
                        },
                    }]
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

export const EchartsGauge: NuwaComponent = {
    name: '仪表盘', id: ':echarts-gauge:',
    icon: EchartsGaugeSvgBase64, //icon: "assets/widgets/echarts-gauge.svg",
    type: "angular",
    metadata: {width: 300, height: 300},
    content: EchartsGaugeComponent,
    properties: [
        {key: "data/ngArguments/color", label: "颜色", type: "color", default: '#15c40b'},
        {key: "data/ngArguments/textColor", label: "文本颜色", type: "color", default: '#000'},
        {
            key: "data/ngArguments/textFontSize",
            label: "字体大小",
            type: "number",
            min: 10,
            max: 200,
            step: 1,
            default: 18
        },
        {key: "data/ngArguments/darkMode", label: "暗色", type: "switch"},
        {key: "data/ngArguments/value", label: "值", type: "number", step: 1, min: 0, max: 99999, default: 25},
        {key: "data/ngArguments/min", label: "最小值", type: "number", step: 1, min: 0, max: 99999, default: 0},
        {key: "data/ngArguments/max", label: "最大值", type: "number", step: 1, min: 0, max: 99999, default: 100},
    ],
    bindings: [
        {name: 'value', label: "值", default: ''},
    ],
    hooks: {
        value(cell, value) {
            cell.setPropByPath("data/ngArguments/value", value);
        }
    },
}
