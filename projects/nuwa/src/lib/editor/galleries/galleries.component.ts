import {Component, Input} from '@angular/core';
import {RequestService} from "iot-master-smart";
import {CanvasComponent} from "../canvas/canvas.component";
import {BaseImage} from "../../widgets/base/image";

@Component({
    selector: 'nuwa-galleries',
    templateUrl: './galleries.component.html',
    styleUrl: './galleries.component.scss'
})
export class GalleriesComponent {
    images: any = []
    @Input() canvas!: CanvasComponent;

    constructor(private rs: RequestService) {
        this.load()
    }

    load() {
        this.rs.get("nuwa/galleries").subscribe(res => {
            this.images = res.data;
        })
    }

    onDragStart($event: DragEvent, img: string) {
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

        this.canvas?.drawNode($event, BaseImage, {"attrs/image/xlink:href": "/nuwa/gallery/" + img})
    }
}
