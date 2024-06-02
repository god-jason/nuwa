import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Cell} from "@antv/x6";
import {SmartEditorComponent, SmartField} from "iot-master-smart";
import {CanvasComponent} from "../canvas/canvas.component";
//import {ComponentService} from "../../component.service";
import {NuwaComponent} from "../../nuwa";
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentService} from "../../component.service";

@Component({
    selector: 'nuwa-properties',
    standalone: true,
    imports: [
        SmartEditorComponent,
        ReactiveFormsModule
    ],
    templateUrl: './properties.component.html',
    styleUrl: './properties.component.scss'
})
export class PropertiesComponent implements OnDestroy, OnInit {
    @Input() canvas!: CanvasComponent;

    @ViewChild("editor") editor!: SmartEditorComponent;

    fields: SmartField[] = [];
    data: any = {}

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

        this.component = this.cs.Get(id)

        //表单
        // @ts-ignore
        this.fields = this.component.properties || []

        //数据
        let data: any = {}
        this.fields.forEach(f => {
            let val = event.cell.getPropByPath(f.key)
            //console.log("properties get default", f.key, val)
            if (val !== undefined)
                data[f.key] = val
        })
        this.data = data
    }

    // ngAfterViewInit() {
    //     setTimeout(() => {
    //         this.editor.group.valueChanges.subscribe(res => {
    //             console.log("properties change", res)
    //             //Object.assign(this.page, res)
    //             Object.keys(res).forEach(key => {
    //                 this.cell?.setPropByPath(key, res[key])
    //             })
    //         })
    //     }, 100)
    // }

    onChange() {
        let value = this.editor.value
        console.log("properties onChange", value)
        Object.keys(value).forEach(key => {
            this.cell?.setPropByPath(key, value[key])
        })
    }
}
