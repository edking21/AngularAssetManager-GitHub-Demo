import { Injectable, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpHeaders
} from "@angular/common/http";

import { BehaviorSubject, combineLatest, EMPTY, from, merge, Subject, throwError, of, Observable } from 'rxjs';
import { catchError, filter, map, mergeMap, scan, shareReplay, tap, toArray, switchMap } from 'rxjs/operators';

import { environment } from "../../environments/environment";
import { AssetInfo } from "../models/AssetInfo";
import { AssetElement } from "../models/AssetElement";
import { AssetUIComponent } from "../models/AssetUIComponent";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { dateFieldName } from "@telerik/kendo-intl";
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

  private market = new BehaviorSubject<number>(null);
  private assetElementAnnouncedSources = new Subject<any>();
  assetElementAnnounceds$ = this.assetElementAnnouncedSources.asObservable();
  announceAssetElements(assetElements: AssetElement[]) {
    // announceAssetElements(assets: AssetDetail[]) {
    this.assetElementAnnouncedSources.next(assetElements);
  }
  private assetAddAnnouncedSources = new Subject<any>();
  assetAddAnnounceds$ = this.assetAddAnnouncedSources.asObservable();
  announceAssetAdd(assetElements: AssetElement[]) {
    this.assetAddAnnouncedSources.next(assetElements);
  }
  
  getProducts(): Observable<Asset[]> {
    return this.http.get<Asset[]>('api/products')
      .pipe(
        tap(data => console.log('Products: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  
  ngOnInit() { }

  GetTheMarket() {
    return this.market.asObservable();
  }

  SetTheMarket(market) {
    this.market.next(market);

  }

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

  EditAsset(object) {
    return this.http
      .post<boolean>(environment.serverPath + "api/asset/updateasset", object)
      .pipe(catchError(this.handleError));
  }

  RemoveAsset(assets: AssetInfo) {    //assets: AssetInfo[]
    return this.http
      .post<AssetInfo[]>(environment.serverPath + "api/asset/deleteasset", assets)
      .pipe(catchError(this.handleError));
  }

  AddAsset(AssetInfo) {
    return this.http
      .post<AssetInfo>(environment.serverPath + "api/asset/addasset", AssetInfo)   //addasset
      .pipe(catchError(this.handleError));
  }

  AddAssetType(aui: AssetUIComponent[]) {
    return this.http
      .post<AssetInfo[]>(environment.serverPath + "api/asset/addassettype", aui)
      .pipe(catchError(this.handleError));
  }

  UpdateAssetType(aui: AssetUIComponent[]) {
    return this.http
      .post<AssetInfo[]>(environment.serverPath + "api/asset/updateassettype", aui)
      .pipe(catchError(this.handleError));
  }


  GetUsers(MarketId: number, IncludeInactive: boolean) {
    const params = new HttpParams()
      .set("MarketId", MarketId.toString())
      .set("IncludeInactive", IncludeInactive.toString());

    return this.http
      .get(environment.serverPath + "api/asset/getusers", { params })
      .pipe(catchError(this.handleError));
  }

  GetAssetManagers(MarketId: number, IncludeInactive: boolean) {
    const params = new HttpParams()
      .set("MarketId", MarketId.toString())
      .set("IncludeInactive", IncludeInactive.toString());

    return this.http
      .get(environment.serverPath + "api/asset/getassetusers", { params })
      .pipe(catchError(this.handleError));
  }

  CheckinAsset(assets: AssetInfo) { //assets: AssetInfo[]
    return this.http
      .post<AssetInfo[]>(environment.serverPath + "api/asset/checkinasset", assets)
      .pipe(catchError(this.handleError));
  }

  CheckoutAsset(assets: AssetInfo) {   //assets: AssetInfo[]
    return this.http
      .post<AssetInfo[]>(environment.serverPath + "api/asset/checkoutasset", assets)
      .pipe(catchError(this.handleError));
  }

  MarkAssetDefective(assets: AssetInfo) {   //assets: AssetInfo[]
    return this.http
      .post<AssetInfo[]>(environment.serverPath + "api/asset/defectiveasset", assets)
      .pipe(catchError(this.handleError));
  }

  GetFacilityList(MarketId: number) {
    const params = new HttpParams()
      .set("MarketId", MarketId.toString());

    return this.http
      .get(environment.serverPath + "api/asset/getfacilitylist", { params })
      .pipe(catchError(this.handleError));
  }

  GetElementTypesList(MarketId: number) {
    const params = new HttpParams()
      .set("MarketId", MarketId.toString());

    return this.http
      .get(environment.serverPath + "api/asset/getelementtypes", { params })
      .pipe(catchError(this.handleError));
  }

  ChangeFacility(object) {
    return this.http
      .post<boolean>(environment.serverPath + "api/asset/updatefacility", object)
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


  //these are for exporting excel
  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });

    let dt = new Date();
    let tmpDateString1 = dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1).toString() : (dt.getMonth() + 1).toString();
    let tmpDateString2 = dt.getDate() < 10 ? "0" + (dt.getDate()).toString() : dt.getDate().toString();
    let tmpDateString3 = dt.getFullYear().toString();
    let tmpDateString4 = dt.getHours() < 10 ? "0" + (dt.getHours().toString()) : dt.getHours().toString();
    let tmpDateString5 = dt.getMinutes() < 10 ? "0" + (dt.getMinutes().toString()) : dt.getMinutes().toString();
    let tmpDateString6 = dt.getSeconds() < 10 ? "0" + (dt.getSeconds().toString()) : dt.getSeconds().toString();
    let tmpDateString = tmpDateString1.concat(tmpDateString2, tmpDateString3, tmpDateString4, tmpDateString5, tmpDateString6);

    FileSaver.saveAs(data, fileName + "_" + tmpDateString + EXCEL_EXTENSION);
  }



}
