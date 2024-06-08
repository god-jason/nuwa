import {NuwaComponent} from "../../nuwa";
import {Component, ElementRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import type {EChartsOption} from "echarts";
import {EchartsPieSvg} from "./echarts-pie_svg";

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
class EchartsPieComponent {
    chart: any;


    _keys: string[] = ['A', 'B', 'C'];
    _values: number[] = [10, 20, 15]
    option: any = this.getOption()

    @Input() set keys(v: string[]) {
        this._keys = v
        this.option = this.getOption()
    }

    @Input() set values(v: number[]) {
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
                    data: this._keys.map((k,i)=>{
                        return {name:k, value: this._values[i]}
                    }),
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
        {key: "data/ngArguments/keys", label: "项目", type: "text", array: true},
        {key: "data/ngArguments/values", label: "值", type: "number", array: true},
    ],
    bindings: [],
    hooks: {},
}
