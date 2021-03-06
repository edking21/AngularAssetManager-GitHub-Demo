/* Defines the asset entity */
export interface Asset {
  _id: string;
  id: number;
  assetName: string;
  assetCode: string;
  category: string;
  tags?: string[];
  location?: string;
  imageUrl:string;
  make?: string;
  model?: string;
  description?: string;
  assetStatus?: string;
}

export interface AssetResolved {
  asset: Asset;
  error?: any;
}
