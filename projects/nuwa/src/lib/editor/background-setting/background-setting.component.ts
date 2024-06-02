import {Component, Input, ViewChild} from '@angular/core';
import {SmartEditorComponent, SmartField} from "iot-master-smart";
import {CanvasComponent} from "../canvas/canvas.component";
import {NuwaImage} from "../../nuwa";

@Component({
    selector: 'nuwa-background-setting',
    templateUrl: './background-setting.component.html',
    styleUrl: './background-setting.component.scss'
})
export class BackgroundSettingComponent {
    @Input() canvas!: CanvasComponent;
    @Input() backgrounds!: NuwaImage[];

    @ViewChild("editor") editor!: SmartEditorComponent;

    fields: SmartField[] = [
        {key: 'color', label: '背景色', type: 'color'},
        {key: 'image', label: '图片', type: 'file'},
        {
            key: 'size', label: '缩放', type: 'select', options: [
                {label: "自动", value: "auto auto"},
                {label: "包含", value: "contain"},
                {label: "覆盖", value: "cover"},
                {label: "拉伸", value: "100% 100%"},
            ], default: "100% 100%"
        },
    ];

    isVisible = false;

    onChange() {
        let value = this.editor.value
        console.log("background change", value)
        //Object.assign(this.page, value)

        this.canvas.page.background = value
        this.canvas.graph.drawBackground(value)
    }

    showBackgrounds() {
        this.isVisible = true
    }

    selectBackground(b: NuwaImage) {
        this.editor.patchValue({image: b.url})
        this.isVisible = false
    }
}
