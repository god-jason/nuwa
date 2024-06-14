import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Cell, ObjectExt} from "@antv/x6";
import {SmartEditorComponent, SmartField} from "@god-jason/smart";
import {CanvasComponent} from "../canvas/canvas.component";
//import {ComponentService} from "../../component.service";
import {NuwaWidget} from "../../nuwa";
import {WidgetService} from "../../widget.service";

@Component({
    selector: 'nuwa-properties-setting',
    templateUrl: './properties-setting.component.html',
    styleUrl: './properties-setting.component.scss'
})
export class PropertiesSettingComponent implements OnDestroy, OnInit {
    @Input() canvas!: CanvasComponent;

    @ViewChild("editor") editor!: SmartEditorComponent;

    fields: SmartField[] = [];
    data: any = {}

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
        // if (event.cell.isEdge()) {
        //     this.component = undefined
        //     this.cell = undefined
        //     return
        // }

        this.cell = event.cell

        // this.cell.transition("attrs/line/strokeWidth", 20, {
        //     timing: Timing.linear,
        // })
        //
        // this.cell.transition("attrs/line/strokeDashoffset", 5, {
        //     timing: Timing.linear,
        // })

        //console.log("onCellSelected", event.cell);
        let id = event.cell.shape

        this.widget = this.ws.Get(id)

        //表单
        // @ts-ignore
        this.fields = this.widget.properties || []

        //数据
        let data: any = {}
        this.fields.forEach(f => {
            let val = event.cell.getPropByPath(f.key)
            //console.log("properties get default", f.key, val)
            if (val !== undefined)
                data[f.key] = val
        })
        this.data = data

        this.name = event.cell.getPropByPath("data/name")
    }

    onChange() {
        let value = this.editor.value
        // console.log("properties onChange", value)
        // Object.keys(value).forEach(key => {
        //     this.cell?.setPropByPath(key, value[key])
        // })

        //逐一设置，不能触发 propHooks
        let obj: any = {}
        Object.keys(value).forEach(key => {
            ObjectExt.setByPath(obj, key, value[key])
        })
        if (this.cell) this.cell.setProp(obj)
    }

    onNameChange() {
        this.cell?.setPropByPath("data/name", this.name)
    }

}
