import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {CanvasComponent} from "./canvas/canvas.component";
import {NuwaPage, NuwaProject, projectTemplate} from "../project";
import {NuwaCollection, NuwaImage, NuwaImageBorderGallery, NuwaImageGallery} from "../nuwa";
import {ObjectExt} from "@antv/x6";

@Component({
    selector: 'nuwa-editor',
    templateUrl: './editor.component.html',
    styleUrl: './editor.component.scss'
})
export class EditorComponent {
    id: any = ''

    _project: NuwaProject = projectTemplate()
    page!: NuwaPage

    //组件集合
    @Input() components!: NuwaCollection[]
    @Input() galleries!: NuwaImageGallery[];
    @Input() imageBorders!: NuwaImageBorderGallery[];
    @Input() backgrounds!: NuwaImage[];
    index = 0;
    scale = 1;
    @ViewChild(CanvasComponent) canvas!: CanvasComponent
    @Output() onSave = new EventEmitter<NuwaProject>()

    constructor(private title: Title) {
        title.setTitle("NUWA 组态编辑器")
        //console.log(ObjectExt.flatten({a:{b:1}}))
    }

    get project() {
        return this._project
    }

    @Input() set project(project: NuwaProject) {
        this._project = project

        this.title.setTitle(this._project.name)
        this.page = project.pages[0]
    }

    handleSave() {
        this._project.pages[this.index].content = this.canvas.graph.toJSON()
        this.onSave.emit(this._project)
    }

    handlePageChange($event: number) {
        //保存当前页
        this._project.pages[this.index].content = this.canvas.graph.toJSON()
        this.index = $event

        //渲染新页
        //this.renderer.Render(this._project.pages[this.index])
        this.page = this._project.pages[this.index]
    }

}
