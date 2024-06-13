import {NuwaComponent, NuwaEventData} from "../../nuwa";
import {AfterViewInit, Component, ElementRef, EventEmitter, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgxEchartsModule} from "ngx-echarts";
import type {EChartsOption} from "echarts";
import {EchartsPieSvgBase64} from "./echarts-pie_svg";

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
    @Input() listener = new EventEmitter<NuwaEventData>();

    chart: any;

    constructor(protected elementRef: ElementRef) {
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

    @Input() set $0(v: number){
        if (this._values.length>0) {
            this._values[0].value = v
            this.option = this.getOption()
        }
    }
    @Input() set $1(v: number){
        if (this._values.length>1) {
            this._values[1].value = v
            this.option = this.getOption()
        }
    }
    @Input() set $2(v: number){
        if (this._values.length>2) {
            this._values[2].value = v
            this.option = this.getOption()
        }
    }
    @Input() set $3(v: number){
        if (this._values.length>3) {
            this._values[3].value = v
            this.option = this.getOption()
        }
    }
    @Input() set $4(v: number){
        if (this._values.length>4) {
            this._values[4].value = v
            this.option = this.getOption()
        }
    }
    @Input() set $5(v: number){
        if (this._values.length>5) {
            this._values[5].value = v
            this.option = this.getOption()
        }
    }
    @Input() set $6(v: number){
        if (this._values.length>6) {
            this._values[6].value = v
            this.option = this.getOption()
        }
    }
    @Input() set $7(v: number){
        if (this._values.length>7) {
            this._values[7].value = v
            this.option = this.getOption()
        }
    }
    @Input() set $8(v: number){
        if (this._values.length>8) {
            this._values[8].value = v
            this.option = this.getOption()
        }
    }
    @Input() set $9(v: number){
        if (this._values.length>9) {
            this._values[9].value = v
            this.option = this.getOption()
        }
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
        this.chart?.resize()
    }

    ngAfterViewInit() {
        new ResizeObserver(entries => this.resize()).observe(this.elementRef.nativeElement);
    }
}

export const EchartsPie: NuwaComponent = {
    name: '饼图', id: ':echarts-pie:',
    icon: EchartsPieSvgBase64, //icon: "assets/widgets/echarts-pie.svg",
    type: "angular",
    metadata: {width: 400, height: 400},
    content: EchartsPieComponent,
    properties: [
        {key: "data/ngArguments/darkMode", label: "暗色", type: "switch"},
        {
            key: "data/ngArguments/values", label: "数据", type: "table", children: [
                {key: 'name', label: '项目', type: 'text'},
                {key: 'value', label: '值', type: 'number'},
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
        {name: 'values', label: "数据集"},
        {name: '$0', label: "值0"},
        {name: '$1', label: "值1"},
        {name: '$2', label: "值2"},
        {name: '$3', label: "值3"},
        {name: '$4', label: "值4"},
        {name: '$5', label: "值5"},
        {name: '$6', label: "值6"},
        {name: '$7', label: "值7"},
        {name: '$8', label: "值8"},
        {name: '$9', label: "值9"},
    ],
    hooks: {
        values(cell, value) {
            cell.setPropByPath("data/ngArguments/values", value);
        },
        $0(cell, value) {
            cell.setPropByPath("data/ngArguments/$0", value);
        },
        $1(cell, value) {
            cell.setPropByPath("data/ngArguments/$1", value);
        },
        $2(cell, value) {
            cell.setPropByPath("data/ngArguments/$2", value);
        },
        $3(cell, value) {
            cell.setPropByPath("data/ngArguments/$3", value);
        },
        $4(cell, value) {
            cell.setPropByPath("data/ngArguments/$4", value);
        },
        $5(cell, value) {
            cell.setPropByPath("data/ngArguments/$5", value);
        },
        $6(cell, value) {
            cell.setPropByPath("data/ngArguments/$6", value);
        },
        $7(cell, value) {
            cell.setPropByPath("data/ngArguments/$7", value);
        },
        $8(cell, value) {
            cell.setPropByPath("data/ngArguments/$8", value);
        },
        $9(cell, value) {
            cell.setPropByPath("data/ngArguments/$9", value);
        }
    },
}
