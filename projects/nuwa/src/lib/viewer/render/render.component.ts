import {Component, ElementRef, EventEmitter, HostListener, Input} from '@angular/core';
import {Cell, Graph} from "@antv/x6";
import {Subscription} from "rxjs";
//import {WindowComponent} from "../viewer/window/window.component";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzModalService} from "ng-zorro-antd/modal";
import {NuwaPage, NuwaProject} from "../../project";
import {ComponentService} from "../../component.service";
import {defaultsDeep, isFunction, isObject, isString} from "lodash-es";
import {NuwaEventData, NuwaListener} from "../../nuwa";

@Component({
    selector: 'nuwa-render',
    standalone: true,
    imports: [],
    templateUrl: './render.component.html',
    styleUrl: './render.component.scss'
})
export class RenderComponent {

    @Input() project!: NuwaProject
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
                //nzContent: WindowComponent,
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
        private ns: NzNotificationService,
        private ms: NzModalService,
        private cs: ComponentService,
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
            this.triggerEvent(cell, 'click', undefined)

            try {
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

    triggerEvent(cell: Cell, event: string, value: any) {
        //TODO change事件，反向同步

        cell?.data.listeners?.forEach((listener: NuwaListener) => {
            if (event != event) return


            let parameters: any = {}
            listener.parameters?.forEach(p => {
                //TODO 计算表达式
                parameters[p.name] = p.value
            })

            //listener.action
            switch (listener.action) {
                case "page":
                    let index = this.project.pages.findIndex(p => p.name == listener.page)
                    if (listener.outlet) {
                        let outlet = this.graph.getCellById(listener.outlet)
                        //打开页面
                        outlet.setData({
                            ngArguments: {
                                project: this.project,
                                page: this.project.pages[index],
                                values: parameters,
                            }
                        })
                    } else {
                        //当前页面
                        this.page = this.project.pages[index]
                    }
                    break
                case "link":
                    let u = new URL(listener.url || "")
                    Object.keys(parameters).forEach(k => {
                        u.searchParams.append(k, parameters[k])
                    })

                    let url = u.toString()

                    if (listener.iframe == "_blank")
                        //新标签页
                        window.open(url, "_blank")
                    else if (listener.iframe)
                        //子窗口
                        this.graph.getCellById(listener.iframe)?.setData({ngArguments: {url: url}})
                    else
                        //当前窗口
                        location.href = url
                    break
                case "set":
                    Object.keys(parameters).forEach(k => {
                        this.setVariable(k, parameters[k])
                    })
                    break
                case "show":
                    if (listener.cell)
                        this.graph.getCellById(listener.cell)?.show()
                    break
                case "hide":
                    if (listener.cell)
                        this.graph.getCellById(listener.cell)?.hide()
                    break
                case "animate":

                    break
                case "script":
                    if (isFunction(listener.script)) {
                        try {
                            listener.script.call(this, cell, event, this.tools)
                        } catch (e: any) {
                            this.ns.error("组件事件响应处理错误", e.message)
                        }
                    }
                    break
            }
        })
    }

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
                    text: '子页面：' + name,
                    textAnchor: "start"
                },
            }
        })
    }

    _page!: NuwaPage

    get page(): NuwaPage {
        return this._page
    }

    @Input() set page(page: NuwaPage) {
        this._page = page
        this.render(page) //渲染
    }

    evaluate(expr: string, params: any) {
        const keys = Object.keys(params);
        const values = Object.values(params);
        return (new Function(...keys, 'return ' + expr))(...values)
    }


    //变量
    variables: any = {}

    @Input() set values(variables: any) {
        this.patchValues(variables)
    }

    //更新变量
    private setVariable(key: string, value: any) {
        //更新到values
        //ObjectExt.setByPath(this.values, key, value, '.')

        //依次执行
        this.graph.getCells().forEach(cell => {

            //查询绑定。。。
            Object.keys(cell.data?.bindings).forEach(k => {
                const bind = cell.data?.bindings[k]
                if (bind != key) return

                //执行钩子
                let cmp = this.cs.Get(cell.shape)
                if (!cmp) return
                let hook = cmp?.hooks?.[k]
                if (!hook) return

                //编译hook
                if (isString(hook)) {
                    try {// @ts-ignore
                        hook = new Function('cell', 'value', hook)
                    } catch (e: any) {
                        this.ns.error("hook编译错误", hook + ' ' + e.message)
                        return
                    }
                    // @ts-ignore
                    cmp.hooks[k] = hook
                }

                if (isFunction(hook))
                    hook.call(this, cell, value)
            })
        })
    }

    //递归更新变量
    private setVariables(obj: any, prefix = '') {
        Object.keys(obj).forEach(key => {
            let val = obj[key]

            //设置值
            this.setVariable(key, val)

            //递归更新，解决订阅对象成员
            if (isObject(val))
                this.setVariables(val, key + ".")

            //TODO 尚未支持数组成员更新
        })
    }

    //更新数据
    public patchValues(values: any) {
        defaultsDeep(this.variables, values)
        this.setVariables(values)
    }

    //渲染
    public render(page: NuwaPage) {

        //预处理，注册组件
        page.content?.cells?.forEach((cell: any) => {
            const cmp = this.cs.Get(cell.shape)
            if (!cmp) return
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
            if (!cmp) return

            //Angular组件，监听事件
            if (cmp.content) {
                let listener = new EventEmitter<NuwaEventData>()
                listener.subscribe(event => {
                    this.triggerEvent(cell, event.event, event.data)
                })
                cell.setPropByPath("data/ngArguments/listener", listener)
            }

            //编译组件的事件处理
            // @ts-ignore
            Object.keys(cmp.listeners).forEach(k => {
                // @ts-ignore
                let listener = cmp.listeners[k]
                if (isString(listener))
                    try { // @ts-ignore
                        cmp.listeners[k] = new Function('cell', 'event', 'tools', listener)
                    } catch (e: any) {
                        this.ns.error("脚本编译错误", listener + ' ' + e.message)
                    }

            })

            //编译组件的数据绑定处理
            // @ts-ignore
            Object.keys(cmp.hooks).forEach(k => {
                // @ts-ignore
                let hook = cmp.hooks[k]
                if (isString(hook) && hook.length > 0)
                    try {// @ts-ignore
                        cmp.hooks[k] = new Function('cell', 'value', hook)
                    } catch (e: any) {
                        this.ns.error("hook编译错误", hook + ' ' + e.message)
                        return
                    }
            })

            //编译元素的处理编译
            cell.data?.listeners?.forEach((listener: NuwaListener) => {
                if (isString(listener.script) && listener.script.length > 0) {
                    try { // @ts-ignore
                        listener.script = new Function('cell', 'event', 'tools', func)
                    } catch (e: any) {
                        this.ns.error("脚本编译错误", listener.script + ' ' + e.message)
                    }
                }
            })

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
