import {Component, Input} from '@angular/core';
import {PageSettingComponent} from "../page/page-setting.component";
import {PropertiesComponent} from "../properties/properties.component";
import {SideBarItemDirective} from "../side-bar/side-bar.component";
import {NgForOf} from "@angular/common";
import {NzCollapseComponent, NzCollapsePanelComponent} from "ng-zorro-antd/collapse";
import {CanvasComponent} from "../canvas/canvas.component";
import {TransformComponent} from "../transform/transform.component";
import {BackgroundComponent} from "../background/background.component";

@Component({
  selector: 'nuwa-props',
  standalone: true,
    imports: [
        PageSettingComponent,
        PropertiesComponent,
        SideBarItemDirective,
        NgForOf,
        NzCollapseComponent,
        NzCollapsePanelComponent,
        TransformComponent,
        BackgroundComponent
    ],
  templateUrl: './props.component.html',
  styleUrl: './props.component.scss'
})
export class PropsComponent {
    @Input() canvas!: CanvasComponent;

}
