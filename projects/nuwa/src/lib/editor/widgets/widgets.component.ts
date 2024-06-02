import {Component, Input} from '@angular/core';
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {CommonModule} from "@angular/common";
import {NuwaWidgets} from "../../widgets/widgets";
import {NuwaComponent} from "../../nuwa";
import {CanvasComponent} from "../canvas/canvas.component";
import {HtmlPipe} from "../html.pipe";
import {HtmlDirective} from "../html.directive";

@Component({
    selector: 'nuwa-widgets',
    standalone: true,
    imports: [
        CommonModule,
        NzCollapseModule,
        HtmlPipe,
        HtmlDirective,
    ],
    templateUrl: './widgets.component.html',
    styleUrl: './widgets.component.scss'
})
export class WidgetsComponent {
    widgets = NuwaWidgets

    @Input() canvas!: CanvasComponent;

    onDragStart($event: DragEvent, component: NuwaComponent) {
        this.canvas?.drawNode($event, component)
    }

    onClick(c: NuwaComponent) {
        this.canvas?.drawEdge(c)
    }
}
