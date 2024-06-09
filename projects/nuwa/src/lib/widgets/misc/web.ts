import {NuwaComponent} from "../../nuwa";
import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {WebSvg} from "./web_svg";

@Component({
    selector: '$nuwa-misc-web',
    standalone: true,
    imports: [
        CommonModule,
    ],
    styles: `
        iframe {
            width: 100%;
            height: 100%;
            border: none;
            background-color: #e1e1e1;
        }`,
    template: `
        <iframe [src]="src"></iframe>`
})
class MiscWebComponent {
    src!: SafeResourceUrl

    constructor(private sanitizer: DomSanitizer) {
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl("")
    }

    @Input() set url(u: string) {
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(u)
    }
}

export const MiscWeb: NuwaComponent = {
    name: '网页', id: ':iframe:',
    svg: WebSvg, //icon: "assets/widgets/web.svg",
    type: "angular",
    metadata: {width: 200, height: 160},
    content: MiscWebComponent,
    properties: [
        {key: "data/ngArguments/url", label: "URL", type: "text"},
        {key: "data/name", label: "名称", type: "text", default: "新建web入口"},
    ],
    bindings: [],
    hooks: {},
}
