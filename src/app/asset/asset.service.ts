import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Asset } from './asset';

@Injectable({
  providedIn: 'root'
})

export class AssetService {
  private assetsUrl = '/api/v1/assets/assets';
  private endpoint: string = "/api/v1/assets";
  private endpointAlternate: string = "http://localhost:8000/api";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private hackToCountNewAssets = 900;

  constructor(private http: HttpClient) { }

  getAssets() {
    return this.http.get(`${this.endpoint}`)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAsset(id: number): Observable<any> {
    let API_URL = `${this.endpoint}/read-asset/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  createAsset(asset: Asset): Observable<Asset> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.hackToCountNewAssets += 1;
    asset.id = this.hackToCountNewAssets;  //fix this
    return this.http.put<Asset>(this.assetsUrl, asset, { headers })
      .pipe(
        tap(() => console.log('created new asset.id: ' + asset.id)),
        map(() => asset),
        catchError(this.handleError)
      );
  }

  updateAsset(asset: Asset): Observable<Asset> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.assetsUrl}/${asset.id}`;
    return this.http.put<Asset>(url, asset, { headers })
      .pipe(
        tap(() => console.log('update existing asset.id: ' + asset.id)),
        map(() => asset),
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
      _id: '0',
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


  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
