import { TestBed } from '@angular/core/testing';

import { FirebaseStorageImageCacheService } from './firebase-storage-image-cache.service';

describe('FirebaseStorageImageCacheService', () => {
  let service: FirebaseStorageImageCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseStorageImageCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
