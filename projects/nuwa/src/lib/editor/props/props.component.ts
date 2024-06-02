import {Component, Input} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";
import {NuwaImage} from "../../nuwa";

@Component({
  selector: 'nuwa-props',
  templateUrl: './props.component.html',
  styleUrl: './props.component.scss'
})
export class PropsComponent {
    @Input() canvas!: CanvasComponent;
    @Input() backgrounds!: NuwaImage[];

}
