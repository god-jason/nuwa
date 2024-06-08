import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {CanvasComponent} from "./canvas/canvas.component";
//import {ComponentService} from "../component.service";
import {RequestService} from "iot-master-smart";
import {NuwaPage, NuwaProject, projectTemplate} from "../project";
import {NuwaCollection, NuwaImageGallery, NuwaImage, NuwaNinePatchGallery} from "../nuwa";

@Component({
    selector: 'nuwa-editor',
    templateUrl: './editor.component.html',
    styleUrl: './editor.component.scss'
})
export class EditorComponent {
    id: any = ''

    page!: NuwaPage

    _project: NuwaProject = projectTemplate()

    @Input() set project(project: NuwaProject) {
        this.title.setTitle(this._project.name)
        this.page = project.pages[0]
    }

    get project() {
        return this._project
    }

    //组件集合
    @Input() components!: NuwaCollection[]
    @Input() galleries!: NuwaImageGallery[];
    @Input() ninePatches!: NuwaNinePatchGallery[];
    @Input() backgrounds!: NuwaImage[];

    index = 0;

    scale = 1;

    @ViewChild(CanvasComponent) canvas!: CanvasComponent

    @Output() onSave = new EventEmitter<NuwaProject>()

    constructor(private title: Title, private rs: RequestService) {
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
