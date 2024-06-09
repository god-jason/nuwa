import {Component, Input, ViewChild} from '@angular/core';
import {NuwaProject} from "../../project";
import {SmartEditorComponent, SmartField} from "@god-jason/smart";
import {Editor} from "codemirror";

@Component({
    selector: 'nuwa-variables',
    templateUrl: './variables.component.html',
    styleUrl: './variables.component.scss'
})
export class VariablesComponent {
    @Input() project!: NuwaProject;
    fields: SmartField[] = [
        {
            key: 'variables', label: '', type: 'table', children: [
                {key: 'name', label: '变量', type: 'text'},
                {key: 'label', label: '显示', type: 'text'},
                {
                    key: 'type', label: '类型', type: 'select', default: 'number', options: [
                        {value: 'number', label: '数值'},
                        {value: 'boolean', label: '布尔'},
                        {value: 'string', label: '字符串'},
                        {value: 'array', label: '数组'},
                        {value: 'object', label: '对象'},
                    ]
                },
                {key: 'value', label: '值', type: 'text'},
            ]
        }
    ];

    @ViewChild("editor") editor!: SmartEditorComponent;

    onChange() {
        this.project.variables = this.editor.value.variables
        console.log("variables change", this.project.variables)
    }
}
