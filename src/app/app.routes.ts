import {Routes} from '@angular/router';
import {UnknownComponent} from "iot-master-smart";


export const routes: Routes = [
    {path: '', pathMatch: "full", redirectTo: "edit"},
    {path: 'edit', loadChildren: ()=>import('./editor/editor.module').then(m => m.EditorModule)},
    {path: 'view', loadChildren: ()=>import('./viewer/viewer.module').then(m => m.ViewerModule)},
];
