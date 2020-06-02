import { Component, OnInit, ChangeDetectionStrategy, ɵpatchComponentDefWithScope } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Asset } from './../asset'
import { AssetService } from '../../asset/asset.service';

@Component({
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  pageTitle = 'Asset List';
  errorMessage = '';
  imageWidth = 50;
  imageMargin = 2;
  categories: any;
  showImage = false;

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAssets = this.listFilter ? this.performFilter(this.listFilter) : this.assets;
  }

  filteredAssets: Asset[] = [];
  assets: any = [];
//  assets: Asset[] = [];
  asset: Asset;

  constructor(
    private assetService: AssetService,
    private route: ActivatedRoute
  ) { 
    // console.log(this.route.snapshot.queryParamMap.get('filterBy'));
    this.asset = this.route.snapshot.data['asset'];
    this.route.data.subscribe(data => this.asset = data['asset'])
  }

  ngOnInit() {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = this.route.snapshot.queryParamMap.get('showImage') === 'true';

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
      asset.assetName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}
