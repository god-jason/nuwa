import {Injectable, Injector} from '@angular/core';
import {Subject} from "rxjs";
import {Graph, Shape} from "@antv/x6";


import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {RequestService} from "iot-master-smart";
import {NuwaCollection, NuwaComponent} from "../nuwa/nuwa";
import {NuwaWidgets} from "../nuwa/widgets/widgets";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {register} from "@antv/x6-angular-shape";
import {BaseLine} from "../nuwa/widgets/base/line";
import {MiscFlow} from "../nuwa/widgets/misc/flow";

@Injectable({
    providedIn: 'root'
})
export class ComponentService {

    //TODO 处理加载中
    public ready = false
    public readySub = new Subject<boolean>()

    public Ready() {
        return this.readySub.asObservable()
    }

    public components: { [id: string]: NuwaComponent } = {}

    constructor(
        private rs: RequestService,
        private injector: Injector,
        private httpClient: HttpClient,
        private sanitizer: DomSanitizer,
        private ns: NzNotificationService,
    ) {
        this.PutCollections(NuwaWidgets)
        this.PutComponent(BaseLine)
        this.PutComponent(MiscFlow)

        //this.PutComponent(BaseGroup)
    }

    // public PutImage(component: NuwaImageComponent) {
    //     const c = createImageComponent(component)
    //     this.PutComponent(c)
    // }
    //
    // public PutPath(component: NuwaPathComponent) {
    //     const c = createPathComponent(component)
    //     this.PutComponent(c)
    // }
    //
    // public PutHtml(component: NuwaHtmlComponent) {
    //     const c = createHtmlComponent(component)
    //     this.PutComponent(c)
    // }


    public PutComponent(component: NuwaComponent) {
        this.components[component.id] = component

        //编译监听事件
        if (component.listeners) {
            for (let k in component.listeners) {
                if (!component.listeners.hasOwnProperty(k)) return
                const func = component.listeners[k]
                if (typeof func === "string") {
                    //编译
                    try {
                        // @ts-ignore
                        component.listeners[k] = new Function('cell', 'event', func)
                    } catch (e: any) {
                        this.ns.error("编译错误", e.message)
                    }
                }
            }
        }

        //HTML组件
        if (typeof component.html === "string") {
            //编译
            try {
                // @ts-ignore
                component.html = new Function('cell', func)
            } catch (e: any) {
                this.ns.error("编译错误", e.message)
            }
        }


        //数据绑定钩子
        if (component.hooks) {
            for (let k in component.hooks) {
                if (!component.hooks.hasOwnProperty(k)) return
                const func = component.hooks[k]
                if (typeof func === "string") {
                    //编译
                    try {
                        // @ts-ignore
                        component.hooks[k] = new Function('value', 'cell', func)
                    } catch (e: any) {
                        this.ns.error("编译错误", e.message)
                    }
                }
            }
        }
    }

    public PutCollections(collections: NuwaCollection[]) {
        collections.forEach(c => this.PutCollection(c))
    }

    public PutCollection(collection: NuwaCollection) {
        collection.components = collection.components || []
        collection.components.forEach(c => {
            this.PutComponent(c)
        })
    }


    public CheckRegister(component: NuwaComponent) {
        if (component.registered || component.internal)
            return
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

    public Get(id: string): NuwaComponent {
        const cmp = this.components[id]
        if (cmp) {
            if (this.CheckRegister(cmp)) {
                return cmp
            }
        }
        return cmp //rect ?
    }
}
