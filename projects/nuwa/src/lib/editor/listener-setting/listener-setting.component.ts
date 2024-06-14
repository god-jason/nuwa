import {AfterViewInit, Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";
import {NuwaWidget, NuwaListener} from "../../nuwa";
import {SmartEditorComponent, SmartField} from "@god-jason/smart";
import {NuwaProject} from "../../project";
import {CanvasComponent} from "../canvas/canvas.component";


export declare interface ListenerData {
    canvas: CanvasComponent,
    project: NuwaProject,
    widget: NuwaWidget,
    listener: NuwaListener,
}

@Component({
    selector: 'nuwa-listener-setting',
    templateUrl: './listener-setting.component.html',
    styleUrls: ['./listener-setting.component.scss']
})
export class ListenerSettingComponent implements AfterViewInit {

    readonly data: ListenerData = inject(NZ_MODAL_DATA);

    event: SmartField = {key: "event", label: "事件", type: "select", default: "click"}

    cell: SmartField = {key: "cell", label: "目标", type: "select", hidden: true, options: []}

    outlet: SmartField = {key: "outlet", label: "入口", type: "select", hidden: true, options: []}
    page: SmartField = {key: "page", label: "页面", type: "select", hidden: true, options: []}

    iframe: SmartField = {key: "iframe", label: "web入口", type: "select", hidden: true, options: []}
    url: SmartField = {key: "url", label: "链接", type: "text", hidden: true}

    parameters: SmartField = {
        key: "parameters", label: "参数", type: "table", children: [
            {key: "name", label: "变量", type: "text"},
            {key: "value", label: "值（表达式）", type: "text"},
        ], hidden: true
    }

    script: SmartField = {key: "script", label: "品牌商", type: "template", hidden: true}

    action: SmartField = {
        key: "action", label: "执行动作", type: "select", default: "set", options: [
            {value: "page", label: "打开页面"},
            {value: "link", label: "打开链接"},
            {value: "set", label: "设置变量"},
            {value: "show", label: "显示元素"},
            {value: "hide", label: "隐藏元素"},
            {value: "animate", label: "执行动画"},
            {value: "script", label: "执行脚本"},
            //{value: "event", label: "发送事件"},
        ], change: (v) => this.onActionChange(v)
    }

    fields: SmartField[] = [
        this.event,
        this.action,
        {key: "delay", label: "延迟", type: "number", min: 0, max: 99999999},
        this.cell,
        this.outlet,
        this.page,
        this.iframe,
        this.url,
        this.parameters,
        this.script,
    ]

    @ViewChild("editor") editor!: SmartEditorComponent
    @ViewChild("scriptEditor") scriptEditor!: TemplateRef<any>;

    constructor() {
    }

    ngAfterViewInit(): void {
        this.cell.options = this.data.canvas.graph.getCells().map(p => {
            return {value: p.id, label: p.data.name}
        })

        this.outlet.options = this.data.canvas.graph.getCells().filter(p => p.shape == ":outlet:").map(p => {
            return {value: p.id, label: p.data.name}
        })
        this.outlet.options.unshift({value:'', label:'当前画布'})

        this.iframe.options = this.data.canvas.graph.getCells().filter(p => p.shape == ":iframe:").map(p => {
            return {value: p.id, label: p.data.name}
        })
        this.iframe.options.unshift({value:'', label:'当前窗口'}, {value:'_blank', label:'新窗口'})

        this.page.options = this.data.project.pages.map(p => {
            return {value: p.name, label: p.name}
        })

        this.event.options = this.data.widget?.events?.map(e => {
            return {value: e.name, label: e.label}
        })

        this.script.template = this.scriptEditor

        //初始化
        this.onActionChange(this.data.listener?.action || 'click')
    }

    onActionChange(action: string): void {
        console.log("action change", action)

        this.cell.hidden = true
        this.outlet.hidden = true
        this.page.hidden = true
        this.iframe.hidden = true
        this.url.hidden = true
        this.parameters.hidden = true
        this.script.hidden = true

        if (action == "page") {
            this.outlet.hidden = false
            this.page.hidden = false
            this.parameters.hidden = false
        } else if (action == "link") {
            this.iframe.hidden = false
            this.url.hidden = false
            this.parameters.hidden = false
        } else if (action == "set") {
            this.parameters.hidden = false
        } else if (action == "show" || action == "hide" || action == "animate") {
            this.cell.hidden = false
        } else if (action == "script") {
            this.script.hidden = false
        }
    }

}
