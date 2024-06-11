import {NuwaComponent, NuwaEventData} from "../../nuwa";
import {Component, EventEmitter, HostBinding, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DefaultEvents, ngTextProperties} from "../properties";
import {TextSvgBase64} from "./text_svg";

@Component({
    selector: 'nuwa-control-text',
    standalone: true,
    imports: [
        CommonModule,
    ],
    styles: ``,
    template: `
        <pre>{{ text }}</pre>`
})
class ControlTextComponent {
    @Input() listener = new EventEmitter<NuwaEventData>();

    @Input() text = "文本框"

    @Input() @HostBinding("style.color") color = "black";

    @HostBinding("style.font-size") _fontSize = '16px';
    @Input() set fontSize(fontSize: number) {
        this._fontSize = fontSize + 'px';
    }

    @Input() @HostBinding("style.font-family") fontFamily = "SimHei";

    @Input() @HostBinding("style.font-weight") fontWeight = "normal";

    @Input() @HostBinding("style.font-style") fontStyle = "normal";

    @Input() @HostBinding("style.text-align") textAlign = "left";
}

export const ControlText: NuwaComponent = {
    name: '文本框', id: ':text:',
    icon: TextSvgBase64,
    type: "angular",
    metadata: {width: 160, height: 30},
    content: ControlTextComponent,
    events: [
        ...DefaultEvents,
    ],
    properties: [
        {label: "文本", key: `data/ngArguments/text`, type: "textarea", max: 99999, default: '这是一段文字'},
        ...ngTextProperties
    ],
    bindings: [],
    hooks: {},
}
