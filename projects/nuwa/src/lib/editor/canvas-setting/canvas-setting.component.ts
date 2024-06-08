import {Component, Input} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";
import {NuwaImage} from "../../nuwa";

@Component({
  selector: 'nuwa-canvas-setting',
  templateUrl: './canvas-setting.component.html',
  styleUrl: './canvas-setting.component.scss'
})
export class CanvasSettingComponent {
    @Input() canvas!: CanvasComponent;
    @Input() backgrounds!: NuwaImage[];
}
