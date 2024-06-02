import {Component, Input} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
  selector: 'nuwa-elements',
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.scss'
})
export class ElementsComponent {
    @Input() canvas!: CanvasComponent;

}
