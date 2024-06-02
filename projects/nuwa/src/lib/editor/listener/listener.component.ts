import {Component, inject, Input} from '@angular/core';
import {Cell} from "@antv/x6";
import {NZ_MODAL_DATA} from "ng-zorro-antd/modal";
import {NuwaComponent, NuwaListener} from "../../nuwa";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NzSelectOptionInterface} from "ng-zorro-antd/select";


export declare interface ListenerData {
    component: NuwaComponent,
    listener: NuwaListener,
}

@Component({
    selector: 'nuwa-listener',
    templateUrl: './listener.component.html',
    styleUrls: ['./listener.component.scss']
})
export class ListenerComponent {
    @Input() cell!: Cell

    group!: FormGroup

    readonly data: ListenerData = inject(NZ_MODAL_DATA);
    actions: NzSelectOptionInterface[] = [
        {value: "page", label: "打开页面"},
        {value: "link", label: "打开链接"},
        {value: "set", label: "设置变量"},
        {value: "show", label: "显示元素"},
        {value: "hide", label: "隐藏元素"},
        {value: "animate", label: "执行动画"},
        {value: "script", label: "执行脚本"},
    ];

    constructor(private fb: FormBuilder) {
        let data = this.data.listener || {}
        this.group = this.fb.group({
            "event": [data.event || 'click'],
            "action": [data.action || 'set'],
            "target": [data.target],
            "delay": [data.delay || 0],
        })
    }

}
