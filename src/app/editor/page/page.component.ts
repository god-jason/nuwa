import {Component, Input, ViewChild} from '@angular/core';
import {SmartEditorComponent, SmartField} from "iot-master-smart";
import {ReactiveFormsModule} from "@angular/forms";
import {NuwaPage} from "../../../nuwa/project";

@Component({
    selector: 'app-page',
    standalone: true,
    imports: [
        SmartEditorComponent,
        ReactiveFormsModule
    ],
    templateUrl: './page.component.html',
    styleUrl: './page.component.scss'
})
export class PageComponent {
    @Input() page!: NuwaPage;

    @ViewChild("editor") editor!: SmartEditorComponent;

    fields: SmartField[] = [
        {key: 'name', label: '名称', type: 'text'},
        {key: 'width', label: '宽度', type: 'number'},
        {key: 'height', label: '高度', type: 'number'},
        //{key: 'background', label: '背景色', type: 'color'},
    ];

    onChange() {
        let value = this.editor.value
        console.log("page change", value)
        Object.assign(this.page, value)
    }

}
