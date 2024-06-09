import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {NuwaCollection, NuwaComponent} from "./nuwa";
import {NuwaWidgets} from "./widgets/widgets";
import {BaseLine} from "./widgets/base/line";
import {MiscFlow} from "./widgets/misc/flow";

import {NzNotificationService} from "ng-zorro-antd/notification";
import {ImageBorder} from "./widgets/misc/image-border";

@Injectable({
    providedIn: 'root'
})
export class ComponentService {

    //TODO 处理加载中
    public ready = false
    public readySub = new Subject<boolean>()
    public components: { [id: string]: NuwaComponent } = {}

    constructor(private ns: NzNotificationService) {
        this.PutCollections(NuwaWidgets)
        this.PutComponent(BaseLine)
        this.PutComponent(MiscFlow)
        this.PutComponent(ImageBorder)

        //this.PutComponent(BaseGroup)
    }

    public Ready() {
        return this.readySub.asObservable()
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
        collection.components.forEach(c => this.PutComponent(c))
    }

    public Get(id: string): NuwaComponent {
        return this.components[id]
    }
}
