
import { AssetElement } from './AssetElement'
export class AssetInfo {
   AssetId:number; 
   MarketId:number;
   FacilityId:number;
   TagId:string;
   TypeId:number;
   Make:string;
   Model:string;
   StatusId:number;
   AssetStatus:string;
   StatusDTM:Date;
   Comments:string;   //was ActivityComments
   CreatedBy:string;
   CreatedDTM:Date;
   UpdatedBy:string;
   UpdatedDTM:Date;
   ScanId:string;
   CheckedOutTo:string;
   AssetElements:AssetElement[];

   constructor(AssetId?:number,   MarketId?:number,    FacilityId?:number,    TagId?:string,    TypeId?:number,    Make?:string,    Model?:string,    
        StatusId?:number,      AssetStatus?:string,    StatusDTM?:Date,    Comments?:string,    CreatedBy?:string,    CreatedDTM?:Date,    UpdatedBy?:string,    UpdatedDTM?:Date,
        ScanId?:string, CheckedOutTo?:string,   AssetElements?:AssetElement[]){
      this.AssetId = AssetId;
      this.MarketId = MarketId;
      this.FacilityId = FacilityId;
      this.TagId = TagId;
      //this.Description = Description;
      this.TypeId = TypeId;
      this.Make = Make;
      this.Model = Model;
      this.StatusId = StatusId;
      this.AssetStatus = AssetStatus;
      this.StatusDTM = StatusDTM
      this.Comments = Comments;   //was ActivityComments
      this.CreatedBy = CreatedBy;
      this.CreatedDTM = CreatedDTM;
      this.UpdatedBy = UpdatedBy;
      this.UpdatedDTM = UpdatedDTM;
      this.ScanId = ScanId;
      this.CheckedOutTo = CheckedOutTo;
      this.AssetElements = [];
    }

}
