import {Component, Input, ViewChild} from '@angular/core';
import {SmartEditorComponent, SmartField} from "@god-jason/smart";
import {NuwaImage, NuwaPageSize} from "../../nuwa";

import {CanvasComponent} from "../canvas/canvas.component";

@Component({
    selector: 'nuwa-page-setting',
    templateUrl: './page-setting.component.html',
    styleUrl: './page-setting.component.scss'
})
export class PageSettingComponent {
    @Input() canvas!: CanvasComponent;
    @Input() backgrounds!: NuwaImage[];

    @ViewChild("editor") editor!: SmartEditorComponent;

    fields: SmartField[] = [
        {key: 'name', label: '名称', type: 'text'},
        {key: 'width', label: '宽度', type: 'number'},
        {key: 'height', label: '高度', type: 'number'},
        {
            key: 'background', label: '背景', type: 'object', children: [
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
            ], change: (value: any) => {
                this.canvas.page.background = value
                this.canvas.graph.drawBackground(value)
            }
        },

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

    sizeVisible = false;
    backgroundVisible = false;

    onChange() {
        let value = this.editor.value
        console.log("page change", value)
        Object.assign(this.canvas.page, value)
    }

    selectSize(b: NuwaPageSize) {
        this.editor.patchValue({width: b.width, height: b.height})
        this.sizeVisible = false
    }

    selectBackground(b: NuwaImage) {
        this.editor.patchValue({background: {image: b.url}})
        this.backgroundVisible = false
    }
}
