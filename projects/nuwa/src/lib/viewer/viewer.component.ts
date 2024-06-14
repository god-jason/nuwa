import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NuwaPage, NuwaProject} from "../project";
import {RenderComponent} from "./render/render.component";
import {NuwaCollection, NuwaEventData} from "../nuwa";
import {WidgetService} from "../widget.service";

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
    //组件集合
    @Input() set components(cols: NuwaCollection[]){
        this.cs.PutCollections(cols)
    }

    //项目
    @Input() project!: NuwaProject

    //变量
    @Input() values: any = {}

    //事件
    @Output() event = new EventEmitter<NuwaEventData>();

    constructor(private cs: WidgetService) {
    }


}
