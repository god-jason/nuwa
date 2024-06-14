import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";
import {Cell} from "@antv/x6";
import {NzModalService} from "ng-zorro-antd/modal";
import {ListenerSettingComponent} from "../listener-setting/listener-setting.component";
import {NuwaWidget, NuwaListener} from "../../nuwa";
import {WidgetService} from "../../widget.service";
import {NuwaProject} from "../../project";

@Component({
    selector: 'nuwa-listeners',
    templateUrl: './listeners.component.html',
    styleUrl: './listeners.component.scss'
})
export class ListenersComponent implements OnInit, OnDestroy {

    @Input() project!: NuwaProject
    @Input() canvas!: CanvasComponent;

    widget!: NuwaWidget

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

    constructor(private ms: NzModalService, private ws: WidgetService) {
    }

    getActionName(key: any) {
        return this.ACTIONS[key]
    }

    getEventName(key: any) {
        if (key == "click")
            return "点击"
        if (this.widget.events)
            for (let i = 0; i < this.widget.events.length; i++) {
                if (this.widget.events[i].name == key)
                    return this.widget.events[i].label
            }
        return '[' + key + ']'
    }

    onCellSelected(event: { cell: Cell }) {
        this.cell = event.cell
        this.widget = this.ws.Get(this.cell.shape)
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
                canvas: this.canvas,
                project: this.project,
                widget: this.widget
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
                canvas: this.canvas,
                project: this.project,
                widget: this.widget,
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
