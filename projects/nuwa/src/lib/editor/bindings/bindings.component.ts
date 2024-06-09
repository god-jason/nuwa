import {Component, Input} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";
import {NuwaProject} from "../../project";

@Component({
  selector: 'nuwa-bindings',
  templateUrl: './bindings.component.html',
  styleUrl: './bindings.component.scss'
})
export class BindingsComponent {
    @Input() canvas!: CanvasComponent;
    @Input() project!: NuwaProject;




}
