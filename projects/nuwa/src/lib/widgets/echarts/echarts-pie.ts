import {NuwaComponent} from "../../nuwa";
import {AfterViewInit, Component, ElementRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import type {EChartsOption} from "echarts";
import {EchartsPieSvg} from "./echarts-pie_svg";

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
class EchartsPieComponent implements AfterViewInit {
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
                trigger: 'item'
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '50%',
                    data: this._values,
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

export const EchartsPie: NuwaComponent = {
    name: '饼图', id: ':echarts-pie:',
    svg: EchartsPieSvg, //icon: "assets/widgets/echarts-pie.svg",
    type: "angular",
    metadata: {width: 400, height: 400},
    content: EchartsPieComponent,
    properties: [
        {
            key: "data/ngArguments/values", label: "数据", type: "table", children: [
                {key: 'name', label: '项目', type: 'text'},
                {key: 'value', label: '值', type: 'number'},
            ]
        },
    ],
    bindings: [],
    hooks: {},
}
