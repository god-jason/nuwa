import {NuwaWidget, NuwaEventData} from "../../nuwa";
import {ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TimeSvgBase64} from "./time_svg";
import {ngTextProperties} from "../properties";

@Component({
    selector: '$nuwa-misc-time',
    standalone: true,
    imports: [
        CommonModule,
    ],
    styles: ``,
    template: `{{now | date: format }}`
})
class MiscTimeComponent implements OnInit, OnDestroy{
    @Input() listener = new EventEmitter<NuwaEventData>();

    now = Date.now();
    timer: number = 0 //定时器

    @Input() format = 'yyyy-MM-dd HH:mm:ss';

    @HostBinding("style.font-size") _fontSize = '16px';
    @Input() set fontSize(fontSize: number) {
        this._fontSize = fontSize + 'px';
    }
    @Input() @HostBinding("style.font-family") fontFamily = "SimHei";
    @Input() @HostBinding("style.font-weight") fontWeight = "normal";
    @Input() @HostBinding("style.font-style") fontStyle = "normal";
    @Input() @HostBinding("style.text-align") textAlign = "left";


    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.timer = setInterval(() => {
            //console.log("tick")
            this.now = Date.now();
            this.changeDetectorRef.detectChanges()
        }, 500)
    }

    ngOnDestroy(): void {
        clearInterval(this.timer);
    }
}

export const MiscTime: NuwaWidget = {
    name: '时间', id: ':time:',
    icon: TimeSvgBase64, //icon: "assets/widgets/time.svg",
    type: "angular",
    metadata: {width: 200, height: 40},
    content: MiscTimeComponent,
    properties: [
        {key: "data/ngArguments/format", label: "格式", type: "text", auto: [
                {value:"yyyy-MM-dd HH:mm:ss", label: "yyyy-MM-dd HH:mm:ss"},
                {value:"yyyy-MM-dd", label: "yyyy-MM-dd"},
                {value:"yyyy-MM-dd EEEE", label: "yyyy-MM-dd EEEE"},
                {value:"HH:mm:ss", label: "HH:mm:ss"},
                {value:"H:m:s", label: "H:m:s"},
                {value:"H:mm:ss", label: "H:mm:ss"},
                {value:"yyyy年M月d日 H时m分s秒", label: "yyyy年M月d日 H时m分s秒"},
                {value:"yyyy年M月d日", label: "yyyy年M月d日"},
                {value:"yyyy年M月d日 EEEE", label: "yyyy年M月d日 星期几"},
                {value:"H时m分s秒", label: "H时m分s秒"},
        ], default: 'yyyy-MM-dd HH:mm:ss'},
        ...ngTextProperties
    ],
    bindings: [],
    hooks: {},
}
