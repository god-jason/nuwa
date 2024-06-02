import {Component, Input} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
  selector: 'app-elements',
  standalone: true,
  imports: [],
  templateUrl: './elements.component.html',
  styleUrl: './elements.component.scss'
})
export class ElementsComponent {
    @Input() canvas!: CanvasComponent;

}
