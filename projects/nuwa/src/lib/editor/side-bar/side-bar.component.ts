import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    Directive,
    HostBinding,
    HostListener,
    Input,
    QueryList,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';

@Directive({selector: '[sideBarItem]'})
export class SideBarItemDirective {
    @Input("sideBarItem") title = 'tab'

    constructor(private templateRef: TemplateRef<any>,
                private viewContainerRef: ViewContainerRef) {
    }

    show() {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
    }

    hide() {
        this.viewContainerRef.clear();
    }
}


@Component({
    selector: 'nuwa-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements AfterViewInit, AfterContentInit {
    @ContentChildren(SideBarItemDirective, {descendants: true}) components = new QueryList<SideBarItemDirective>();

    @HostBinding("style.width") styleWidth = "200px";
    @HostBinding("style.flex-direction") styleFlexDirection = "row";
    @Input() index = 0;
    splitting = false;
    lastX = 0;

    //右对齐
    _right = false;

    @Input() set right(p: boolean) {
        this._right = p
        this.styleFlexDirection = p ? "row-reverse" : "row";
    }

    //宽度
    _width = 200

    @Input() set width(w: number) {
        this._width = w
        this.styleWidth = w + "px"
    }

    onClick(i: number) {
        if (this.index > -1)
            this.components.get(this.index)?.hide()
        if (this.index == i) {
            this.index = -1
            this.styleWidth = "auto"
        } else {
            this.components.get(i)?.show()
            this.index = i
            this.width = this._width
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.components.length > 0) {
                let index = (this.index < this.components.length) ? this.index : 0
                this.components.get(index)?.show()
            }
        }, 10)
    }

    ngAfterContentInit() {

    }

    onSplit($event: MouseEvent) {
        this.splitting = true
        this.lastX = $event.screenX
    }

    @HostListener("window:mousemove", ["$event"])
    onMouseMove($event: MouseEvent) {
        if (!this.splitting) return;
        let dx = $event.screenX - this.lastX;
        let w = (this._right) ? this._width - dx : this._width + dx
        if (w > 50)
            this.width = w
        this.lastX = $event.screenX
    }

    @HostListener("window:mouseup", ["$event"])
    onMouseUp($event: MouseEvent) {
        this.splitting = false
    }
}
