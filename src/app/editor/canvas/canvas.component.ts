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

import {ComponentService} from "../../component.service";
import {NuwaComponent} from "../../../nuwa/nuwa";

import {register} from '@antv/x6-angular-shape'
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NuwaPage} from "../../../nuwa/project";


@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent {

    _page!: NuwaPage

    @Input() set page(page: NuwaPage) {
        this._page = page
        this.render(page) //渲染
    }

    get page(): NuwaPage {
        return this._page
    }

    public graph: Graph;

    dnd: Dnd;

    edge: Edge | undefined;

    constructor(
        private cs: ComponentService,
        private ns: NzNotificationService,
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
                size: 10,      // 网格大小 10px
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
        this.graph.bindKey('ctrl+v', () => this.graph.resetSelection(this.graph.paste()))
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
                    ...this.drawingEdgeComponent.metadata
                });
                this.drawingEdgeComponent = undefined;
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
            edge.addTools([{name: 'source-arrowhead'}, {name: 'target-arrowhead'}, {name: 'vertices'}, {name: 'segments'}])
        }))

        this.graph.on('edge:unselected', ({cell}) => {
            cell.removeTools();
        })

        this.graph.on('cell:selected', ({cell})=>{
            this.currentCell = cell
        })

        this.graph.on('cell:selected', ({cell})=>{
            this.currentCell = cell
        })
    }

    currentCell?: any;

    render(page: NuwaPage) {
        page.content?.cells?.forEach((cell: any) => {
            const cmp = this.cs.Get(cell.shape)
            //TODO 使用filter 过滤掉找不到组件的情况

        })

        //绘制背景 if (page.background)
        this.graph.drawBackground(page.background || {})

        //恢复内容
        this.graph.fromJSON(page.content)
    }

    drawBackground() {
        this.graph.drawBackground(this.page.background)
    }


    drawingEdgeComponent?: NuwaComponent
    drawingEdge?: Edge

    drawEdge(component: NuwaComponent) {
        this.drawingEdgeComponent = undefined

        //检查是否已经注册
        if (!this.checkRegister(component)) {
            //TODO 报错
            return;
        }

        if (component.type == "line") {
            this.drawingEdgeComponent = component;
            return
        }
    }

    drawNode($event: DragEvent, component: NuwaComponent, inputs: any = {}) {
        let node!: Node

        //检查是否已经注册
        if (!this.checkRegister(component)) {
            //this.ns.error("错误", "未注册"+component.name)
            return;
        }

        if (component.type == "line") {
            this.ns.error("错误", "线条不能拖放")
            return
        }

        //参数
        let props: any = {}
        component.properties?.forEach(f => {
            if (f.default !== undefined)
                props[f.key] = f.default
        })

        //绑定的数据
        component.bindings?.forEach(b => props[b.name] = b.default)

        //创建节点
        node = this.graph.createNode({
            shape: component.id,
            ...component.metadata,
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

        this.dnd.start(node, $event);
    }


    checkRegister(component: NuwaComponent): boolean {
        if (component.registered || component.internal)
            return true
        component.registered = true

        switch (component.type) {
            case "line":
                //注册线
                if (component.extends) {
                    Graph.registerEdge(component.id, component.extends)
                    return true
                }
                this.ns.error("编译错误", component.id + " " + component.name + "缺少extends")
                break
            case "shape":
                //注册衍生组件
                if (component.extends) {
                    Graph.registerNode(component.id, component.extends)
                    return true
                }
                this.ns.error("编译错误", component.id + " " + component.name + "缺少extends")
                break;
            case "html":
                // @ts-ignore
                Shape.HTML.register({
                    shape: component.id,
                    width: component.metadata?.width || 100,
                    height: component.metadata?.height || 100,
                    // @ts-ignore
                    html: component.html,
                })
                break;
            case "angular":
                if (component.content) {
                    register({
                        shape: component.id,
                        width: component.metadata?.width || 100,
                        height: component.metadata?.height || 100,
                        content: component.content,
                        injector: this.injector,
                    })
                    component.registered = true
                    return true
                }
                this.ns.error("编译错误", component.id + " " + component.name + "缺少content")
                break;
        }
        return false
    }

}
