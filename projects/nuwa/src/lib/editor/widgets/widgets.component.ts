import {Component, Input} from '@angular/core';
import {NuwaWidgets} from "../../widgets/widgets";
import {NuwaWidget} from "../../nuwa";
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
    selector: 'nuwa-widgets',
    templateUrl: './widgets.component.html',
    styleUrl: './widgets.component.scss'
})
export class WidgetsComponent {
    widgets = NuwaWidgets

    @Input() canvas!: CanvasComponent;

    onDragStart($event: DragEvent, widget: NuwaWidget) {
        this.canvas?.drawNode($event, widget, {
            "data/name": widget.name + (this.canvas.graph.getCellCount() + 1)
        })
    }

    onClick(c: NuwaWidget) {
        this.canvas?.drawEdge(c)
    }
}
