import {Component, Input} from '@angular/core';
import {RequestService} from "iot-master-smart";
import {CanvasComponent} from "../canvas/canvas.component";
import {BaseImage} from "../../widgets/base/image";
import {NuwaImageGallery} from "../../nuwa";

@Component({
    selector: 'nuwa-galleries',
    templateUrl: './galleries.component.html',
    styleUrl: './galleries.component.scss'
})
export class GalleriesComponent {
    @Input() galleries!: NuwaImageGallery[]

    @Input() canvas!: CanvasComponent;

    constructor() {
    }


    onDragStart($event: DragEvent, url: string) {
        //this.renderer?.onDnd($event, BaseImage, {"imageUrl": "/nuwa/gallery/" + img}) //图片没有更换
        // this.canvas?.drawNode($event, {
        //     name: '',
        //     id: 'image',
        //     icon: "",
        //     type: "shape", internal: true,
        //     extends: {inherit: 'image'},
        //     metadata: {
        //         width: 200, height: 200,
        //         imageUrl: "/nuwa/gallery/" + img,
        //     }
        // })

        this.canvas?.drawNode($event, BaseImage, {"attrs/image/xlink:href": url})
    }
}
