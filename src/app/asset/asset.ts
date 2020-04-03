/* Defines the product entity */
export interface Asset {
  id: number;
  marketId: number;
  facilityId?: number;
  tagId?: number;
  make?: string;
  model?: string;
  statusId?: number;
  assetStatus?: string;
}
