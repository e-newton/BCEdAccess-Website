import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../app.module';
import {Router, RouterModule} from '@angular/router';
import {routes} from '../app-routing.module';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let afAuth: AngularFireAuth;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase),
      RouterModule.forRoot(routes),
      RouterTestingModule],
      providers: [AuthService]
    });
    router = TestBed.inject(Router);
    afAuth = TestBed.inject(AngularFireAuth);
    afs = TestBed.inject(AngularFirestore);
    service = TestBed.inject(AuthService);

  });
  // TODO Write unit tests for this but I'm pretty sure it works
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
