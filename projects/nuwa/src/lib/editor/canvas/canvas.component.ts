import {Component, ElementRef, Injector, Input} from '@angular/core';
import {Cell, Edge, FunctionExt, Graph, Node, Shape} from '@antv/x6';
import {Transform} from "@antv/x6-plugin-transform";
import {Snapline} from "@antv/x6-plugin-snapline";
import {Clipboard} from "@antv/x6-plugin-clipboard";
import {Keyboard} from "@antv/x6-plugin-keyboard";
import {History} from "@antv/x6-plugin-history";
import {Selection} from "@antv/x6-plugin-selection";
import {Export} from "@antv/x6-plugin-export";
import {Dnd} from "@antv/x6-plugin-dnd";
import {NuwaWidget} from "../../nuwa";
import {register} from '@antv/x6-angular-shape'
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NuwaPage} from "../../project";
import {WidgetService} from "../../widget.service";

//线段编辑器改为红色，使用有问题
// Graph.registerEdgeTool('nuwa-segments', {inherit: 'segments', attrs: {fill: 'red',},})
// Graph.registerEdgeTool('nuwa-vertices', {inherit: 'vertices', attrs: {fill: 'red',},})
// Graph.registerEdgeTool('nuwa-target-arrowhead', {inherit: 'target-arrowhead', attrs: {fill: 'red',},})
// Graph.registerEdgeTool('nuwa-source-arrowhead', {inherit: 'source-arrowhead', attrs: {fill: 'red'},})

@Component({
    selector: 'nuwa-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent {
    public graph: Graph;
    public dnd: Dnd;

    public currentCell?: Cell;
    public currentComponent?: NuwaWidget;

    private drawingEdgeComponent?: NuwaWidget
    private drawingEdge?: Edge

    constructor(
        private ns: NzNotificationService,
        private ws: WidgetService,
        private injector: Injector,
        element: ElementRef,
    ) {

        this.graph = new Graph({
            container: element.nativeElement,
            background: {
                //color: graphBgc.color, // 设置画布背景颜色
                //color: "#F20FF0"
            },
            grid: {
                size: 10,      // 默认网格大小 10px TODO 需要做成动态调整的，不然会影响绘制精度
                visible: JSON.parse(localStorage.getItem("nuwa-editor-grid") || 'true'), // 渲染网格背景
                //type: "mesh",
                type: "fixedDot"
            },
        });

        //补充插件
        this.graph.use(new Export());
        this.graph.use(new Keyboard({enabled: true}));
        this.graph.use(new Transform({resizing: true, rotating: true}));
        this.graph.use(new Snapline({enabled: true}))
        this.graph.use(new Clipboard({enabled: true}))
        this.graph.use(new History({enabled: true}));
        this.graph.use(new Selection({//选中
            enabled: true,
            multiple: true,
            rubberband: true,
            rubberEdge: true,
            movable: true,
            strict: true,
            showNodeSelectionBox: true
        }));

        // this.graph.use(new Scroller({
        //     enabled: true,
        //     pannable: true,
        //     pageVisible: true,
        //     pageBreak: true,
        //     autoResize: false,
        // }))

        //拖放插件，用于创建新图形
        this.dnd = new Dnd({target: this.graph});

        this.graph.bindKey('ctrl+s', (e) => {
            this.graph.exportPNG();
            e.preventDefault()
        })

        //快捷键
        this.graph.bindKey('ctrl+z', () => this.graph.undo())
        this.graph.bindKey('ctrl+y', () => this.graph.redo())
        this.graph.bindKey('ctrl+x', () => this.graph.cut(this.graph.getSelectedCells(), {deep: true}))
        this.graph.bindKey('ctrl+c', () => this.graph.copy(this.graph.getSelectedCells(), {deep: true}))
        this.graph.bindKey('ctrl+v', () => {
            let cs = this.graph.paste()
            cs.forEach(cell => cell.data.name += '_copy')
            this.graph.resetSelection(cs)
        })
        this.graph.bindKey('backspace', () => this.graph.getSelectedCells().forEach(cell => cell.remove()))
        this.graph.bindKey('delete', () => this.graph.getSelectedCells().forEach(cell => cell.remove()))

        this.graph.bindKey("escape", () => {
            //取消选择
            this.graph.unselect(this.graph.getSelectedCells())
            this.graph.clearTransformWidgets()

            //取消划线
            if (this.drawingEdge) {
                //this.drawingEdge.remove()
                this.drawingEdge = undefined
            }
        })

        //绘线
        this.graph.container.onclick = (event) => {
            if (this.drawingEdgeComponent) {
                //console.log("draw line on click")
                this.drawingEdge = this.graph.addEdge({
                    shape: this.drawingEdgeComponent.id,
                    source: [event.offsetX, event.offsetY],
                    target: [event.offsetX + 10, event.offsetY + 10],
                    ...this.drawingEdgeComponent.metadata,
                });
                //设置名称
                this.drawingEdge.setPropByPath("data/name", this.drawingEdgeComponent.name + (this.graph.getCellCount() + 1))
                this.drawingEdgeComponent = undefined;

                this.graph.select(this.drawingEdge)
            } else {
                this.drawingEdge = undefined
            }
        }

        this.graph.container.onmousemove = (event) => {
            if (this.drawingEdge) {
                //console.log("draw line on move")
                this.drawingEdge.setTerminal("target", {x: event.offsetX, y: event.offsetY})
            }
        }

        //线段编辑
        this.graph.on('edge:selected', FunctionExt.debounce(({edge}) => {
            edge.addTools([
                {name: 'source-arrowhead'},// args:{attrs:{fill:'#0000ff'}}},
                {name: 'target-arrowhead'},
                {name: 'vertices'},
                {name: 'segments'}])
        }))

        this.graph.on('edge:unselected', ({cell}) => {
            cell.removeTools();
        })

        this.graph.on('cell:selected', ({cell}) => {
            this.currentCell = cell
            this.currentComponent = this.ws.Get(cell.shape)
        })

        this.graph.on('cell:unselected', ({cell}) => {
            this.currentCell = undefined
            this.currentComponent = undefined
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

    render(page: NuwaPage) {
        page.content?.cells?.forEach((cell: any) => {
            const cmp = this.ws.Get(cell.shape)
            if (!cmp) {
                cell.shape = "rect" //应该改为未知对象
                return
            }
            this.checkRegister(cmp)
        })

        //绘制背景
        this.graph.drawBackground(page.background || {})

        //恢复内容
        this.graph.fromJSON(page.content)
    }

    drawBackground() {
        this.graph.drawBackground(this.page.background)
    }

    drawEdge(ws: NuwaWidget) {
        this.drawingEdgeComponent = undefined

        //检查是否已经注册
        if (!this.checkRegister(ws)) {
            //TODO 报错
            return;
        }

        if (ws.type == "line") {
            this.drawingEdgeComponent = ws;
            return
        }
    }

    drawNode($event: DragEvent, ws: NuwaWidget, inputs: any = {}) {
        let node!: Node

        //检查是否已经注册
        if (!this.checkRegister(ws)) {
            //this.ns.error("错误", "未注册"+ws.name)
            return;
        }

        if (ws.type == "line") {
            this.ns.error("错误", "线条不能拖放")
            return
        }

        //参数
        let props: any = {}
        ws.properties?.forEach(f => {
            if (f.default !== undefined)
                props[f.key] = f.default
        })

        //绑定的数据
        //ws.bindings?.forEach(b => props[b.name] = b.default)

        //创建节点
        node = this.graph.createNode({
            shape: ws.id,
            ...ws.metadata,
            //data: props,
        })

        //初始化数据
        //node.setProp(props)
        Object.keys(props).forEach(k => {
            node.setPropByPath(k, props[k])
        })

        //输入
        //node.setProp(inputs)
        Object.keys(inputs).forEach(k => {
            node.setPropByPath(k, inputs[k])
        })

        //设置名称
        //node.setPropByPath("data/name", ws.name + (this.graph.getCellCount() + 1))

        this.dnd.start(node, $event);
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
