import {Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {Node} from "@antv/x6";
import {NzModalService} from 'ng-zorro-antd/modal';
import {AboutComponent} from "../about/about.component";
import {CanvasComponent} from "../canvas/canvas.component";
import {BaseLine} from "../../widgets/base/line";
import {MiscFlow} from "../../widgets/misc/flow";
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {RenderComponent} from "../../viewer/render/render.component";
import {cloneDeep} from "lodash-es";
import {NuwaProject} from "../../project";
import {EditorComponent} from "../editor.component";

@Component({
    selector: 'nuwa-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    @Input() canvas!: CanvasComponent;
    @Input() project!: NuwaProject;

    // 1200X340
    //@Input() graph!: Graph;

    @Output() onSave = new EventEmitter()

    @Input() scale = 1
    @Output() scaleChange = new EventEmitter<number>()
    showGrid = JSON.parse(localStorage.getItem("nuwa-editor-grid") || 'true');

    //上传json
    @ViewChild('file', {static: true}) file!: ElementRef<HTMLInputElement>;

    constructor(
        private ms: NzModalService,
        private ds: NzDrawerService,
        private viewContainerRef: ViewContainerRef,
        private editor: EditorComponent,
    ) {
    }

    handleSave() {
        this.onSave.emit();
        //console.log("save", this.canvas.graph.toJSON())
    }

    handleExport() {
        this.canvas.page.content = this.canvas.graph.toJSON()

        const urlObject = window.URL || window.webkitURL || window;
        const export_blob = new Blob([JSON.stringify(this.project, null, 2)]);
        const save_link = document.createElement("a");
        save_link.href = urlObject.createObjectURL(export_blob);
        save_link.download = Date.now() + '.json';
        save_link.click();
    }

    handleUndo() {
        this.canvas.graph.undo()
    }

    handleRedo() {
        this.canvas.graph.redo()
    }

    handleCut() {
        this.canvas.graph.getSelectedCells().forEach(c => c.removeTools())
        this.canvas.graph.cut(this.canvas.graph.getSelectedCells(), {deep: true})
    }

    handleCopy() {
        this.canvas.graph.getSelectedCells().forEach(c => c.removeTools())
        this.canvas.graph.copy(this.canvas.graph.getSelectedCells(), {deep: true})
    }

    handlePaste() {
        let cs = this.canvas.graph.paste()
        cs.forEach(cell => cell.data.name += "_copy")
        this.canvas.graph.resetSelection(cs)
    }

    handleDelete() {
        this.canvas.graph.getSelectedCells().forEach(cell => cell.remove())
    }

    handleAlignLeft() {
        let left: any = undefined
        this.canvas.graph.getSelectedCells().forEach(cell => {
            if (!cell.isNode()) return
            let node = cell as Node
            let pos = node.position()
            if (left === undefined) {
                left = pos.x
            } else {
                pos.x = left
                node.setPosition(pos)
            }
        })
    }

    handleAlignCenter() {
        let center: any = undefined
        this.canvas.graph.getSelectedCells().forEach(cell => {
            if (!cell.isNode()) return
            let node = cell as Node
            let pos = node.position()
            let size = node.size()
            if (center === undefined) {
                center = pos.x + size.width * 0.5
            } else {
                pos.x = center - size.width * 0.5
                node.setPosition(pos)
            }
        })
    }

    handleAlignRight() {
        let right: any = undefined
        this.canvas.graph.getSelectedCells().forEach(cell => {
            if (!cell.isNode()) return
            let node = cell as Node
            let pos = node.position()
            let size = node.size()
            if (right === undefined) {
                right = pos.x + size.width
            } else {
                pos.x = right - size.width
                node.setPosition(pos)
            }
        })
    }

    handleValignTop() {
        let top: any = undefined
        this.canvas.graph.getSelectedCells().forEach(cell => {
            if (!cell.isNode()) return
            let node = cell as Node
            let pos = node.position()
            if (top === undefined) {
                top = pos.y
            } else {
                pos.y = top
                node.setPosition(pos)
            }
        })
    }

    handleValignMiddle() {
        let middle: any = undefined
        this.canvas.graph.getSelectedCells().forEach(cell => {
            if (!cell.isNode()) return
            let node = cell as Node
            let pos = node.position()
            let size = node.size()
            if (middle === undefined) {
                middle = pos.y + size.height * 0.5
            } else {
                pos.y = middle - size.height * 0.5
                node.setPosition(pos)
            }
        })
    }

    handleValignBottom() {
        let bottom: any = undefined
        this.canvas.graph.getSelectedCells().forEach(cell => {
            if (!cell.isNode()) return
            let node = cell as Node
            let pos = node.position()
            let size = node.size()
            if (bottom === undefined) {
                bottom = pos.y + size.height
            } else {
                pos.y = bottom - size.height
                node.setPosition(pos)
            }
        })
    }

    handleMoveTop() {
        this.canvas.graph.getSelectedCells().forEach((cell) => {
            cell.toFront();
        })
    }

    handleMoveUp() {
        const cell = this.canvas.graph.getSelectedCells()[0];
        cell.setZIndex(Number(cell.getZIndex() || 0) + 1);
    }

    handleMoveDown() {
        const cell = this.canvas.graph.getSelectedCells()[0];
        cell.setZIndex(Number(cell.getZIndex() || 0) - 1);
    }

    handleMoveBottom() {
        this.canvas.graph.getSelectedCells().forEach((cell) => {
            cell.toBack();
        })
    }

    handleGroup() {
        let boxes = this.canvas.graph.getSelectedCells().map(n => n.getBBox())
        //let zIndex = this.canvas.graph.getSelectedCells().reduce((p,n) => p.zIndex < n.zIndex ? p.zIndex : n.zIndex)
        let meta = {
            x: boxes.reduce((p, n) => p.x < n.x ? p : n).x - 10,
            y: boxes.reduce((p, n) => p.y < n.y ? p : n).y - 10,
            right: boxes.reduce((p, n) => p.right > n.right ? p : n).right + 10,
            bottom: boxes.reduce((p, n) => p.bottom > n.bottom ? p : n).bottom + 10,
        }
        console.log("group", meta)

        //this.cs.Get("group")
        let parent = this.canvas.graph.addNode({
            shape: "group",
            x: meta.x,
            y: meta.y,
            width: meta.right - meta.x,
            height: meta.bottom - meta.y,
        })
        //parent.setVisible(false)

        //this.canvas.graph.getSelectedCells().forEach(cell => cell.setParent(parent))
        this.canvas.graph.getSelectedCells().forEach(cell => {
            //if (cell.shape == "group" || cell.getChildCount() > 0)
            // @ts-ignore
            cell.setZIndex(parent.zIndex + cell.zIndex)
            parent.addChild(cell)
        })
    }

    handleUngroup() {
        this.canvas.graph.getSelectedCells().forEach(cell => {
            //if (cell.hasParent()) return;
            if (cell.shape == "group") {
                cell.getChildren()?.forEach(c => {
                    c.setParent(null)
                    //cell.removeChild(c)
                    //cell.eachChild()
                })
                cell.setChildren(null);
                cell.remove() //TODO 会误删除
            }
        })
    }

    isGroup(): boolean {
        if (this.canvas.graph.getSelectedCellCount() !== 1) return false;
        let current = this.canvas.graph.getSelectedCells()[0];
        //if (!current) return false;
        return current.getChildCount() > 0;
    }

    handleGrid() {
        if (this.showGrid) this.canvas.graph.hideGrid()
        else this.canvas.graph.showGrid()
        this.showGrid = !this.showGrid
        localStorage.setItem("nuwa-editor-grid", JSON.stringify(this.showGrid));
    }

    handleScale($event: number) {
        this.scaleChange.emit($event)
        this.canvas.graph.zoomTo($event, {center: {x: 0, y: 0}})
    }

    about() {
        this.ms.create({
            nzTitle: '关于',
            nzContent: AboutComponent,
            nzFooter: null,
        })
    }

    handleImport() {
        //this.canvas.graph.toJSON()
        //this.canvas.graph.fromJSON()
        this.file?.nativeElement.click()
    }

    drawLine() {
        this.canvas?.drawEdge(BaseLine)
    }

    drawFlow() {
        this.canvas?.drawEdge(MiscFlow)
    }

    preview() {
        this.canvas.page.content = this.canvas.graph.toJSON()

        //复制项目，避免脚本被编译
        let project = cloneDeep(this.project)
        let index = project.pages.findIndex(p => p.name == this.canvas.page.name)
        let page = project.pages[index]

        let ref = this.ds.create({
            nzTitle: '预览' + page.name,
            nzPlacement: 'top',
            nzContent: RenderComponent,
            nzWidth: '100%',
            nzHeight: '100%',
        })
        ref.afterOpen.subscribe(() => {
            console.log("preview", page)
            ref.getContentComponentRef()?.setInput("project", project)
            ref.getContentComponentRef()?.setInput("page", page)
        })

    }

    onJsonUpload($event: Event) {
        console.log("upload", $event, this.file.nativeElement.files)
        //@ts-ignore
        const file = $event.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            console.log("reader", reader.result)
            try {
                this.editor.project = JSON.parse(reader.result as string)
            } catch (err) {

            }

        }
        reader.readAsText(file, "utf-8")
    }
}
