import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorComponent} from "./editor.component";
import {AboutComponent} from "./about/about.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AnimationsComponent} from "./animations/animations.component";
import {BackgroundSettingComponent} from "./background-setting/background-setting.component";
import {BindingComponent} from "./binding/binding.component";
import {BindingSettingComponent} from "./binding-setting/binding-setting.component";
import {CanvasComponent} from "./canvas/canvas.component";
import {ComponentsComponent} from "./components/components.component";
import {ElementsComponent} from "./elements/elements.component";
import {GalleriesComponent} from "./galleries/galleries.component";
import {ListenersComponent} from "./listeners/listeners.component";
import {PageSettingComponent} from "./page-setting/page-setting.component";
import {PagesComponent} from "./pages/pages.component";
import {PropertiesSettingComponent} from "./properties-setting/properties-setting.component";
import {PropsComponent} from "./props/props.component";
import {ScriptsComponent} from "./scripts/scripts.component";
import {SideBarComponent, SideBarItemDirective} from "./side-bar/side-bar.component";
import {SourcesComponent} from "./sources/sources.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {TransformSettingComponent} from "./transform-setting/transform-setting.component";
import {WidgetsComponent} from "./widgets/widgets.component";
import {SmartEditorComponent} from "iot-master-smart";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NZ_ICONS, NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {
    SaveOutline,
    ExportOutline,
    UndoOutline,
    RedoOutline,
    ScissorOutline,
    CopyOutline,
    SnippetsOutline,
    DeleteOutline,
    AlignLeftOutline,
    AlignCenterOutline,
    AlignRightOutline,
    VerticalAlignTopOutline,
    VerticalAlignMiddleOutline,
    VerticalAlignBottomOutline,
    VerticalLeftOutline,
    VerticalRightOutline,
    UpOutline,
    DownOutline,
    GroupOutline,
    UngroupOutline, DownloadOutline, UploadOutline,
    TableOutline, ProfileOutline,
    CaretRightOutline,
    HolderOutline,
    MinusOutline,
    DashOutline,
} from '@ant-design/icons-angular/icons';
import {HtmlPipe} from "./html.pipe";
import {HtmlDirective} from "./html.directive";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzSelectModule} from "ng-zorro-antd/select";
import {CdkDrag, CdkDragHandle, CdkDropList} from "@angular/cdk/drag-drop";
import {NzListModule} from "ng-zorro-antd/list";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzEmptyComponent, NzEmptyModule} from "ng-zorro-antd/empty";
import {NzTableComponent, NzTableModule} from "ng-zorro-antd/table";
import {ListenerComponent} from "./listener/listener.component";
import {CanvasSettingComponent} from "./canvas-setting/canvas-setting.component";
import {NinePatchComponent} from "./nine-patch/nine-patch.component";


@NgModule({
    declarations: [
        AboutComponent,
        AnimationsComponent,
        BackgroundSettingComponent,
        BindingComponent,
        BindingSettingComponent,
        CanvasComponent,
        CanvasSettingComponent,
        ComponentsComponent,
        ElementsComponent,
        GalleriesComponent,
        ListenersComponent,
        ListenerComponent,
        PageSettingComponent,
        PagesComponent,
        PropertiesSettingComponent,
        PropsComponent,
        ScriptsComponent,
        SideBarComponent,
        SideBarItemDirective,
        SourcesComponent,
        ToolbarComponent,
        TransformSettingComponent,
        WidgetsComponent,
        EditorComponent,
        HtmlPipe,
        HtmlDirective,
        NinePatchComponent,
    ],
    exports: [
        EditorComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzButtonModule,
        NzInputModule,
        NzInputNumberModule,
        NzSelectModule,
        NzModalModule,
        NzNotificationModule,
        NzCollapseModule,
        NzDropDownModule,
        NzMenuModule,
        NzDividerModule,
        NzListModule,
        NzFormModule,
        CdkDropList,
        CdkDrag,
        CdkDragHandle,
        SmartEditorComponent,

        NzIconModule.forChild([
            SaveOutline, ExportOutline, UndoOutline, RedoOutline, ScissorOutline,
            CopyOutline, SnippetsOutline, DeleteOutline, AlignLeftOutline,
            AlignCenterOutline, AlignRightOutline, VerticalAlignTopOutline,
            VerticalAlignMiddleOutline, VerticalAlignBottomOutline,
            VerticalLeftOutline, VerticalRightOutline,
            UpOutline, DownOutline, GroupOutline, UngroupOutline,
            DownloadOutline, UploadOutline, TableOutline, ProfileOutline,
            CaretRightOutline, HolderOutline,
            MinusOutline,
            DashOutline,
        ]),

        NzEmptyModule,
        NzTableModule,
    ],
    providers:[
        //{provide: NZ_ICONS, useValue: []}
    ]
})
export class EditorModule {
}
