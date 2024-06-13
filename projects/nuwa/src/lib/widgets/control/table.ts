import {NuwaComponent, NuwaEventData} from "../../nuwa";
import {Component, EventEmitter, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DefaultEvents, ngTextProperties} from "../properties";
import {TableSvgBase64} from "./table_svg";
import {FormsModule} from "@angular/forms";

interface TableField {
    name: string;
    label: string;
    width: string;
    //date: boolean;
}

@Component({
    selector: 'nuwa-control-table',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
    ],
    styles: `table {
        width: 100%;
        height: 100%;
        border-collapse:collapse;

        th,td{
            border-style: solid;
        }
    }`,
    template: `
        <table [style.color]="color"
               [style.font-size]="fontSize+'px'"
               [style.font-family]="fontFamily"
               [style.font-weight]="fontWeight"
        >
            <thead>
            <tr>
                <th *ngFor="let f of fields"
                    [style.width]="f.width"
                    [style.border-color]="borderColor"
                    [style.border-width]="borderWidth+'px'"
                >{{ f.label }}</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let v of values">
                <td *ngFor="let f of fields"
                    [style.border-color]="borderColor"
                    [style.border-width]="borderWidth+'px'"
                >{{ v[f.name] || '-' }}</td>
            </tr>
            </tbody>
        </table>`
})
class ControlTableComponent {
    @Input() listener = new EventEmitter<NuwaEventData>();

    @Input() fields: TableField[] = []
    @Input() values: any[] = [{},{},{}]

    @Input() color = "black";
    @Input() fontSize = 16;
    @Input() fontFamily = "SimHei";
    @Input() fontWeight = "normal";
    @Input() fontStyle = "normal";
    @Input() borderColor = "black";
    @Input() borderWidth = 1
    @Input() textAlign = "center" //暂时没用

    onClick($event: MouseEvent) {
        this.listener.emit({event: 'click', data: $event})
    }
}

export const ControlTable: NuwaComponent = {
    name: '表格', id: ':table:',
    icon: TableSvgBase64, //icon: "assets/widgets/table.svg",
    type: "angular",
    metadata: {width: 400, height: 30},
    content: ControlTableComponent,
    events: [
        ...DefaultEvents,
    ],
    properties: [
        ...ngTextProperties,
        {label: "边框", key: "data/ngArguments/borderWidth", type: "number", default: 1},
        {label: "边框色", key: `data/ngArguments/borderColor`, type: "color", clear: true},
        {
            key: "data/ngArguments/fields", label: "表头", type: "table", children: [
                {key: 'name', label: '变量', type: 'text'},
                {key: 'label', label: '显示', type: 'text'},
                {key: 'width', label: '宽度', type: 'text', placeholder: 'px %'},
            ], default: [
                {name: "name", label: "姓名", width: ''},
                {name: "age", label: "年龄", width: ''},
                {name: "sex", label: "性别", width: ''},
            ]
        },
        //{label: "值", key: `data/ngArguments/values`, type: "color", clear: true},
    ],
    bindings: [
        {name: 'values', label: "数据集"},
    ],
    hooks: {
        values(cell, value) {
            cell.setPropByPath("data/ngArguments/values", value);
        }
    },
}
