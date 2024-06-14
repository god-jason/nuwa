import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {NuwaCollection, NuwaWidget} from "./nuwa";
import {NuwaWidgets} from "./widgets/widgets";
import {BaseLine} from "./widgets/base/line";
import {MiscFlow} from "./widgets/misc/flow";

import {NzNotificationService} from "ng-zorro-antd/notification";
import {ImageBorder} from "./widgets/misc/image-border";
import {MiscImages} from "./widgets/misc/images";
import {SvgUse} from "./widgets/misc/svg-use";
import {SvgUseSwitch} from "./widgets/misc/svg-use-switch";
import {SvgUses} from "./widgets/misc/svg-uses";

@Injectable({
    providedIn: 'root'
})
export class WidgetService {
    public widgets: { [id: string]: NuwaWidget } = {}

    constructor(private ns: NzNotificationService) {
        this.PutCollections(NuwaWidgets)
        this.Put(BaseLine)
        this.Put(MiscFlow)
        this.Put(ImageBorder)
        this.Put(MiscImages)
        this.Put(SvgUse)
        this.Put(SvgUses)
        this.Put(SvgUseSwitch)
        //this.PutComponent(BaseGroup)
        //TODO 改为自动注册，在Check中
    }

    public Put(widget: NuwaWidget) {
        this.widgets[widget.id] = widget

        //编译监听事件
        if (widget.listeners) {
            for (let k in widget.listeners) {
                if (!widget.listeners.hasOwnProperty(k)) return
                const func = widget.listeners[k]
                if (typeof func === "string") {
                    //编译
                    try {
                        // @ts-ignore
                        widget.listeners[k] = new Function('cell', 'event', func)
                    } catch (e: any) {
                        this.ns.error("编译错误", e.message)
                    }
                }
            }
        }

        //HTML组件
        if (typeof widget.html === "string") {
            //编译
            try {
                // @ts-ignore
                widget.html = new Function('cell', func)
            } catch (e: any) {
                this.ns.error("编译错误", e.message)
            }
        }


        //数据绑定钩子
        if (widget.hooks) {
            for (let k in widget.hooks) {
                if (!widget.hooks.hasOwnProperty(k)) return
                const func = widget.hooks[k]
                if (typeof func === "string") {
                    //编译
                    try {
                        // @ts-ignore
                        widget.hooks[k] = new Function('value', 'cell', func)
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
        collection.widgets = collection.widgets || []
        collection.widgets.forEach(c => this.Put(c))
    }

    public Get(id: string): NuwaWidget {
        return this.widgets[id]
    }
}
