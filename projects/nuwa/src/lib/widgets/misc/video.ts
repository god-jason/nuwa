import {NuwaComponent, NuwaEventData} from "../../nuwa";
import {Component, EventEmitter, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {VideoSvgBase64} from "./video_svg";

@Component({
    selector: '$nuwa-misc-video',
    standalone: true,
    imports: [
        CommonModule,
    ],
    styles: `
        video {
            width: 100%;
            height: 100%;
            border: none;
            background-color: #e1e1e1;
        }`,
    template: `
        <video [src]="src" [autoplay]="autoplay" [loop]="loop" [controls]="controls" [muted]="muted" preload="auto"></video>`
})
class MiscVideoComponent {
    @Input() listener = new EventEmitter<NuwaEventData>();

    @Input() autoplay = true;
    @Input() controls = true;
    @Input() muted = true;
    @Input() loop = true;

    src!: SafeResourceUrl

    constructor(private sanitizer: DomSanitizer) {
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl("")
    }

    @Input() set url(u: string) {
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(u)
    }
}

export const MiscVideo: NuwaComponent = {
    name: '视频', id: ':video:',
    icon: VideoSvgBase64, //icon: "assets/widgets/video.svg",
    type: "angular",
    metadata: {width: 400, height: 300},
    content: MiscVideoComponent,
    properties: [
        {key: "data/name", label: "名称", type: "text", default: "新建视频入口"},
        {key: "data/ngArguments/url", label: "URL", type: "text"},
        {key: "data/ngArguments/autoplay", label: "自动播放", type: "switch", default: true},
        {key: "data/ngArguments/controls", label: "显示控件", type: "switch", default: true},
        {key: "data/ngArguments/loop", label: "循环播放", type: "switch", default: true},
        {key: "data/ngArguments/muted", label: "静音", type: "switch", default: true},
    ],
    bindings: [],
    hooks: {},
}
