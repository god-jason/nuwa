import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Injector,
    Input,
    OnDestroy,
    Output
} from '@angular/core';
import {Cell, Graph, ObjectExt, Shape} from "@antv/x6";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NuwaPage, NuwaProject} from "../../project";
import {WidgetService} from "../../widget.service";
import {defaultsDeep, isFunction, isObject, isString} from "lodash-es";
import {NuwaWidget, NuwaEventData, NuwaListener} from "../../nuwa";
import {register} from "@antv/x6-angular-shape";

@Component({
    selector: 'nuwa-render',
    standalone: true,
    imports: [],
    templateUrl: './render.component.html',
    styleUrl: './render.component.scss'
})
export class RenderComponent implements AfterViewInit, OnDestroy {

    //项目
    _project!: NuwaProject

    get project(): NuwaProject {
        return this._project
    }

    @Input() set project(project: NuwaProject) {
        this._project = project
        //this.render(project) //渲染
        this._page = project.pages[0] //默认打开第一个
    }

    //页面
    _page!: NuwaPage

    get page(): NuwaPage {
        return this._page
    }

    @Input() set page(page: NuwaPage) {
        this._page = page
        this.render(page) //渲染
    }

    @Input() set values(variables: any) {
        this.patchValues(variables)
    }

    @Output() event = new EventEmitter<NuwaEventData>()

    //页面变量
    variables: any = {}

    private graph!: Graph;

    @Input() mousewheel = false
    @Input() panning = false
    @Input() full = false
    @Input() padding = 10

    tools: any = {
        //set
    }

    constructor(
        private ns: NzNotificationService,
        private ws: WidgetService,
        private injector: Injector,
        private element: ElementRef
    ) {

    }

    ngAfterViewInit() {

        this.graph = new Graph({
            container: this.element.nativeElement,
            interacting: false,
            mousewheel: this.mousewheel,
            panning: this.panning,
            autoResize: this.full,
            background: {
                color: "#c0c0c0" //默认背景颜色
            }
        });

        this.graph.on('cell:click', ({cell, e}) => {
            this.handleEvent(cell, 'click', undefined)

            try {
                let cmp = this.ws.Get(cell.shape)
                // @ts-ignore
                cmp?.listeners?.click?.call(this, cell, e, this.tools)
            } catch (e: any) {
                this.ns.error("点击事件处理错误", e.message)
            }
        });

        this.graph.on('cell:mouseenter', ({cell, e}) => {

            try {
                let cmp = this.ws.Get(cell.shape)
                // @ts-ignore
                cmp?.listeners?.mouseenter?.call(this, cell, e, this.tools)
            } catch (e: any) {
                this.ns.error("鼠标事件处理错误", e.message)
            }
        });

        this.graph.on('cell:mouseleave', ({cell, e}) => {
            try {
                let cmp = this.ws.Get(cell.shape)
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

        if (this._page)
            this.render(this._page)
    }

    _handleEvent(cell: Cell, listener: NuwaListener, parameters: any, obj: any, value: any) {
        //处理不同动作
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
                            values: obj,
                        }
                    })
                    this.event.emit({event: "page", data: listener.page})
                } else {
                    //当前页面
                    this.page = this.project.pages[index]
                    this.setVariables(obj)
                }
                break
            case "link":
                let u = new URL(listener.url || "")
                Object.keys(parameters).forEach(k => {
                    u.searchParams.append(k, parameters[k])
                })
                let url = u.toString()

                if (listener.iframe == "_blank")//新标签页
                    window.open(url, "_blank")
                else if (listener.iframe) //子窗口
                    this.graph.getCellById(listener.iframe)?.setData({ngArguments: {url: url}})
                else //当前窗口
                    location.href = url
                break
            case "set":
                this.setVariables(obj)
                this.event.emit({event: "set", data: obj})
                break
            case "show":
                if (listener.cell) {
                    this.graph.getCellById(listener.cell)?.show()
                    this.event.emit({event: "show", data: listener.cell})
                }
                break
            case "hide":
                if (listener.cell) {
                    this.graph.getCellById(listener.cell)?.hide()
                    this.event.emit({event: "hide", data: listener.cell})
                }
                break
            case "animate":

                break
            case "script":
                if (isFunction(listener.script)) {
                    try {
                        //'$graph', '$cell', '$event', '$value', '$variables', $set, '$tools',
                        //@ts-ignore
                        listener.script.call(this, this.graph, cell, listener.event, value, this.variables, this.$set, this.tools)
                        //this.event.emit({event:"script", data: cell.id})
                    } catch (e: any) {
                        this.ns.error("组件事件响应处理错误", e.message)
                    }
                }
                break
        }
    }

    handleEvent(cell: Cell, event: string, value: any) {
        //change事件，反向同步
        if (event == "change") {
            let k = cell.data.bindings?.value
            if (k && k.length > 0) {
                let obj = {}
                ObjectExt.setByPath(obj, k, value, '.')
                this.setVariables(obj)
                this.event.emit({event: "set", data: obj})
            }
        }

        //处理事件
        cell?.data.listeners?.forEach((listener: NuwaListener) => {
            if (event != listener.event) return


            let parameters: any = {}
            let obj: any = {}
            listener.parameters?.forEach(p => {
                //计算表达式
                if (p.value) {
                    let value = this.eval(p.value)
                    parameters[p.name] = value
                    ObjectExt.setByPath(obj, p.name, value, '.')
                }
            })

            //延迟处理
            if (listener.delay > 0) {
                setTimeout(() => this._handleEvent(cell, listener, parameters, obj, value), listener.delay)
            } else {
                this._handleEvent(cell, listener, parameters, obj, value)
            }

        })
    }

    //页面名称(编辑时使用)
    _name = ''
    @Input() set name(name: string) {
        this._name = name

        if (!this.graph)
            this.graph = new Graph({
                container: this.element.nativeElement,
                interacting: false,
                background: {
                    color: "#c0c0c0" //默认背景颜色
                }
            });

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

    evaluate(expr: string, params: any) {
        const keys = Object.keys(params);
        const values = Object.values(params);
        return (new Function(...keys, 'return ' + expr))(...values)
    }

    eval(expr: string): any {
        const keys = Object.keys(this.variables);
        const values = Object.values(this.variables);

        try {
            //效率可能有点低
            return new Function(...keys, 'return ' + expr)(...values)
        } catch (e: any) {
            return undefined
        }
    }


    //更新变量
    private setVariable(key: string, value: any) {
        //更新到values
        //ObjectExt.setByPath(this.values, key, value, '.')

        //依次执行
        this.graph.getCells().forEach(cell => {

            //查询绑定。。。
            if (isObject(cell.data.bindings))
                Object.keys(cell.data.bindings).forEach(k => {
                    const bind = cell.data?.bindings[k]
                    if (bind != key) return

                    //执行钩子
                    let cmp = this.ws.Get(cell.shape)
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

    private $set = (key: string, value: any)=>{
        this.setVariable(key, value)
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

    private intervals: number[] = []

    public clear() {
        this.graph.clearCells()
        this.graph.clearBackground()

        //清空脚本定时器
        this.intervals.forEach(interval => {clearInterval(interval)})

        //执行离开的脚本
        this.page.scripts.forEach(s=>{
            if (s.type == "leave" && isFunction(s.script)) {
                let func = s.script as Function
                try {
                    func(this.graph, this.variables, this.$set, this.tools)
                } catch (e: any) {
                    this.ns.error("脚本执行错误", s.script + ' ' + e.message)
                }
            }
        })

        //变量也清空，避免影响
        this.variables = {}
    }

    //渲染
    public render(page: NuwaPage) {
        this.clear()

        //预处理，注册组件
        page.content?.cells?.forEach((cell: any) => {
            const cmp = this.ws.Get(cell.shape)
            if (!cmp) {
                cell.shape = "rect" //应该改为未知对象
                return
            }

            this.checkRegister(cmp)
        })

        this.graph.drawBackground(page.background || {})

        this.graph.fromJSON(page.content)

        if (this.full) {
            this.graph.centerContent()
            this.graph.zoomToFit({padding: this.padding})
        }

        //编译脚本
        page.scripts.forEach(s=>{
            if (isString(s.script) && s.script.length > 0) {
                try {
                    let func =  new Function('$graph', '$variables', '$set', '$tools', s.script)
                    s.script = func

                    if (s.type == "enter") {
                        if (s.delay) setTimeout(()=>func(this.graph, this.variables, this.$set, this.tools), s.delay)
                        else func(this.graph, this.variables, this.$set, this.tools)
                    } else if (s.type == "interval") {
                        let id = setInterval(()=>func(this.graph, this.variables, this.$set, this.tools), (s.interval as number) * 1000)
                        this.intervals.push(id)
                    } else if (s.type == "crontab") {
                        //暂不支持
                    }
                } catch (e: any) {
                    this.ns.error("脚本编译错误", s.script + ' ' + e.message)
                }
            }
        })

        //监听事件
        this.graph.getCells().forEach(cell => {
            const cmp = this.ws.Get(cell.shape)
            if (!cmp) return

            //Angular组件，监听事件
            if (cmp.type=='angular' && cmp.content) {
                let listener = new EventEmitter<NuwaEventData>()
                listener.subscribe(event => {
                    this.handleEvent(cell, event.event, event.data)
                })
                cell.setPropByPath("data/ngArguments/listener", listener)
            }

            //编译组件的事件处理
            if (isObject(cmp.listeners))
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
            if (isObject(cmp.hooks))
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
                        listener.script = new Function('$graph', '$cell', '$event', '$value', '$variables', '$set', '$tools', listener.script)
                    } catch (e: any) {
                        this.ns.error("脚本编译错误", listener.script + ' ' + e.message)
                    }
                }
            })

        })

        //初始化数值
        let variables = {}
        page.variables?.forEach(v => {
            if (v.type == "string") {
                ObjectExt.setByPath(variables, v.name, v.value, '.')
            } else if (v.value) {
                let value = this.eval(v.value)
                ObjectExt.setByPath(variables, v.name, value, '.')
            }
        })
        this.patchValues(variables)

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
        this.clear()
    }

    checkRegister(widget: NuwaWidget): boolean {
        if (widget.registered || widget.internal)
            return true
        widget.registered = true

        switch (widget.type) {
            case "line":
                //注册线
                if (widget.extends) {
                    Graph.registerEdge(widget.id, widget.extends, true)
                    return true
                }
                this.ns.error("编译错误", widget.id + " " + widget.name + "缺少extends")
                break
            case "shape":
                //注册衍生组件
                if (widget.extends) {
                    Graph.registerNode(widget.id, widget.extends, true)
                    return true
                }
                this.ns.error("编译错误", widget.id + " " + widget.name + "缺少extends")
                break;
            case "html":
                // @ts-ignore
                Shape.HTML.register({
                    shape: widget.id,
                    width: widget.metadata?.width || 100,
                    height: widget.metadata?.height || 100,
                    // @ts-ignore
                    html: widget.html,
                })
                break;
            case "angular":
                if (widget.content) {
                    register({
                        shape: widget.id,
                        width: widget.metadata?.width || 100,
                        height: widget.metadata?.height || 100,
                        content: widget.content,
                        injector: this.injector,
                    })
                    widget.registered = true
                    return true
                }
                this.ns.error("编译错误", widget.id + " " + widget.name + "缺少content")
                break;
        }
        return false
    }
}
