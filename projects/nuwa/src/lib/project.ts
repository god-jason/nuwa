export declare interface NuwaVariable {
    name: string;
    label: string;
    type: string;
    value: any;
}

export declare interface NuwaProject {
    id: string
    name: string
    description?: string
    pages: NuwaPage[]
    //variables?: NuwaVariable[];
}

export declare interface NuwaBackground {
    color: string
    image: string
    size: string | "contain" | "cover" | "100% 100%"
}

export declare interface NuwaPage {
    name: string
    content: any
    width: number
    height: number
    background?: NuwaBackground
    variables?: NuwaVariable[];
}

export function pageTemplate(name: string = "新建页面"): NuwaPage {
    return {
        name,
        content: {},
        width: window.screen.width, //自动获取屏幕尺寸
        height: window.screen.height,
        variables: []
    }
}

export function projectTemplate(name: string = '新建组态工程'): NuwaProject {
    return {
        id: '',
        name,
        pages: [
            pageTemplate("首页")
        ],
    }
}
