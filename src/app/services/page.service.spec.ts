import { TestBed } from '@angular/core/testing';

import { PageService } from './page.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../app.module';
import {PageBaseComponent} from '../components/page-base/page-base.component';
import {FirebaseStorageImageCacheService} from './firebase-storage-image-cache.service';
import {AngularFirestore} from '@angular/fire/firestore';

describe('PageService', () => {
  let service: PageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [FirebaseStorageImageCacheService]
    });
    service = TestBed.inject(PageService);
    TestBed.inject(AngularFirestore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
