import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Asset } from './asset';

export class AssetData implements InMemoryDbService {

  createDb() {
    const assets: Asset[] = [
      {
        id: 1,
        marketId: 1,
        facilityId: 1,
        tagId: 1,
        make: 'ASUS',
        model: 'Aspire 5',
        statusId: 1,
        assetStatus: 'Out'
      },
      {
        id: 2,
        marketId: 2,
        facilityId: 1,
        tagId: 1,
        make: 'ASUS',
        model: 'ZenBook',
        statusId: 1,
        assetStatus: 'In'
      },
      {
        id: 3,
        marketId: 3,
        facilityId: 1,
        tagId: 1,
        make: 'ASUS',
        model: 'Chromebook',
        statusId: 1,
        assetStatus: 'In'
      },
      {
        id: 4,
        marketId: 4,
        facilityId: 1,
        tagId: 1,
        make: 'Dell',
        model: 'Inspiron',
        statusId: 1,
        assetStatus: 'In'
      },
      {
        id: 5,
        marketId: 5,
        facilityId: 1,
        tagId: 1,
        make: 'Lenovo',
        model: 'C7',
        statusId: 1,
        assetStatus: 'Out'
      },
      {
        id: 6,
        marketId: 6,
        facilityId: 1,
        tagId: 1,
        make: 'Lenova',
        model: 'B-22-44',
        statusId: 1,
        assetStatus: 'In'
      },
      {
        id: 7,
        marketId: 7,
        facilityId: 1,
        tagId: 1,
        make: 'Rosewill',
        model: 'K54',
        statusId: 1,
        assetStatus: 'Out'
      },
      {
        id: 8,
        marketId: 8,
        facilityId: 1,
        tagId: 1,
        make: 'Samsung',
        model: 'A-22',
        statusId: 1,
        assetStatus: 'Out'
      },
    ];
    return { assets };
  }
}
