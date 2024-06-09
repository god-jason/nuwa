import {Component, Input, ViewChild} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";
import {NuwaProject} from "../../project";
import {SmartEditorComponent, SmartField, SmartSelectOption} from "@god-jason/smart";
import {NuwaComponent} from "../../nuwa";
import {Cell} from "@antv/x6";
import {ComponentService} from "../../component.service";

@Component({
  selector: 'nuwa-bindings',
  templateUrl: './bindings.component.html',
  styleUrl: './bindings.component.scss'
})
export class BindingsComponent {
    @Input() canvas!: CanvasComponent;
    @Input() project!: NuwaProject;

    @ViewChild("editor") editor!: SmartEditorComponent;

    fields: SmartField[] = [];
    data: any = {}

    options: SmartSelectOption[] = []

    name = ''

    component?: NuwaComponent
    cell?: Cell

    constructor(private cs: ComponentService) {
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
        this.cell = event.cell
        let id = event.cell.shape
        this.component = this.cs.Get(id)

        //变量表
        this.options = this.project.variables.map(v=>{
            return {label: v.label, value: v.name}
        })

        //表单
        // @ts-ignore
        //this.fields = this.component.bindings || []
        this.fields = []
        this.data = this.cell.data?.bindings || {}

        this.component.bindings?.forEach(b=>{
            this.fields.push({
                key: b.name,
                label: b.label,
                type: 'select',
                default: b.default,
                options: this.options,
            })
        })
    }

    onChange() {
        let value = this.editor.value
        console.log("properties onChange", value)
        if (this.cell)
            this.cell.data.bindings = value
    }

}
