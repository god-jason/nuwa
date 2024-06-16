import {Cell, Edge, Node} from "@antv/x6";
import {SmartField} from "@god-jason/smart";
import {TemplateRef, Type} from "@angular/core";


export declare interface NuwaBinding {
    name: string
    label: string
    type?: 'color' | 'text' | 'number' | 'page'
    //default?: any
}

export declare interface NuwaEvent {
    name: string
    label: string
}

export declare interface NuwaEventData {
    event: string
    data: any
    target?: any
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

    animation?: string //动画

    //元素，show hide animate
    cell?: string //元素

    //路由页面
    outlet?: string
    page?: string //参数

    //链接
    iframe?: string
    url?: string

    //参数列表：页面
    parameters?: NuwaParameter[]

    //脚本
    script?: string | Function
}

export declare interface NuwaWidget {
    id: string

    name: string

    icon?: string

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
    widgets: NuwaWidget[]
}

export declare interface NuwaImage {
    name?: string
    thumbnail?: string
    url?: string
    urls?: string[]
    switch?: boolean //开关图片的通
    use?: boolean //svg use
}

export declare interface NuwaImageGallery {
    name: string
    images: NuwaImage[]
}

export declare interface NuwaPageSize {
    name?: string
    width: number
    height: number
}

export declare interface NuwaImageBorder {
    name?: string
    thumbnail?: string
    url: string
    //边距
    top: number
    left: number
    right: number
    bottom: number
}

export declare interface NuwaImageBorderGallery {
    name: string
    borders: NuwaImageBorder[]
}
