import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AssetComponent } from "./asset-main/asset.component";
import { AssetDetailComponent } from "./asset-detail/asset-detail.component";
import { AssetEditComponent } from "./asset-edit/asset-edit.component";

import { SharedModule } from '../shared/shared.module';
import { AssetResolver } from './asset-main/asset-resolver.service';
import { AssetEditInfoComponent } from './asset-edit/asset-edit-info.component';
import { AssetEditTagsComponent } from './asset-edit/asset-edit-tags.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'assets2',
        children: [
          {
            path: '', component: AssetComponent
          },
          {
            path: ':id',
            component: AssetDetailComponent,
            resolve: { resolvedData: AssetResolver }
          },
          {
            path: ':id/edit',
            component: AssetEditComponent,
            resolve: { resolvedData: AssetResolver },
            children: [
              {path: '',redirectTo: 'info',pathMatch: 'full'},
              {path: 'info',component: AssetEditInfoComponent},
              {path: 'tags',component: AssetEditTagsComponent}
            ]
          },
        ]
      },
    ])
  ],
  declarations: [
    AssetComponent,
    AssetDetailComponent,
    AssetEditComponent,
    AssetEditInfoComponent,
    AssetEditTagsComponent
  ]
})
export class AssetModule { }
