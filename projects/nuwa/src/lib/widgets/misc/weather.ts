import {NuwaComponent} from "../../nuwa";
import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {SmartSelectOption} from "@god-jason/smart";
import {WeatherSvgBase64} from "./weather_svg";

@Component({
    selector: '$nuwa-misc-weather',
    standalone: true,
    imports: [
        CommonModule,
    ],
    styles: `
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }`,
    template: `
        <iframe [src]="src"></iframe>`
})
class MiscWeatherComponent {
    base = "https://i.tianqi.com/"
    src!: SafeResourceUrl

    constructor(private sanitizer: DomSanitizer) {
        this.setUrl()
    }

    _code = "code"

    @Input() set code(code: string) {
        this._code = code
        this.setUrl()
    }

    _id = 1

    @Input() set id(id: number) {
        this._id = id
        this.setUrl()
    }

    setUrl() {
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.base + "?c=" + this._code + "&id=" + this._id)
    }
}

function createWeatherOptions() {
    let options: SmartSelectOption[] = []
    for (let i = 1; i < 50; i++) {
        options.push({label: "样式" + i, value: i})
    }
    return options
}

export const MiscWeather: NuwaComponent = {
    name: '天气', id: ':weather:',
    icon: WeatherSvgBase64, //icon: "assets/widgets/weather.svg",
    type: "angular",
    metadata: {width: 200, height: 100},
    content: MiscWeatherComponent,
    properties: [
        {key: "data/ngArguments/code", label: "授权码", type: "text", default: "code"},
        {key: "data/ngArguments/id", label: "样式", type: "select", options: createWeatherOptions(), default: 1},
    ],
    bindings: [],
    hooks: {},
}
