import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Asset } from './asset';

export class AssetData implements InMemoryDbService {

  createDb() {
    const assets: Asset[] = [
      {
        _id: '0',
        id: 1,
        assetName: 'Laptop',
        assetCode: "CX-235",
        location: 'St Louis',
        imageUrl: 'assets/images/laptop.png',
        make: 'Lenovo',
        model: 'IdeaPad',
        description: 'Intel I7 64G 3.5GH',
        assetStatus: 'CheckedOut',
        category: 'Computer',
        tags: ['computer', 'laptop', 'lenova'  ]
      },
      {
        _id: '0',
        id: 2,
        assetName: "Power Supply",
        assetCode: "CTX-999",
        location: 'St Louis',
        imageUrl: 'assets/images/powersupply.jpg',
        make: 'Dell',
        model: 'G5 Gaming',
        description: 'Intel I6 32G 3.5GH',
        assetStatus: 'CheckedOut',
        category: 'Computer',
        tags: ['computer', 'desktop', 'gaming'  ]
      },
      {
        _id: '0',
        id: 3,
        assetName: "Monitor",
        assetCode: "A7B-123",
        location: 'St Louis',
        imageUrl: 'assets/images/monitor.png',
        make: 'Acer',
        model: 'Nitro Gaming',
        description: '24 inch',
        assetStatus: 'CheckedOut',
        category: 'Monitor',
        tags: ['monitor', 'acer'  ]
      },
      {
        _id: '0',
        id: 4,
        assetName: "Camera",
        assetCode: "B7Z-634",
        location: 'St Louis',
        imageUrl: 'assets/images/camera.png',
        make: 'Webcam',
        model: 'W123',
        description: '720P',
        assetStatus: 'CheckedIn',
        category: 'ComputerParts'
      },
      {
        _id: '0',
        id: 5,
        assetName: "CPU",
        assetCode: "A7Z-634",
        category: 'ComputerParts',
        location: 'St Louis',
        imageUrl: 'assets/images/cpu.png',
        make: 'Intel',
        model: 'Xeon',
        description: '8 Core',
        assetStatus: 'CheckedOut'
      },
      {
        _id: '0',
        id: 6,
        assetName: "Headphones",
        assetCode: "LLZ-344",
        category: 'ComputerAccessory',
        location: 'St Louis',
        imageUrl: 'assets/images/headphones.jpg',
        make: 'Pngtree',
        model: 'Z68C-UD3H-B3',
        description: 'Stereo gaming',
        assetStatus: 'CheckedIn'
      },
      {
        _id: '0',
        id: 7,
        assetName: "Hard Drive",
        assetCode: "ALZ-344",
        category: 'ComputerParts',
        location: 'St Louis',
        imageUrl: 'assets/images/harddrive.png',
        make: 'Logitech',
        model: 'MK120',
        description: 'Intel I7 64G 3.5GH',
        assetStatus: 'CheckedOut'
      },
      {
        _id: '0',
        id: 8,
        assetName: "Mouse",
        assetCode: "MMZ-344",
        category: 'ComputerAccessory',
        location: 'St Louis',
        imageUrl: 'assets/images/mouse.png',
        make: 'Logitech',
        model: 'G502',
        description: 'Intel I7 64G 3.5GH',
        assetStatus: 'CheckedOut'
      },
    ];
    return { assets };
  }
}
