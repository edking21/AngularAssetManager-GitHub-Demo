import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, 
  ActivatedRoute } from '@angular/router';
import { AssetResolved } from '../asset';
import { Observable, of } from 'rxjs';
import { AssetService } from '../asset.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssetResolver implements Resolve<AssetResolved> {
  constructor(
    private assetService: AssetService,
    private actRoute: ActivatedRoute
    ) { }

    // resolve(
    //   route: ActivatedRouteSnapshot
    //   ): Observable<any>|Promise<any>|any {
    //     return this.assetService.getAsset(+route.paramMap.get('_id'));
    //   }
    
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<AssetResolved> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = 'Asset is was not a number: $(id)';
      console.error(message);
      return of({ asset: null, error: message });
    }

    return this.assetService.getAsset(+id)
      .pipe(
        map(asset => ({ asset: asset })),
        catchError(error => {
          const message = `Retrieval error: ${error}`;
          console.error(message);
          return of({ asset: null, error: message });
        })
     );
  }
}
