import {NuwaComponent} from "../../nuwa";
import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DefaultEvents} from "../properties";
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
    @Input() text = "文本框"
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
        {label: "文本", key: `data/ngArguments/text`, type: "textarea"},
    ],
    bindings: [],
    hooks: {},
}
