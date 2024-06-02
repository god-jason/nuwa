import {Cell, Edge, Node} from "@antv/x6";
import {SmartField} from "iot-master-smart";
import {TemplateRef, Type} from "@angular/core";


export declare interface NuwaBinding {
    name: string
    label: string
    type?: string
    default?: any
}

export declare interface NuwaEvent {
    name: string
    label: string
}

export declare interface NuwaParameter {
    name: string
    label: string
    value: string //表达式
}

export declare interface NuwaListener {
    event: string
    action: "page" | "link" | "set" | "show" | "hide" | "animate" | "script"// string //page link set
    delay: number
    target?: string //outlet iframe
    animation?: string //动画
    parameters?: NuwaParameter[]
}

export declare interface NuwaComponent {
    id: string

    name: string

    icon?: string
    svg?: string

    type: "line" | "shape" | "html" | "angular"

    internal?: boolean

    extends?: Node.Properties | Edge.Properties //继承 shape 或 edge

    metadata?: Node.Metadata | Edge.Metadata

    //Angular组件
    content?: TemplateRef<any> | Type<any>

    //html组件
    effects?: string[]
    html?: ((cell: Cell) => void) | string

    //是否已经注册
    registered?: boolean

    //配置属性
    properties?: SmartField[]

    //开放的数据绑定
    bindings?: NuwaBinding[]

    //数据绑定的钩子
    hooks?: { [name: string]: ((cell: Cell, value: any) => void) | string }

    //开放的事件
    events?: NuwaEvent[]

    //animations?:

    //事件响应
    listeners?: { [event: string]: ((cell: Cell, event?: any, emitter?: any) => void) | string }

    //集合名
    collection?: string
}


export declare interface NuwaCollection {
    name: string
    components: NuwaComponent[]
}

export declare interface NuwaImage {
    name?: string
    thumbnail?: string
    url: string
}

export declare interface NuwaGallery {
    name: string
    images: NuwaImage[]
}
