import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../messages/message.service';

import { Asset } from '../asset';
import { AssetService } from '../asset.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.css']
})
export class AssetEditComponent implements OnInit {
  pageTitle = 'Asset Edit';
  errorMessage: string;

  asset: Asset;

  constructor(private assetService: AssetService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) { 
              }


  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
         const id = +params.get('id');
         this.getAsset(id);

      }
    )
}

  getAsset(id: number): void {
    this.assetService.getAsset(id).subscribe({
      next: asset => this.onAssetRetrieved(asset),
      error: err => this.errorMessage = err
    });
  }

  onAssetRetrieved(asset: Asset): void {
    this.asset = asset;

    if (!this.asset) {
      this.pageTitle = 'No asset found';
    } else {
      if (this.asset.id === 0) {
        this.pageTitle = 'Add Asset';
      } else {
        this.pageTitle = `Edit Asset: ${this.asset.assetName}`;
      }
    }
  }

  deleteAsset(): void {
    if (this.asset.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.asset.assetName} was deleted`);
    } else {
      if (confirm(`Really delete the asset: ${this.asset.assetName}?`)) {
        this.assetService.deleteAsset(this.asset.id).subscribe({
          next: () => this.onSaveComplete(`${this.asset.assetName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  saveAsset(): void {
    if (true === true) {
      if (this.asset.id === 0) {
        this.assetService.createAsset(this.asset).subscribe({
          next: () => this.onSaveComplete(`The new ${this.asset.assetName} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.assetService.updateAsset(this.asset).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.asset.assetName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    // Navigate back to the asset list
    this.router.navigate(['/assets2']);
  }
}
