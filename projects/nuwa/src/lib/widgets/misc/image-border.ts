import {NuwaComponent} from "../../nuwa";
import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
    selector: '$nuwa-misc-web',
    standalone: true,
    imports: [
        CommonModule,
    ],
    styles: `
        :host {
            display: block;
            width: 100%;
            height: 100%;

            //border:27px solid #000;
            box-sizing: border-box;
            border-color: transparent;
            border-style: solid;
            //border-width: 27px 27px 27px 27px;
            //border-image-source: url(border.png);
            //border-image-slice: 27 27 27 27;
            //border-image-width:27 27 27 27;
            //border-image-outset:27 27 27 27;
            border-image-width: auto;
            border-image-repeat: repeat; //stretch
        }
    `,
    template: ``,
    host: {
        //'[style.border-width]': `top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px'`,
        '[style.border-image-slice]': `top + ' ' + right + ' ' + bottom + ' ' + left + ' fill'`, //填充内容
        '[style.border-image-source]': `'url('+this.url+')'`,
    }
})
class ImageBorderComponent {
    @Input() url = 'assets/widgets/.9.png'
    @Input() top = 58
    @Input() right = 58
    @Input() bottom = 58
    @Input() left = 58

}

export const ImageBorder: NuwaComponent = {
    name: '图片边框', id: ':image-border:',
    icon: "assets/widgets/rect.svg",
    type: "angular",
    metadata: {width: 200, height: 200},
    content: ImageBorderComponent,
    properties: [
        {key: "data/ngArguments/url", label: "URL", type: "text", default: "assets/widgets/.9.png"},
        {key: "data/ngArguments/top", label: "上边距", type: "number", min: 0, max: 999999, default: 58},
        {key: "data/ngArguments/bottom", label: "下边距", type: "number", min: 0, max: 999999, default: 58},
        {key: "data/ngArguments/left", label: "左边距", type: "number", min: 0, max: 999999, default: 58},
        {key: "data/ngArguments/right", label: "右边距", type: "number", min: 0, max: 999999, default: 58},
    ],
    bindings: [],
    hooks: {},
}

