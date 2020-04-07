import { Component , OnInit } from '@angular/core';

import { Asset } from './../asset';
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
    private assetService: AssetService,
    private route: ActivatedRoute 
    ) {}
    
  ngOnInit(): void {
    // Plus sign will cast to a number.
    // This method is prefered over getAsset (see below) which 
    // goes back to the server to get the data.
    // Note this uses an ActivatedRoute.Snapshot
    const id = +this.route.snapshot.paramMap.get('id');  
    this.getAsset(id);
  }

  getAsset(id: number) {
    this.assetService.getAsset(id).subscribe({
      next: asset => this.onAssetRetrieved(asset),
      error: err => this.errorMessage = err
    });
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
