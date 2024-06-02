import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from "./editor.component";
import { CanvasComponent } from './canvas/canvas.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzDividerModule } from "ng-zorro-antd/divider";
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
} from '@ant-design/icons-angular/icons';

import { NzButtonModule } from "ng-zorro-antd/button";
import { ColorPickerModule } from "ngx-color-picker";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from "ng-zorro-antd/select";
import { CollapseComponent } from './collapse/collapse.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PagesComponent } from './pages/pages.component';
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { ComponentService } from "../component.service";
import { BindingComponent } from './binding/binding.component';
import { ListenerComponent } from './listener/listener.component';
import { AnimateComponent } from './animate/animate.component';
import { ListenerSettingComponent } from './listener-setting/listener-setting.component';
import { BindingSettingComponent } from './binding-setting/binding-setting.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { AboutComponent } from './about/about.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import {NzSliderModule} from "ng-zorro-antd/slider";
import {SideBarComponent, SideBarItemDirective} from "./side-bar/side-bar.component";
import {WidgetsComponent} from "./widgets/widgets.component";
import {ComponentsComponent} from "./components/components.component";
import {GalleriesComponent} from "./galleries/galleries.component";
import {LayersComponent} from "./layers/layers.component";
import {SourcesComponent} from "./sources/sources.component";
import {ListenersComponent} from "./listeners/listeners.component";
import {AnimationsComponent} from "./animations/animations.component";
import {PropertiesComponent} from "./properties/properties.component";
import {PageComponent} from "./page/page.component";
import {ScriptsComponent} from "./scripts/scripts.component";
import {TransformComponent} from "./transform/transform.component";
import {PropsComponent} from "./props/props.component";
import {NzListComponent, NzListItemComponent} from "ng-zorro-antd/list";
import {CdkDrag, CdkDragHandle, CdkDropList} from "@angular/cdk/drag-drop";
import {ElementsComponent} from "./elements/elements.component";
import {HtmlPipe} from "./html.pipe";
@NgModule({
    declarations: [
        EditorComponent,
        CanvasComponent,
        ToolbarComponent,
        CollapseComponent,
        PagesComponent,
        BindingComponent,
        ListenerComponent,
        AnimateComponent,
        ListenerSettingComponent,
        BindingSettingComponent,
        AboutComponent,
        SideBarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EditorRoutingModule,
        NzIconModule.forChild([
            SaveOutline, ExportOutline, UndoOutline, RedoOutline, ScissorOutline,
            CopyOutline, SnippetsOutline, DeleteOutline, AlignLeftOutline,
            AlignCenterOutline, AlignRightOutline, VerticalAlignTopOutline,
            VerticalAlignMiddleOutline, VerticalAlignBottomOutline,
            VerticalLeftOutline, VerticalRightOutline,
            UpOutline, DownOutline, GroupOutline, UngroupOutline,
            DownloadOutline, UploadOutline, TableOutline, ProfileOutline,
            CaretRightOutline, HolderOutline,
        ]),
        NzDividerModule,
        NzButtonModule,
        ColorPickerModule,
        NzFormModule,
        NzInputModule,
        NzModalModule,
        NzLayoutModule,
        NzSpaceModule,
        NzTabsModule,
        NzCheckboxModule,
        NzSelectModule,
        NzInputNumberModule,
        CodemirrorModule,
        NzTagModule,
        NzSwitchModule,
        NzDropDownModule,
        NzRadioModule,
        NzStepsModule,
        NzTableModule,
        NzSpinModule,
        NzSliderModule,
        WidgetsComponent,
        ComponentsComponent,
        GalleriesComponent,
        LayersComponent,
        SourcesComponent,
        ListenersComponent,
        AnimationsComponent,
        PropertiesComponent,
        PageComponent,
        ScriptsComponent,
        SideBarItemDirective,
        TransformComponent,
        PropsComponent,
        NzListComponent,
        NzListItemComponent,
        CdkDragHandle,
        CdkDropList,
        CdkDrag,
        ElementsComponent,
    ],
    providers: [
        { provide: NzMessageService, },
        ComponentService,
    ]
})
export class EditorModule {
}
