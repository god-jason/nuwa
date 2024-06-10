import {NuwaComponent} from "../../nuwa";
import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TimeSvgBase64} from "./time_svg";

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

    now = Date.now();

    @Input() format = 'yyyy-MM-dd HH:mm:ss';

    internal: number = 0

    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.internal = setInterval(() => {
            //console.log("tick")
            this.now = Date.now();
            this.changeDetectorRef.detectChanges()
        }, 500)
    }

    ngOnDestroy(): void {
        clearInterval(this.internal);
    }
}

export const MiscTime: NuwaComponent = {
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
        ]},
    ],
    bindings: [],
    hooks: {},
}
