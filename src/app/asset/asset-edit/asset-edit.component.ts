import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../messages/message.service';

import { Asset, AssetResolved } from '../asset';
import { AssetService } from '../asset.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.css']
})
export class AssetEditComponent implements OnInit {
  pageTitle = 'Asset Edit';
  errorMessage: string;

  get isDirty(): boolean {
    // this will fail if the two objects are not in the same order
    return JSON.stringify(this.originalAsset) !== JSON.stringify(this.currentAsset);
  }

  private dataIsValid: { [key: string]: boolean } = {};

  private currentAsset: Asset;
  private originalAsset: Asset;

  get asset(): Asset {
    return this.currentAsset;
  }

  set asset(value: Asset) {
    this.currentAsset = value;
    //clone the object to retain a copy - using the spread operator
    this.originalAsset = {...value};
  }

  constructor(private assetService: AssetService,
    private messageService: MessageService,
    private actRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.actRoute.data.subscribe(data => {
      const resolvedData: AssetResolved = data['resolvedData'];
      this.errorMessage = resolvedData.error;
      this.onAssetRetrieved(resolvedData.asset);
    })
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

  reset(): void {
    this.dataIsValid = null;
    this.currentAsset = null;
    this.originalAsset = null;
  }

  saveAsset(): void {
    if (this.isValid()) {
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
    this.reset();
    // Navigate back to the asset list
    this.router.navigate(['/assets']);
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true)
    );
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (this.asset.assetName &&
      this.asset.assetName.length >= 3 &&
      this.asset.assetCode) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'tags' tab
    if (this.asset.category &&
      this.asset.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }
}
