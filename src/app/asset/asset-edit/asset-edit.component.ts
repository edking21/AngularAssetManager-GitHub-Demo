import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../../messages/message.service';

import { Asset, AssetResolved } from '../asset';
import { AssetService } from '../asset.service';

@Component({
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.css'],
})
export class AssetEditComponent implements OnInit {
  pageTitle = 'Asset Edit';
  errorMessage: string;

  asset: Asset;
  private dataIsValid: { [key: string]: boolean } = {};

  constructor(
    private assetService: AssetService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const resolvedData: AssetResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onAssetRetrieved(resolvedData.asset);
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
          next: () =>
            this.onSaveComplete(`${this.asset.assetName} was deleted`),
          error: (err) => (this.errorMessage = err),
        });
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (
      this.dataIsValid &&
      Object.keys(this.dataIsValid).every((d) => this.dataIsValid[d] === true)
    );
  }


  saveAsset(): void {
    if (this.isValid()) {
      if ( this.asset.id === 0) {
        this.assetService.createAsset(this.asset).subscribe({
          next: () => this.onSaveComplete(`The new ${this.asset.assetName} was saved`),
          error: (err) => (this.errorMessage = err),
        });
      } else {
        this.assetService.updateAsset(this.asset).subscribe({
          next: () => this.onSaveComplete(    `The updated ${this.asset.assetName} was saved`),
          error: (err) => (this.errorMessage = err),
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
    this.router.navigate(['/assets']);
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (
      this.asset.assetName &&
      this.asset.assetName.length >= 3 &&
      this.asset.assetCode
    ) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'tags' tab
    if (this.asset.category && this.asset.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }
}
