import {NuwaComponent} from "../../nuwa";
import {Component, ElementRef, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import type {EChartsOption} from "echarts";
import {CircleSvg} from "../base/circle_svg";
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
                 [options]="option()" (chartInit)="chartInit($event)"></echarts>`

})
class EchartsPieComponent {
    chart: any;

    @Input() data = [
        {value: 1048, name: 'Search'},
        {value: 735, name: 'Direct'},
        {value: 580, name: 'Email'},
    ]

    option(): EChartsOption {
        return {
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: 'Name',
                    type: 'pie',
                    radius: '50%',
                    data: this.data,
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

export const EchartsPie: NuwaComponent = {
    name: '饼图', id: ':echarts-pie:',
    svg: EchartsPieSvg, //icon: "assets/widgets/echarts-pie.svg",
    type: "angular",
    metadata: {width: 400, height: 400},
    content: EchartsPieComponent,
    properties: [],
    bindings: [],
    hooks: {},
}
