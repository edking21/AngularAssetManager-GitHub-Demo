import { Injectable, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";

import { BehaviorSubject, combineLatest, EMPTY, from, merge, Subject, throwError, of, Observable } from 'rxjs';
import { catchError, filter, map, mergeMap, scan, shareReplay, tap, toArray, switchMap } from 'rxjs/operators';

import { environment } from "../../environments/environment";
import { AssetInfo } from "../models/AssetInfo";
import { AssetElement } from "../models/AssetElement";
import { AssetUIComponent } from "../models/AssetUIComponent";
import { AssetHistory } from "../models/AssetHistory";
import { Asset } from './asset';
import { AssetCategoryService } from '../asset-categories/asset-category.service';
import { SupplierService } from '../suppliers/supplier.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class AssetService implements OnInit {
  private assetsUrl = 'api/assets';


  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Asset[]> {
    return this.http.get<Asset[]>('api/products')
      .pipe(
        tap(data => console.log('Products: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  
  ngOnInit() { }

  // .get(environment.serverPath + environment.marketUrl, { params })
  GetMarket(createdBy: string) {
    const params = new HttpParams()
      .set("CreatedBy", createdBy.toString())
    return this.http
      .get(environment.serverPath + environment.marketUrl, { params })
      .pipe(catchError(this.handleError));
  }

  GetAssetUIComponents(marketId: number, assetTypeId: number, assetId: number) {
    const params = new HttpParams()
      .set("MarketId", marketId.toString())
      .set("AssetTypeId", assetTypeId.toString())
      .set("AssetId", assetId.toString());

    return this.http
      .get(environment.serverPath + "api/asset/assetuicomponents", { params })
      .pipe(catchError(this.handleError));
  }

  GetAssetType(marketId: number) {
    const params = new HttpParams()
      .set("MarketId", marketId.toString());

    return this.http
      .get(environment.serverPath + "api/asset/assettype", { params })
      .pipe(catchError(this.handleError));
  }

  SERVER_URL: string = "http://localhost:8080/api/";

  GetAssets(createdBy: string, marketId: number): Observable<any[]> {
    const params = new HttpParams()
      .set("CreatedBy", createdBy.toString())
      .set("MarketId", marketId.toString());

      // return this.http.get<AssetInfo[]>(environment.serverPath + environment.assetUrl, { params })
      return this.http.get<any[]>('api/assets/2', { params })
      .pipe(
        tap(data => console.log('Assets: ', JSON.stringify(data))),
        catchError(this.handleError));
  }

  GetAssetElements(marketId: number, assetTypeId: number, inactive: boolean) {

    const params = new HttpParams()
      .set('MarketId', marketId.toString())
      .set('AssetTypeId', assetTypeId.toString())
      .set('IncludeInactive', inactive.toString());

    return this.http
      .get(environment.serverPath + "api/asset/getassetelements", { params })
      .pipe(catchError(this.handleError));
  }

  GetAssetHistory(assetId: number) {
    const params = new HttpParams()
      .set("AssetId", assetId.toString());

    return this.http
      .get<AssetHistory[]>(environment.serverPath + "api/asset/assethistory", { params })
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an ErrorObservable with a user-facing error message
    return throwError(
      "Something bad happened; please try again later."
    );
  }

  UpdateElementOption(aui: AssetUIComponent[]) {
    return this.http
      .post<AssetInfo[]>(environment.serverPath + "api/asset/updateelementoption", aui)
      .pipe(catchError(this.handleError));

  }

  AddElementOption(aui: AssetUIComponent[]) {
    return this.http
      .post<AssetInfo[]>(environment.serverPath + "api/asset/addelementoption", aui)
      .pipe(catchError(this.handleError));

  }

}
