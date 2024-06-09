import {Component, Input} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";
import {Cell} from "@antv/x6";

@Component({
    selector: 'nuwa-elements',
    templateUrl: './elements.component.html',
    styleUrl: './elements.component.scss'
})
export class ElementsComponent {
    @Input() canvas!: CanvasComponent;

    open(cell: Cell) {
        this.canvas.graph.cleanSelection()
        this.canvas.graph.clearTransformWidgets()
        this.canvas.graph.select(cell)
    }
}
