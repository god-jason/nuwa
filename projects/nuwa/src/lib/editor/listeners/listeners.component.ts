import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";
import {Cell} from "@antv/x6";
import {NzModalService} from "ng-zorro-antd/modal";
import {ListenerSettingComponent} from "../listener-setting/listener-setting.component";
import {NuwaComponent, NuwaListener} from "../../nuwa";
import {ComponentService} from "../../component.service";
import {NuwaProject} from "../../project";

@Component({
    selector: 'nuwa-listeners',
    templateUrl: './listeners.component.html',
    styleUrl: './listeners.component.scss'
})
export class ListenersComponent implements OnInit, OnDestroy {

    @Input() project!:NuwaProject
    component!: NuwaComponent

    @Input() canvas!: CanvasComponent;

    cell!: Cell //Cell;

    ACTIONS: any = {
        "page": "打开页面",
        "link": "打开链接",
        "set": "设置变量",
        "show": "显示元素",
        "hide": "隐藏元素",
        "animate": "执行动画",
        "script": "执行脚本",
        //"event": "发送事件",
    }

    getActionName(key: any) {
        return this.ACTIONS[key]
    }

    getEventName(key: any) {
        if (key == "click")
            return "点击"
        if (this.component.events)
            for (let i = 0; i < this.component.events.length; i++) {
                if (this.component.events[i].name == key)
                    return this.component.events[i].label
            }
        return '[' + key + ']'
    }

    constructor(private ms: NzModalService, private cs: ComponentService) {
    }


    onCellSelected(event: { cell: Cell }) {
        this.cell = event.cell
        this.component = this.cs.Get(this.cell.shape)
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

    add() {
        if (!this.cell) return
        if (!this.cell.data) this.cell.data = {}
        if (!this.cell.data.listeners) this.cell.data.listeners = []

        this.ms.create({
            nzContent: ListenerSettingComponent,
            nzTitle: "创建事件处理",
            nzData: {
                project: this.project,
                component: this.component
            },
            nzOnOk: ref => {
                this.cell.data.listeners.push(ref.editor.value)
            }
        })
    }

    edit(i: number) {
        let listener: NuwaListener = this.cell.data.listeners[i]

        this.ms.create({
            nzContent: ListenerSettingComponent,
            nzTitle: "编辑事件处理",
            nzData: {
                project: this.project,
                component: this.component,
                listener: listener,
            },
            nzOnOk: ref => {
                this.cell.data.listeners[i] = ref.editor.value
            }
        })
    }

    delete(i: number) {
        this.cell.data.listeners.splice(i, 1)
    }

}
