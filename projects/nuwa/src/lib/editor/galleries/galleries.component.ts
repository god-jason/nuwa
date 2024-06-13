import {Component, Input} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";
import {BaseImage} from "../../widgets/base/image";
import {NuwaImage, NuwaImageGallery} from "../../nuwa";
import {ImageSwitch} from "../../widgets/misc/image-switch";
import {Images} from "../../widgets/misc/images";
import {SvgUse} from "../../widgets/misc/svg-use";
import {SvgUseSwitch} from "../../widgets/misc/svg-use-switch";

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


    onDragStart($event: DragEvent, img: NuwaImage) {
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

        if (img.use) {

            if (img.urls && img.urls.length > 0) {
                if (img.switch) {
                    //图开关
                    this.canvas?.drawNode($event, SvgUseSwitch, {
                        "data/off": img.urls[0],
                        "data/on": img.urls[1],
                        "attrs/image/xlink:href": img.urls[0],
                        "data/name": (img.name || '图开关') + (this.canvas.graph.getCellCount() + 1)
                    })
                } else {
                    //图集
                    this.canvas?.drawNode($event, Images, {
                        "data/urls": img.urls,
                        "attrs/image/xlink:href": img.urls[0],
                        "data/name": (img.name || '图集') + (this.canvas.graph.getCellCount() + 1)
                    })
                }
            } else if (img.url) {
                this.canvas?.drawNode($event, SvgUse, {
                    "attrs/image/xlink:href": img.url,
                    "data/name": (img.name || '图片') + (this.canvas.graph.getCellCount() + 1)
                })
            } else {
                $event.preventDefault()
            }

            return
        }


        if (img.urls && img.urls.length > 0) {
            if (img.switch) {
                //图开关
                this.canvas?.drawNode($event, ImageSwitch, {
                    "data/off": img.urls[0],
                    "data/on": img.urls[1],
                    "attrs/image/xlink:href": img.urls[0],
                    "data/name": (img.name || '图开关') + (this.canvas.graph.getCellCount() + 1)
                })
            } else {
                //图集
                this.canvas?.drawNode($event, Images, {
                    "data/urls": img.urls,
                    "attrs/image/xlink:href": img.urls[0],
                    "data/name": (img.name || '图集') + (this.canvas.graph.getCellCount() + 1)
                })
            }
        } else if (img.url) {
            this.canvas?.drawNode($event, BaseImage, {
                "attrs/image/xlink:href": img.url,
                "data/name": (img.name || '图片') + (this.canvas.graph.getCellCount() + 1)
            })
        } else {
            $event.preventDefault()
        }
    }
}
