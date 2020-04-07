import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Asset } from './asset';

export class AssetData implements InMemoryDbService {

  createDb() {
    const assets: Asset[] = [
      {
        id: 1,
        assetName: 'Laptop',
        assetCode: "CX-235",
        location: 'St Louis',
        make: 'Lenovo',
        model: 'IdeaPad',
        description: 'Intel I7 64G 3.5GH',
        assetStatus: 'CheckedOut'
      },
      {
        id: 2,
        assetName: "Computer",
        assetCode: "CTX-999",
        location: 'St Louis',
        make: 'Dell',
        model: 'G5 Gaming',
        description: 'Intel I6 32G 3.5GH',
        assetStatus: 'CheckedOut'
      },
      {
        id: 3,
        assetName: "Monitor",
        assetCode: "A7B-123",
        location: 'St Louis',
        make: 'Acer',
        model: 'Nitro Gaming',
        description: '24 inch',
        assetStatus: 'CheckedOut'
      },
      {
        id: 4,
        assetName: "Power Supply",
        assetCode: "B7Z-634",
        location: 'St Louis',
        make: 'Corsair',
        model: 'RM550x',
        description: '500W',
        assetStatus: 'CheckedIn'
      },
      {
        id: 5,
        assetName: "Video Card",
        assetCode: "A7Z-634",
        location: 'St Louis',
        make: 'EVGA',
        model: 'GeForce CTX',
        description: 'TeraScale 2 Northern Island',
        assetStatus: 'CheckedOut'
      },
      {
        id: 6,
        assetName: "Motherboard",
        assetCode: "LLZ-344",
        location: 'St Louis',
        make: 'Gigabyte',
        model: 'Z68C-UD3H-B3',
        description: 'With Touch BIOS',
        assetStatus: 'CheckedIn'
      },
      {
        id: 7,
        assetName: "Keyboard",
        assetCode: "ALZ-344",
        location: 'St Louis',
        make: 'Logitech',
        model: 'MK120',
        description: 'Intel I7 64G 3.5GH',
        assetStatus: 'CheckedOut'
      },
      {
        id: 8,
        assetName: "Mouse",
        assetCode: "MMZ-344",
        location: 'St Louis',
        make: 'Logitech',
        model: 'G502',
        description: 'Intel I7 64G 3.5GH',
        assetStatus: 'CheckedOut'
      },
    ];
    return { assets };
  }
}
