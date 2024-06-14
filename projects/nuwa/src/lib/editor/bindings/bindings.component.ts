import {Component, Input, ViewChild} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";
import {NuwaProject} from "../../project";
import {SmartEditorComponent, SmartField, SmartSelectOption} from "@god-jason/smart";
import {NuwaWidget} from "../../nuwa";
import {Cell} from "@antv/x6";
import {WidgetService} from "../../widget.service";

@Component({
    selector: 'nuwa-bindings',
    templateUrl: './bindings.component.html',
    styleUrl: './bindings.component.scss'
})
export class BindingsComponent {
    @Input() canvas!: CanvasComponent;
    //@Input() project!: NuwaProject;

    @ViewChild("editor") editor!: SmartEditorComponent;

    fields: SmartField[] = [];
    data: any = {}

    options: SmartSelectOption[] = []

    name = ''

    widget?: NuwaWidget
    cell?: Cell

    constructor(private ws: WidgetService) {
    }

    ngOnInit() {
        this.canvas.graph.on("cell:selected", this.onCellSelected, this)

        //对于已经选择的情况，直接执行事件
        let cells = this.canvas.graph.getSelectedCells()
        if (cells.length > 0) {
            this.onCellSelected({cell: cells[cells.length - 1]})
        }
    }

    ngOnDestroy(): void {
        this.canvas.graph.off("cell:selected", this.onCellSelected);
    }

    onCellSelected(event: { cell: Cell }) {
        //console.log('onCellSelected', event.cell)

        this.cell = event.cell
        let id = event.cell.shape
        this.widget = this.ws.Get(id)

        //表单
        this.fields = []
        this.widget.bindings?.forEach(b => {
            this.fields.push({
                key: b.name,
                label: b.label,
                type: 'text',
                options: this.options,
                auto: this.options,
            })
        })

        console.log('onCellSelected', this.fields)

        if (this.fields.length == 0)
            return

        //绑定的数据
        this.data = this.cell.data?.bindings || {}

        //变量表
        this.options = this.canvas.page.variables?.map(v => {
            return {label: v.label, value: v.name}
        })||[]
        this.options.unshift({label: '无', value: ''})

    }

    onChange() {
        let value = this.editor.value
        console.log("properties onChange", value)
        if (this.cell)
            this.cell.data.bindings = value
    }

}
