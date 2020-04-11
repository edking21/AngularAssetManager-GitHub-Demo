import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Asset } from '../asset';

@Component({
  templateUrl: './asset-edit-info.component.html'
})
export class AssetEditInfoComponent implements OnInit {
  @ViewChild(NgForm, {static: false}) assetForm: NgForm;

  errorMessage: string;
  asset:Asset;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      this.asset = data['resolvedData'].asset;
    });
  }
}
