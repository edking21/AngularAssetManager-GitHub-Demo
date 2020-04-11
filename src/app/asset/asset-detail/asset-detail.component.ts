import { Component , OnInit } from '@angular/core';

import { Asset, AssetResolved } from './../asset';
import { AssetService } from './../asset.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit{
  pageTitle = 'Asset Detail';
  asset: Asset;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute 
    ) {}
    
  ngOnInit(): void {
    const resolvedData: AssetResolved = this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.onAssetRetrieved(resolvedData.asset);
  }
  
  onAssetRetrieved(asset: Asset): void {
    this.asset = asset;

    if (this.asset) {
      this.pageTitle = `Asset Detail: ${this.asset.assetName}`;
    } else {
      this.pageTitle = 'No asset found';
    }
  }
}
