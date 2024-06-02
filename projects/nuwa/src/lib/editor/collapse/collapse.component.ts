import {Component, Input} from '@angular/core';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NgClass} from "@angular/common";

@Component({
    selector: 'nuwa-collapse',
    templateUrl: './collapse.component.html',
    standalone: true,
    imports: [
        NzIconDirective,
        NgClass
    ],
    styleUrls: ['./collapse.component.scss']
})
export class CollapseComponent {
    @Input() open = true
    @Input() title = "标题";

}
