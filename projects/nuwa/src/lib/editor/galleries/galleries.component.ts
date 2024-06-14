import {Component, Input} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";
import {NuwaImage, NuwaImageGallery} from "../../nuwa";
import {MiscImageSwitch} from "../../widgets/misc/image-switch";
import {MiscImages} from "../../widgets/misc/images";
import {SvgUse} from "../../widgets/misc/svg-use";
import {SvgUseSwitch} from "../../widgets/misc/svg-use-switch";
import {SvgUses} from "../../widgets/misc/svg-uses";
import {MiscImage} from "../../widgets/misc/image";

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

        //使用svg图片（省流量，可调色）
        if (img.use) {

            if (img.urls && img.urls.length > 0) {
                if (img.switch) {
                    //图开关
                    this.canvas?.drawNode($event, SvgUseSwitch, {
                        "data/off": img.urls[0],
                        "data/on": img.urls[1],
                        "attrs/image/xlink:href": img.urls[0],
                        "data/name": (img.name || 'Svg图开关') + (this.canvas.graph.getCellCount() + 1)
                    })
                } else {
                    //图集
                    this.canvas?.drawNode($event, SvgUses, {
                        "data/urls": img.urls,
                        "attrs/image/xlink:href": img.urls[0],
                        "data/name": (img.name || 'Svg图集') + (this.canvas.graph.getCellCount() + 1)
                    })
                }
            } else if (img.url) {
                this.canvas?.drawNode($event, SvgUse, {
                    "attrs/image/xlink:href": img.url,
                    "data/name": (img.name || 'Svg图片') + (this.canvas.graph.getCellCount() + 1)
                })
            } else {
                $event.preventDefault()
            }

        } else {

            if (img.urls && img.urls.length > 0) {
                if (img.switch) {
                    //图开关
                    this.canvas?.drawNode($event, MiscImageSwitch, {
                        "data/off": img.urls[0],
                        "data/on": img.urls[1],
                        "attrs/image/xlink:href": img.urls[0],
                        "data/name": (img.name || '图开关') + (this.canvas.graph.getCellCount() + 1)
                    })
                } else {
                    //图集
                    this.canvas?.drawNode($event, MiscImages, {
                        "data/urls": img.urls,
                        "attrs/image/xlink:href": img.urls[0],
                        "data/name": (img.name || '图集') + (this.canvas.graph.getCellCount() + 1)
                    })
                }
            } else if (img.url) {
                this.canvas?.drawNode($event, MiscImage, {
                    "attrs/image/xlink:href": img.url,
                    "data/name": (img.name || '图片') + (this.canvas.graph.getCellCount() + 1)
                })
            } else {
                $event.preventDefault()
            }
        }


    }
}
