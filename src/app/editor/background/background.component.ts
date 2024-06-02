import {Component, Input, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SmartEditorComponent, SmartField} from "iot-master-smart";
import {NuwaPage} from "../../../nuwa/project";
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
  selector: 'app-background',
  standalone: true,
    imports: [
        FormsModule,
        SmartEditorComponent,
        ReactiveFormsModule
    ],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent {
    @Input() canvas!: CanvasComponent;

    @ViewChild("editor") editor!: SmartEditorComponent;

    fields: SmartField[] = [
        {key: 'color', label: '背景色', type: 'color'},
        {key: 'image', label: '图片', type: 'file'},
        {key: 'size', label: '缩放', type: 'select', options: [
                {label: "自动", value: "auto auto"},
                {label: "包含", value: "contain"},
                {label: "覆盖", value: "cover"},
                {label: "拉伸", value: "100% 100%"},
            ], default: "100% 100%"},
    ];

    onChange() {
        let value = this.editor.value
        console.log("background change", value)
        //Object.assign(this.page, value)

        this.canvas.page.background = value
        this.canvas.graph.drawBackground(value)
    }

}
