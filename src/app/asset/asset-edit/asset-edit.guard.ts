import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AssetEditComponent } from './asset-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AssetEditGuard implements CanDeactivate<AssetEditComponent> {
  canDeactivate(
    component: AssetEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (component.isDirty) {
      const assetName = component.asset.assetName || 'New Product';
      //use backtick to display asset litteral
      return confirm(`Navigate away and lose all changes to ${assetName}?`);
    }
    return true;
  }
}
