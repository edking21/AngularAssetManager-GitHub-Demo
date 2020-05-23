import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Asset } from './asset';

@Injectable({
  providedIn: 'root'
})

export class AssetService {
  private assetsUrl = 'api/assets';

  constructor(private http: HttpClient) { }

  url : string  = "/api/v1/assets";

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.url)
      .pipe(
        // tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAssets5(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.url)
  }

    getAssets4(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.assetsUrl)
      .pipe(
        // tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  // getAssets2(): Observable<Asset[]> {
  //   return this.http.get<any>(this.api)
  //     .pipe(
  //       tap(data => console.log(JSON.stringify(data))),
  //       catchError(this.handleError)
  //     );
  // }

  getAsset(id: number): Observable<Asset> {
    if (id === 0) {
      return of(this.initializeAsset());
    }
    const url = `${this.assetsUrl}/${id}`;
    return this.http.get<Asset>(url)
      .pipe(
        // tap(data => console.log('getAsset: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createAsset(asset: Asset): Observable<Asset> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    asset.id = null;
    return this.http.post<Asset>(this.assetsUrl, asset, { headers })
      .pipe(
        tap(data => console.log('createAsset: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteAsset(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.assetsUrl}/${id}`;
    return this.http.delete<Asset>(url, { headers })
      .pipe(
        tap(data => console.log('deleteAsset: ' + id)),
        catchError(this.handleError)
      );
  }

  updateAsset(asset: Asset): Observable<Asset> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.assetsUrl}/${asset.id}`;
    return this.http.put<Asset>(url, asset, { headers })
      .pipe(
        tap(() => console.log('updateAsset: ' + asset.id)),
        // Return the asset on an update
        map(() => asset),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeAsset(): Asset {
    // Return an initialized object
    return {
      id: 0,
      assetName: null,
      assetCode: null,
      category: null,
      location: null,
      make: null,
      model: null,
      description: null,
      assetStatus: null,
      imageUrl: null
    };
  }
}
