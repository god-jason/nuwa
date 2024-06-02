import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {CanvasComponent} from "./canvas/canvas.component";
//import {ComponentService} from "../component.service";
import {RequestService} from "iot-master-smart";
import {NuwaPage, NuwaProject, projectTemplate} from "../project";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {SideBarComponent, SideBarItemDirective} from "./side-bar/side-bar.component";
import {PagesComponent} from "./pages/pages.component";
import {WidgetsComponent} from "./widgets/widgets.component";
import {ComponentsComponent} from "./components/components.component";
import {GalleriesComponent} from "./galleries/galleries.component";
import {ElementsComponent} from "./elements/elements.component";
import {SourcesComponent} from "./sources/sources.component";
import {PropsComponent} from "./props/props.component";
import {ListenersComponent} from "./listeners/listeners.component";
import {ScriptsComponent} from "./scripts/scripts.component";
import {NuwaCollection} from "../nuwa";

@Component({
    selector: 'nuwa-editor',
    standalone: true,
    imports: [
        ToolbarComponent,
        SideBarComponent,
        SideBarItemDirective,
        PagesComponent,
        WidgetsComponent,
        ComponentsComponent,
        GalleriesComponent,
        ElementsComponent,
        SourcesComponent,
        CanvasComponent,
        PropsComponent,
        ListenersComponent,
        ScriptsComponent,
    ],
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

    index = 0;

    scale = 1;

    @ViewChild("canvas") renderer!: CanvasComponent

    @Output() onSave = new EventEmitter<NuwaProject>()

    constructor(private title: Title, private rs: RequestService) {
    }

    handleSave() {
        this._project.pages[this.index].content = this.renderer.graph.toJSON()
        this.onSave.emit(this._project)
    }

    handlePageChange($event: number) {
        //保存当前页
        this._project.pages[this.index].content = this.renderer.graph.toJSON()
        this.index = $event

        //渲染新页
        //this.renderer.Render(this._project.pages[this.index])
        this.page = this._project.pages[this.index]
    }

}
