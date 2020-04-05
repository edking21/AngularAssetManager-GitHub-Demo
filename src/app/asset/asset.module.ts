import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AssetComponent } from "./asset-main/asset.component";
import { AssetDetailComponent } from "./asset-detail/asset-detail.component";
import { AssetEditComponent } from "./asset-edit/asset-edit.component";

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'assets2', component: AssetComponent },
      { path: 'assets2/:id', component: AssetDetailComponent },
      { path: 'assets2/:id/edit', component: AssetEditComponent }

    ])
  ],
  declarations: [
        AssetComponent,
        AssetDetailComponent,
        AssetEditComponent
  ]
})
export class AssetModule { }
