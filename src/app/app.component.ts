import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {EditorModule} from "../../projects/nuwa/src/lib/editor/editor.module";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [
        RouterOutlet,
        EditorModule,
    ],
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Nuwa';
}
