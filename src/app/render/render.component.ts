import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {Graph} from "@antv/x6";
import {Subscription} from "rxjs";
import {WindowComponent} from "../viewer/window/window.component";
import {RequestService} from "iot-master-smart";
import {ComponentService} from "../component.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzModalService} from "ng-zorro-antd/modal";
import {NuwaPage} from "../../nuwa/project";

@Component({
    selector: 'app-render',
    standalone: true,
    imports: [],
    templateUrl: './render.component.html',
    styleUrl: './render.component.scss'
})
export class RenderComponent {

    //页面名称
    _name = ''
    @Input() set name(name: string) {
        this._name = name

        //清空
        this.graph.clearCells()

        //显示名称
        this.graph.addNode({
            shape: "rect", x: 0, y: 0, width: 30, height: 30,
            attrs: {
                rect: {fill: 'none', strokeWidth: 0},
                text: {
                    text: '子页面：'+name,
                    textAnchor: "start"
                },
            }
        })
    }

    _page!: NuwaPage

    @Input() set page(page: NuwaPage) {
        this._page = page
        this.render(page) //渲染
    }

    get page(): NuwaPage {
        return this._page
    }

    graph!: Graph;

    subs: Subscription[] = []

    @Input() mousewheel = false
    @Input() panning = false
    @Input() full = false
    @Input() padding = 10

    tools: any = {
        go: (page: string) => {
            // this.project.pages.forEach(value => {
            //     if (value.name == page)
            //         this.Render(value)
            // })
        },
        window: (url: string, width = 400, height = 300, title = '窗口') => {
            this.ms.create({
                nzContent: WindowComponent,
                nzData: {url, width, height, title},
                nzWidth: width + 48,
                nzFooter: null,
            })
        },
        open: (url: string, blank = false) => {
            if (blank)
                window.open(url)
            else
                location.href = url
        },
        get: (url: string, args: Object) => {
            this.rs.get(url, args).subscribe(() => {
            })
        },
        post: (url: string, body: Object) => {
            this.rs.post(url, body).subscribe(() => {
            })
        },
        auth: (cb: () => {}) => {
            // this.ms.create({
            //     nzContent: AuthComponent,
            //     nzTitle: "请输入登录密码",
            //     nzFooter: null
            // }).afterClose.subscribe(res => {
            //     if (res == 'ok') cb()
            // })
        }

    }

    constructor(
        private rs: RequestService,
        protected cs: ComponentService,
        private ns: NzNotificationService,
        private ms: NzModalService,
        //private mqtt: MqttService,
        element: ElementRef
    ) {
        //title.setTitle(this.project.name)
        this.graph = new Graph({
            container: element.nativeElement,
            interacting: false,
            mousewheel: this.mousewheel,
            panning: this.panning,
            autoResize: this.full,
            background: {
                color: "#c0c0c0" //默认背景颜色
            }
        });

        this.graph.on('cell:click', ({cell, e}) => {
            try {
                // 处理用户绑定的点击事件
                cell.data?.listeners?.click?.call(this, cell, e, this.tools)

                let cmp = this.cs.Get(cell.shape)
                // @ts-ignore
                cmp?.listeners?.click?.call(this, cell, e, this.tools)
            } catch (e: any) {
                this.ns.error("点击事件处理错误", e.message)
            }
        });

        this.graph.on('cell:mouseenter', ({cell, e}) => {
            try {
                let cmp = this.cs.Get(cell.shape)
                // @ts-ignore
                cmp?.listeners?.mouseenter?.call(this, cell, e, this.tools)
            } catch (e: any) {
                this.ns.error("鼠标事件处理错误", e.message)
            }
        });

        this.graph.on('cell:mouseleave', ({cell, e}) => {
            try {
                let cmp = this.cs.Get(cell.shape)
                // @ts-ignore
                cmp?.listeners?.mouseleave?.call(this, cell, e, this.tools)
            } catch (e: any) {
                this.ns.error("鼠标事件处理错误", e.message)
            }
        });

        this.graph.on("cell:custom", (e: any) => {
            //console.log('cell:custom', e.event, e.value)
            // 处理用户绑定的点击事件
            try {
                e.cell?.data.listeners?.[e.event]?.call(this, e.cell, e.value, this.tools)
            } catch (e: any) {
                this.ns.error("组件事件响应处理错误", e.message)
            }
        });

        // this.graph.addNode({
        //     shape: "rect", x: 0, y: 0, width: 60, height: 30,
        //     attrs: {
        //         rect: {fill: 'none', strokeWidth: 0},
        //         text: {text: '页面'},
        //     }
        // })
    }

    evaluate(expr: string, params: any) {
        const keys = Object.keys(params);
        const values = Object.values(params);
        return (new Function(...keys, 'return ' + expr))(...values)
    }

    public render(page: NuwaPage) {
        page.content?.cells?.forEach((cell: any) => {
            const cmp = this.cs.Get(cell.shape)
            //TODO 使用filter 过滤掉找不到组件的情况
        })

        this.graph.drawBackground(page.background || {})

        this.graph.fromJSON(page.content)

        if (this.full) {
            this.graph.centerContent()
            this.graph.zoomToFit({padding: this.padding})
        }

        //TODO 调用组件的init

        //清空订阅
        this.subs.forEach(sub => sub.unsubscribe())
        this.subs = []

        //监听事件
        this.graph.getCells().forEach(cell => {
            const cmp = this.cs.Get(cell.shape)

            //数据绑定
            if (cell.data?.bindings)
                for (const k in cell.data.bindings) {
                    if (!cell.data.bindings.hasOwnProperty(k)) continue
                    const binding: any = cell.data.bindings[k]
                    console.log("binding", cmp.id, k, binding)

                    //binding
                    // const topic = `up/property/${binding.product}/${binding.device}`
                    // const sub = this.mqtt.observe(topic).subscribe(res => {
                    //     const values = JSON.parse(res.payload.toString())
                    //     console.log("data", cmp.id, k, binding, values)
                    //     try { //@ts-ignore
                    //         cmp.hooks?.[k]?.call(this, cell, values[binding.variable])
                    //     } catch (e: any) {
                    //         this.ns.error("数据绑定错误", e.message)
                    //     }
                    // })
                    // this.subs.push(sub)
                }

            //事件处理编译
            if (cell.data?.listeners)
                for (const k in cell.data.listeners) {
                    if (!cell.data.listeners.hasOwnProperty(k)) continue
                    const func = cell.data.listeners[k]
                    if (typeof func === "string" && func.length > 0) {
                        try { // @ts-ignore
                            cell.data.listeners[k] = new Function('cell', 'event', 'tools', func)
                        } catch (e: any) {
                            this.ns.error("脚本编译错误" + k, func + ' ' + e.message)
                            cell.data.listeners[k] = () => {
                                this.ns.error("组件脚本错误" + k, func + ' ' + e.message)
                            }
                        }
                    }
                }
        })
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        if (!this.full) return

        //console.log(event.target)
        const width = event.target.innerWidth;
        const height = event.target.innerHeight;

        this.graph.resize(width, height)
        this.graph.centerContent()
        this.graph.zoomToFit({padding: this.padding})
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe())
    }

}
