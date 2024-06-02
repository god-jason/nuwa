import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
    selector: 'nuwa-about',
    templateUrl: './about.component.html',
    standalone: true,
    imports: [
        NgForOf
    ],
    styleUrls: ['./about.component.scss']
})
export class AboutComponent {
    contributors: any = [
        {name: '杰神', url: 'https://github.com/zgwit', email:'jason@zgwit.com'},
        {name: 'EnTrouble', url: 'https://github.com/EnTrouble', email:'hutianqi@zgwit.cn'},
    ];

}
