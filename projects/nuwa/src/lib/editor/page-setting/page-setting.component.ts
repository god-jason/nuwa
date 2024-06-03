import {Component, Input, ViewChild} from '@angular/core';
import {SmartEditorComponent, SmartField} from "iot-master-smart";
import {NuwaPage} from "../../project";
import {NuwaPageSize} from "../../nuwa";

@Component({
    selector: 'nuwa-page-setting',
    templateUrl: './page-setting.component.html',
    styleUrl: './page-setting.component.scss'
})
export class PageSettingComponent {
    @Input() page!: NuwaPage;

    @ViewChild("editor") editor!: SmartEditorComponent;

    fields: SmartField[] = [
        {key: 'name', label: '名称', type: 'text'},
        {key: 'width', label: '宽度', type: 'number'},
        {key: 'height', label: '高度', type: 'number'},
        //{key: 'background', label: '背景色', type: 'color'},
    ];

    @Input() sizes: NuwaPageSize[] = [
        {name: "SVGA", width: 800, height: 600},
        {name: "XGA", width: 1024, height: 768},
        {name: "UXGA", width: 1600, height: 1200},
        {name: "HD 720P", width: 1280, height: 720},
        {name: "Full HD 1080P", width: 1920, height: 1080},
        {name: "Quad HD 2K", width: 2560, height: 1440},
        {name: "UHD 4K", width: 3840, height: 2160},
    ]
    isVisible = false;

    onChange() {
        let value = this.editor.value
        console.log("page change", value)
        Object.assign(this.page, value)
    }

    selectSize(b: NuwaPageSize) {
        this.editor.patchValue({width: b.width, height: b.height})
        this.isVisible = false
    }
}
