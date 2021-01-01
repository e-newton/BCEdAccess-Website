import { TestBed } from '@angular/core/testing';

import { FirebaseStorageImageCacheService } from './firebase-storage-image-cache.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../app.module';

describe('FirebaseStorageImageCacheService', () => {
  let service: FirebaseStorageImageCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase)
      ]
    });
    service = TestBed.inject(FirebaseStorageImageCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
