/* Defines the product entity */
export interface Asset {
  id: number;
  assetName: string;
  assetCode: string;
  location?: string;
  make?: string;
  model?: string;
  description?: string;
  assetStatus?: string;
}
