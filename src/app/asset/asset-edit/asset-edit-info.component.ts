import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Asset } from '../asset';

@Component({
  templateUrl: './asset-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm, {static: false}) assetForm: NgForm;

  errorMessage: string;
  asset = { id: 1, assetName: 'test', assetCode: 'test' };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
}
