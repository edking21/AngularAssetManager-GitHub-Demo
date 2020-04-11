import { TestBed } from '@angular/core/testing';

import { AssetResolverService } from './asset-resolver.service';

describe('AssetResolverService', () => {
  let service: AssetResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
