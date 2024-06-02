import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {EditorComponent} from "../../projects/nuwa/src/lib/editor/editor.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [
        RouterOutlet,
        EditorComponent,
    ],
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Nuwa';
}
