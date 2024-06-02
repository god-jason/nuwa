import {Component, Input} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
  selector: 'nuwa-props',
  templateUrl: './props.component.html',
  styleUrl: './props.component.scss'
})
export class PropsComponent {
    @Input() canvas!: CanvasComponent;

}
