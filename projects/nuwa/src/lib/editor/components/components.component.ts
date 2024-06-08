import {Component, Input} from '@angular/core';
import {NuwaCollection} from "../../nuwa";
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
    selector: 'nuwa-components',
    templateUrl: './components.component.html',
    styleUrl: './components.component.scss'
})
export class ComponentsComponent {

    @Input() canvas!: CanvasComponent;

    @Input() components!: NuwaCollection[];

    constructor() {
    }

}
