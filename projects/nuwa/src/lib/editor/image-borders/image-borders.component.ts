import {Component, Input} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";
import {NuwaImageBorderGallery, NuwaImageBorder} from "../../nuwa";
import {ImageBorder} from "../../widgets/misc/image-border";

@Component({
  selector: 'nuwa-image-borders',
  templateUrl: './image-borders.component.html',
  styleUrl: './image-borders.component.scss'
})
export class ImageBordersComponent {
    @Input() borders!: NuwaImageBorderGallery[]
    @Input() canvas!: CanvasComponent;

    constructor() {
    }

    onDragStart($event: DragEvent, image: NuwaImageBorder) {
        this.canvas?.drawNode($event, ImageBorder, {data:{ngArguments: image}})
    }
}
