import {AfterViewInit, Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";
import {SmartEditorComponent, SmartField} from "@god-jason/smart";
import {NuwaScript} from "../../project";


export declare interface ScriptData {
    script: NuwaScript,
}

@Component({
    selector: 'nuwa-script-setting',
    templateUrl: './script-setting.component.html',
    styleUrls: ['./script-setting.component.scss']
})
export class ScriptSettingComponent implements AfterViewInit {

    readonly data: ScriptData = inject(NZ_MODAL_DATA);

    name: SmartField = {key: "name", label: "名称", type: "text", default: ""}

    delay: SmartField = {key: "delay", label: "延迟ms", type: "number", min: 0, max: 9999999, step: 1, hidden: true}

    interval: SmartField = {key: "interval", label: "固定间隔s", type: "number", min: 0, max: 9999999, step: 1, hidden: true}

    crontab: SmartField = {key: "crontab", label: "计划任务", type: "text", default: "", hidden: true}

    type: SmartField = {
        key: "type", label: "类型", type: "select", default: "enter", options: [
            {value: "enter", label: "进入页面"},
            {value: "leave", label: "离开页面"},
            {value: "interval", label: "固定间隔"},
            {value: "crontab", label: "计划任务", disabled: true},
        ], change: (v) => this.onActionChange(v)
    }

    script: SmartField = {key: "script", label: "脚本", type: "template"}


    fields: SmartField[] = [
        this.name,
        this.type,
        this.delay,
        this.interval,
        this.crontab,
        this.script,
    ]

    @ViewChild("editor") editor!: SmartEditorComponent
    @ViewChild("scriptEditor") scriptEditor!: TemplateRef<any>;

    constructor() {
    }

    ngAfterViewInit(): void {
        this.script.template = this.scriptEditor

        //初始化
        this.onActionChange(this.data.script?.type || 'enter')
    }

    onActionChange(type: string): void {
        console.log("type change", type)

        this.delay.hidden = true
        this.interval.hidden = true
        this.crontab.hidden = true

        if (type == "enter") {
            this.delay.hidden = false
        } else if (type == "leave") {
            this.delay.hidden = false
        } else if (type == "interval") {
            this.interval.hidden = false
        } else if (type == "crontab") {
            this.crontab.hidden = false
        }
    }

}
