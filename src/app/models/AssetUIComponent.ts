export class AssetUIComponent {
    //header info, this is only in this model because I can't send more then one param to the asset service call
    MarketId:number;
    Description:string;
    AddedByUser:string;
    AssetTypeInactive:boolean;
    AssetTypeId:number;
    
    //normal members
    ElementId:number;
    ElementName:string;
    Label:string;
    ElementValue:string;
    ElementType:string;
    ElementTypeId:number;
    Width:number;
    IsSingleValue:boolean;
    IsRequired:boolean;
    SortOrder:number;
    ValueText:string;
    Editable:boolean;
    Inactive:boolean;
    //options: not set up
}