import {Component, Input} from '@angular/core';
import {NuwaWidgets} from "../../widgets/widgets";
import {NuwaComponent} from "../../nuwa";
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
    selector: 'nuwa-widgets',
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
