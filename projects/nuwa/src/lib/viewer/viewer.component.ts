import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {RequestService} from "iot-master-smart";
import {ComponentService} from "../component.service";
import {ActivatedRoute} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {MqttService} from "ngx-mqtt";
import {Subscription} from "rxjs";
import {NzModalService} from "ng-zorro-antd/modal";
import {WindowComponent} from "./window/window.component";
import {NuwaPage, NuwaProject} from "../../nuwa/project";

@Component({
  selector: 'nuwa-viewer',
  standalone: true,
  imports: [],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss'
})
export class ViewerComponent implements OnDestroy {
    id: any = ''

    project!: NuwaProject
    page!: NuwaPage

    mousewheel = false
    panning = false
    full = false
    padding = 10

    index = 0;
    subs: Subscription[] = []

    constructor(
        private title: Title,
        private element: ElementRef,
        private rs: RequestService,
        protected cs: ComponentService,
        private route: ActivatedRoute,
        private ns: NzNotificationService,
        private ms: NzModalService,
        private mqtt: MqttService,
    ) {
        this.load()

        function getSwitch(name: string) {
            let val = route.snapshot.queryParams[name]
            return val == "true" || val == "1"
        }

        this.mousewheel = getSwitch("mousewheel")
        this.panning = getSwitch("panning")
        this.full = getSwitch("full")
    }



    load(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.rs.get(`api/project/${this.id}`).subscribe((res) => {
            this.project = res.data;
            this.title.setTitle(this.project.name)
            // if (this.full)
            //     this.graph.resize(window.innerWidth, window.innerHeight)
            // else
            //     this.graph.resize(this.project.width, this.project.height)
            this.page = this.project.pages[0]
        });
    }

    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe())
    }
}
