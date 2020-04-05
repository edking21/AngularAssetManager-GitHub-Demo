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
    private route: ActivatedRoute ) {}
    
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');  //plus will cast to a number
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
