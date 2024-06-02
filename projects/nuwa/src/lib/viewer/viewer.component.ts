import {Component, Input} from '@angular/core';
import {NuwaPage, NuwaProject} from "../project";
import {RenderComponent} from "./render/render.component";
import {NuwaCollection} from "../nuwa";

@Component({
    selector: 'nuwa-viewer',
    standalone: true,
    imports: [
        RenderComponent
    ],
    templateUrl: './viewer.component.html',
    styleUrl: './viewer.component.scss'
})
export class ViewerComponent {
    _project!: NuwaProject

    @Input() set project(project: NuwaProject) {
        this._project = project
        this.page = project.pages[0] //默认打开第一个
    }

    page!: NuwaPage

    //组件集合
    @Input() components!: NuwaCollection[]

    constructor() {
    }
}
