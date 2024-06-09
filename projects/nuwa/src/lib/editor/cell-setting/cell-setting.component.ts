import {Component, Input} from '@angular/core';
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
    selector: 'nuwa-cell-setting',
    templateUrl: './cell-setting.component.html',
    styleUrl: './cell-setting.component.scss'
})
export class CellSettingComponent {
    @Input() canvas!: CanvasComponent;
}
