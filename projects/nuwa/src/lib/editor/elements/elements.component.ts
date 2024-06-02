import {Component, Input} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
  selector: 'nuwa-elements',
  standalone: true,
  imports: [],
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.scss'
})
export class ElementsComponent {
    @Input() canvas!: CanvasComponent;

}
