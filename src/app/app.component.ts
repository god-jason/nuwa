import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {EditorModule} from "../../projects/nuwa/src/lib/editor/editor.module";
import {NuwaImage, NuwaNinePatchGallery} from "../../projects/nuwa/src/lib/nuwa";

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
    backgrounds: NuwaImage[] = [
        {url: "/assets/backgrounds/bk.jpg"},
        {url: "/assets/backgrounds/bk1.jpg"},
        {url: "/assets/backgrounds/bk2.jpg"},
        {url: "/assets/backgrounds/bk3.png"},
        {url: "/assets/backgrounds/bk4.jpg"},
        {url: "/assets/backgrounds/bk5.png"},
        {url: "/assets/backgrounds/bk7.png"},
        {url: "/assets/backgrounds/bk9.jpg"},
        {url: "/assets/backgrounds/bk10.png"},
        {url: "/assets/backgrounds/bk11.png"},
        {url: "/assets/backgrounds/bk12.jpg"},
    ];

    ninePatches: NuwaNinePatchGallery[] = [{
        name: "点9图",
        images: [
            {
                url: "/assets/widgets/.9.png",
                top: 58,
                bottom: 58,
                left: 58,
                right: 58,
            }
        ]
    }];
}
