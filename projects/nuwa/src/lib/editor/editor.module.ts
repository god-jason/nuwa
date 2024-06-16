import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorComponent} from "./editor.component";
import {AboutComponent} from "./about/about.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AnimationsComponent} from "./animations/animations.component";
import {CanvasComponent} from "./canvas/canvas.component";
import {ComponentsComponent} from "./components/components.component";
import {ElementsComponent} from "./elements/elements.component";
import {GalleriesComponent} from "./galleries/galleries.component";
import {ListenersComponent} from "./listeners/listeners.component";
import {PageSettingComponent} from "./page-setting/page-setting.component";
import {PagesComponent} from "./pages/pages.component";
import {PropertiesSettingComponent} from "./properties-setting/properties-setting.component";
import {CellSettingComponent} from "./cell-setting/cell-setting.component";
import {ScriptsComponent} from "./scripts/scripts.component";
import {SideBarComponent, SideBarItemDirective} from "./side-bar/side-bar.component";
import {SourcesComponent} from "./sources/sources.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {TransformSettingComponent} from "./transform-setting/transform-setting.component";
import {WidgetsComponent} from "./widgets/widgets.component";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzNotificationModule} from "ng-zorro-antd/notification";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {
    AlignCenterOutline,
    AlignLeftOutline,
    AlignRightOutline,
    CaretRightOutline,
    CopyOutline,
    DashOutline,
    DeleteOutline,
    DownloadOutline,
    DownOutline,
    DragOutline,
    ExportOutline,
    GroupOutline,
    HolderOutline,
    MinusOutline,
    PlaySquareOutline,
    PlusOutline,
    ProfileOutline,
    RedoOutline,
    SaveOutline,
    ScissorOutline,
    SnippetsOutline,
    TableOutline,
    UndoOutline,
    UngroupOutline,
    UploadOutline,
    UpOutline,
    VerticalAlignBottomOutline,
    VerticalAlignMiddleOutline,
    VerticalAlignTopOutline,
    VerticalLeftOutline,
    VerticalRightOutline,
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
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzTableModule} from "ng-zorro-antd/table";
import {ListenerSettingComponent} from "./listener-setting/listener-setting.component";
import {ImageBordersComponent} from "./image-borders/image-borders.component";
import {SmartEditorComponent} from "@god-jason/smart";
import {VariablesComponent} from "./variables/variables.component";
import {BindingsComponent} from "./bindings/bindings.component";
import {CodemirrorModule} from "@ctrl/ngx-codemirror";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {ScriptSettingComponent} from "./script-setting/script-setting.component";


@NgModule({
    declarations: [
        AboutComponent,
        AnimationsComponent,
        CanvasComponent,
        ComponentsComponent,
        ElementsComponent,
        GalleriesComponent,
        ListenersComponent,
        ListenerSettingComponent,
        PageSettingComponent,
        PagesComponent,
        PropertiesSettingComponent,
        CellSettingComponent,
        ScriptsComponent,
        ScriptSettingComponent,
        SideBarComponent,
        SideBarItemDirective,
        SourcesComponent,
        ToolbarComponent,
        TransformSettingComponent,
        WidgetsComponent,
        EditorComponent,
        HtmlPipe,
        HtmlDirective,
        ImageBordersComponent,
        VariablesComponent,
        BindingsComponent
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
        NzDrawerModule,
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
        CodemirrorModule,

        NzIconModule.forChild([
            SaveOutline, ExportOutline, UndoOutline, RedoOutline, ScissorOutline,
            CopyOutline, SnippetsOutline, DeleteOutline, AlignLeftOutline,
            AlignCenterOutline, AlignRightOutline, VerticalAlignTopOutline,
            VerticalAlignMiddleOutline, VerticalAlignBottomOutline,
            VerticalLeftOutline, VerticalRightOutline,
            UpOutline, DownOutline, GroupOutline, UngroupOutline,
            DownloadOutline, UploadOutline, TableOutline, ProfileOutline,
            CaretRightOutline, HolderOutline,
            MinusOutline, DashOutline, PlusOutline, DragOutline, PlaySquareOutline,
        ]),

        NzEmptyModule,
        NzTableModule,
    ],
    providers: [
        //{provide: NZ_ICONS, useValue: []}
    ]
})
export class EditorModule {
}
