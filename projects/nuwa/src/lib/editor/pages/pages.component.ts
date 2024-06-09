import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {NzContextMenuService} from "ng-zorro-antd/dropdown";
import {NuwaProject, pageTemplate} from "../../project";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
    selector: 'nuwa-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
    @Input() project!: NuwaProject;

    //@Input() graph!: Graph;
    //@Input() canvas!: CanvasComponent;

    @Output() onPageChange = new EventEmitter<number>();

    index = 0

    constructor(private ms: NzMessageService, protected menuService: NzContextMenuService) {
    }

    handleDel(index: number) {
        if (this.project.pages.length == 1) {
            this.ms.error("再删就没有了")
            return
        }
        this.project.pages.splice(index, 1);
        if (this.index == index) {
            if (index >= this.project.pages.length)
                this.index = index - 1;
            this.onPageChange.emit(this.index);
        }
    }

    open(index: number) {
        this.index = index
        this.onPageChange.emit(index)
    }

    handleCopy(i: number) {
        let page = JSON.parse(JSON.stringify(this.project.pages[i]));
        page.name = page.name + ' - 复制';
        this.project.pages.push(page)
    }

    handleAdd() {
        this.project.pages.push(pageTemplate())
    }

    onDrop(event: CdkDragDrop<any, any>) {
        moveItemInArray(this.project.pages, event.previousIndex, event.currentIndex);
    }
}
