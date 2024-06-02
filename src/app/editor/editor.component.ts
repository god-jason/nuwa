import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {CanvasComponent} from "./canvas/canvas.component";
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivatedRoute, Router} from "@angular/router";
import {ComponentService} from "../component.service";
import {RequestService} from "iot-master-smart";
import {NuwaPage, NuwaProject, projectTemplate} from "../../nuwa/project";

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    id: any = ''

    project: NuwaProject = projectTemplate()
    page!: NuwaPage

    index = 0;

    scale = 1;

    @ViewChild("canvas") renderer!: CanvasComponent

    constructor(
        private title: Title,
        private rs: RequestService,
        private msg: NzMessageService,
        private router: Router,
        private route: ActivatedRoute,
        protected cs: ComponentService,
    ) {

        title.setTitle(this.project.name)
    }

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.has('id')) {
            this.id = this.route.snapshot.paramMap.get('id');
            this.rs.get(`api/project/${this.id}`).subscribe((res) => {
                this.project = res.data;
                //this.content = JSON.stringify(resData, undefined, '\t');
                this.title.setTitle(this.project.name)
                //this.renderer.graph.fromJSON(this.project.pages[0].content)
                //this.renderer.Render(this.project.pages[0])
                this.page = this.project.pages[0]
            });
        }
    }

    handleSave() {
        this.project.pages[this.index].content = this.renderer.graph.toJSON()

        let url = this.id ? `api/project/${this.id}` : `api/project/create`

        this.rs.post(url, this.project).subscribe((res) => {
            //this.project = res.data;
            //this.content = JSON.stringify(resData, undefined, '\t');
            this.router.navigateByUrl("/admin/project")
        });
    }

    handlePageChange($event: number) {
        //保存当前页
        this.project.pages[this.index].content = this.renderer.graph.toJSON()
        this.index = $event

        //渲染新页
        //this.renderer.Render(this.project.pages[this.index])
        this.page = this.project.pages[this.index]
    }

}
