import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Graph} from "@antv/x6";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NuwaProject, pageTemplate} from "../../project";
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {NzListComponent, NzListItemComponent} from "ng-zorro-antd/list";
import {NgClass} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
    selector: 'nuwa-pages',
    templateUrl: './pages.component.html',
    standalone: true,
    imports: [
        NzListComponent,
        CdkDropList,
        NzListItemComponent,
        NgClass,
        CdkDrag,
        NzIconDirective,
        CdkDragHandle,
        NzDropdownMenuComponent,
        NzMenuDirective,
        NzMenuItemComponent,
        NzButtonComponent
    ],
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
    @Input() project!: NuwaProject;

    @Input() graph!: Graph;


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
