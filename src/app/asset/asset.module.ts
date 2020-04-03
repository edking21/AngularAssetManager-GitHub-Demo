import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AssetComponent } from "./asset-main/asset.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'assets2', component: AssetComponent }
      // { path: 'assets/:id', component: ProductDetailComponent },
      // { path: 'assets/:id/edit', component: ProductEditComponent }

    ])
  ],
  declarations: [
    AssetComponent
  ]
})
export class AssetModule { }
