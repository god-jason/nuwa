import {Component, Input} from '@angular/core';
import {RequestService} from "iot-master-smart";
import {CanvasComponent} from "../canvas/canvas.component";
import {BaseImage} from "../../widgets/base/image";
import {NuwaImageGallery, NuwaNinePatchGallery, NuwaNinePatchImage} from "../../nuwa";
import {NinePatchImage} from "../../widgets/misc/9.patch";

@Component({
  selector: 'nuwa-nine-patch',
  templateUrl: './nine-patch.component.html',
  styleUrl: './nine-patch.component.scss'
})
export class NinePatchComponent {
    @Input() galleries!: NuwaNinePatchGallery[]
    @Input() canvas!: CanvasComponent;

    constructor() {
    }

    onDragStart($event: DragEvent, image: NuwaNinePatchImage) {
        this.canvas?.drawNode($event, NinePatchImage, {data:{ngArguments: image}})
    }
}
