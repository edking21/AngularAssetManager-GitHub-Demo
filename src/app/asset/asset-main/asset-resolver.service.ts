import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AssetResolved } from '../asset';
import { AssetService } from '../asset.service';

@Injectable({
  providedIn: 'root'
})
export class AssetResolver implements Resolve<AssetResolved> {
  constructor(
    private assetService: AssetService) { }

  resolve( route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot): Observable<AssetResolved> {
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
