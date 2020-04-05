import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Asset } from './../asset'
import { AssetService } from './asset.service';

@Component({
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  pageTitle = 'Asset List';
  errorMessage = '';
  categories;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAssets = this.listFilter ? this.performFilter(this.listFilter) : this.assets;
  }

  filteredAssets: Asset[] = [];
  assets: Asset[] = [];

  constructor(
    private assetService: AssetService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.assetService.getAssets().subscribe({
      next: assets => {
        this.assets = assets;
        this.filteredAssets = this.performFilter(this.listFilter);
      },
      error: err => this.errorMessage = err
    })

  }
  
  performFilter(filterBy: string): Asset[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.assets.filter((asset: Asset) =>
      asset.make.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
