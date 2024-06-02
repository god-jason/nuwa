import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Cell} from "@antv/x6";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ComponentService} from "../../component.service";
import {CommonModule} from "@angular/common";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {CanvasComponent} from "../canvas/canvas.component";

@Component({
    selector: 'nuwa-transform',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzInputDirective,
        NzInputNumberComponent
    ],
    templateUrl: './transform.component.html',
    styleUrl: './transform.component.scss'
})
export class TransformComponent implements OnInit, OnDestroy {
    @Input() canvas!: CanvasComponent;

    selected: Cell[] = [];

    cell?: Cell

    form!: FormGroup;


    onCellChangeSize(event: { cell: Cell, current: any }) {
        if (event.cell == this.cell) {
            this.form.patchValue(event.current as any)
        }
    }

    onCellChangePosition(event: { cell: Cell, current: any }) {
        if (event.cell == this.cell)
            this.form.patchValue(event.current as any)
    }

    onCellChangeAngle(event: { cell: Cell, current: any }) {
        //TODO 此处无效
        if (event.cell == this.cell)
            this.form.patchValue(event.current as any)
    }

    onCellSelected(event: { cell: Cell }) {
        this.cell = event.cell;

        if (this.cell.isNode()) {
            const pos = this.cell.getPosition()
            const size = this.cell.getSize()
            const angle = this.cell.getAngle()

            this.form.patchValue(pos)
            this.form.patchValue(size);
            this.form.patchValue({angle});
        } else {
            this.cell = undefined
        }
    }

    ngOnInit() {
        this.canvas.graph.on("cell:change:size", this.onCellChangeSize, this)
        this.canvas.graph.on("cell:change:position", this.onCellChangePosition, this)
        this.canvas.graph.on("cell:change:angle", this.onCellChangeAngle, this)
        this.canvas.graph.on("cell:selected", this.onCellSelected, this)

        //对于已经选择的情况，直接执行事件
        let cells = this.canvas.graph.getSelectedCells()
        if (cells.length > 0) {
            this.onCellSelected({cell: cells[cells.length - 1]})
        }
    }

    ngOnDestroy() {
        this.canvas.graph.off("cell:change:size", this.onCellChangeSize)
        this.canvas.graph.off("cell:change:position", this.onCellChangePosition)
        this.canvas.graph.off("cell:change:angle", this.onCellChangeAngle)
        this.canvas.graph.off("cell:selected", this.onCellSelected)
    }


    constructor(private fb: FormBuilder, private cs: ComponentService) {
        this.form = fb.group({
            x: [0, [Validators.required]],
            y: [0, [Validators.required]],
            width: [0, [Validators.required]],
            height: [0, [Validators.required]],
            angle: [0, [Validators.required]],
        })
    }

    onChange($event: Event) {
        //console.log("onPositionChange", this.formPosition.value)
        if (this.cell?.isNode()) {
            this.cell.setPosition(this.form.value)
            this.cell.setSize(this.form.value)
            this.cell.angle(this.form.value.angle)
        }
    }
}
