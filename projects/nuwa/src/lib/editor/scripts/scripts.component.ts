import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NuwaPage, NuwaScript} from "../../project";
import {NzModalService} from "ng-zorro-antd/modal";
import {ScriptSettingComponent} from "../script-setting/script-setting.component";

@Component({
    selector: 'nuwa-scripts',
    templateUrl: './scripts.component.html',
    styleUrl: './scripts.component.scss'
})
export class ScriptsComponent implements OnInit, OnDestroy {
    @Input() page!: NuwaPage;


    constructor(private ms: NzModalService) {
    }

    ACTIONS: any = {
        enter: '进入页面',
        leave: '退出页面',
        interval: '周期执行',
        crontab: '计划任务'
    }

    getTypeName(key: any) {
        return this.ACTIONS[key]
    }


    ngOnInit() {
    }

    ngOnDestroy(): void {

    }

    add() {
        if (!this.page.scripts)
            this.page.scripts = []

        this.ms.create<ScriptSettingComponent>({
            nzContent: ScriptSettingComponent,
            nzTitle: "创建脚本",
            nzData: {
            },
            nzOnOk: ref => {
                this.page.scripts?.push(ref.editor.value)
            }
        })
    }

    edit(i: number) {
        let script = this.page.scripts?.[i]

        this.ms.create<ScriptSettingComponent>({
            nzContent: ScriptSettingComponent,
            nzTitle: "编辑脚本",
            nzData: {
                script: script,
            },
            nzOnOk: ref => {
                //this.cell.data.listeners[i] = ref.editor.value
                // @ts-ignore
                this.page.scripts[i] = ref.editor.value
            }
        })
    }

    delete(i: number) {
        this.page.scripts?.splice(i, 1)
    }

}
