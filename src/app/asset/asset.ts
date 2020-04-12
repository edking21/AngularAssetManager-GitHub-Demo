/* Defines the asset entity */
export interface Asset {
  id: number;
  assetName: string;
  assetCode: string;
  category: string;
  location?: string;
  imageUrl:string;
  make?: string;
  model?: string;
  tags?: string[];
  description?: string;
  assetStatus?: string;
}

export interface AssetResolved {
  asset: Asset;
  error?: any;
}
