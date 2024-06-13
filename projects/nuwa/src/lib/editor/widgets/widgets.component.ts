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
        //node.setPropByPath("data/name", component.name + (this.graph.getCellCount() + 1))
        this.canvas?.drawNode($event, component, {
            "data/name": component.name + (this.canvas.graph.getCellCount() + 1)
        })
    }

    onClick(c: NuwaComponent) {
        this.canvas?.drawEdge(c)
    }
}
