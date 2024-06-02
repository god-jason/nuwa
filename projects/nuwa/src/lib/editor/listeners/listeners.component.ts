import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NuwaListener} from "../../nuwa";
import {CanvasComponent} from "../canvas/canvas.component";
import {Cell} from "@antv/x6";

@Component({
  selector: 'nuwa-listeners',
  templateUrl: './listeners.component.html',
  styleUrl: './listeners.component.scss'
})
export class ListenersComponent implements OnInit, OnDestroy{

    @Input() canvas!: CanvasComponent;

    cell?: any //Cell;


    onCellSelected(event: { cell: Cell }) {
        this.cell = event.cell
    }

    ngOnInit() {
        this.canvas.graph.on("cell:selected", this.onCellSelected, this)

        //对于已经选择的情况，直接执行事件
        let cells = this.canvas.graph.getSelectedCells()
        if (cells.length > 0) {
            this.onCellSelected({cell: cells[cells.length - 1]})
        }
    }

    ngOnDestroy(): void {
        this.canvas.graph.off("cell:selected", this.onCellSelected);
    }

    add(){
        if (!this.cell) return
        if (!this.cell.data) this.cell.data = {}
        if (!this.cell.data.listeners) this.cell.data.listeners = []

        this.cell.data.listeners.push({

        });
    }

    edit(listener: NuwaListener) {

    }

}
