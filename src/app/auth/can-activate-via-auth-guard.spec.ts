import { CanActivateViaAuthGuard } from './can-activate-via-auth-guard';
import {fakeAsync, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../app.module';
import {AuthService} from '../services/auth.service';
import {Router, RouterModule} from '@angular/router';
import {Observable, of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../app-routing.module';

describe('CanActivateViaAuthGuard', () => {
  let router: Router;
  let auth: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot(routes),
      RouterTestingModule],
      providers: [AuthService]
    });
    router = TestBed.inject(Router);
    auth = TestBed.inject(AuthService);
  });
  it('should create an instance', () => {
      expect(new CanActivateViaAuthGuard(auth, router)).toBeTruthy();
    });
  it('should get a user and assign the field', fakeAsync(() => {
    auth.user$ = of(true);
    expect(new CanActivateViaAuthGuard(auth, router).user).toBeTruthy();
  }));

  it('should try to get a user and it rejects it', fakeAsync(() => {
    auth.user$ = of(null);
    expect(new CanActivateViaAuthGuard(auth, router).user).toEqual(null);
  }));

  it('should activate true for a user', fakeAsync(() => {
    auth.user$ = of(true);
    new CanActivateViaAuthGuard(auth, router).canActivate(null, null).subscribe(rv => {
      expect(rv).toBeTrue();
    });
  }));

  it('should activate false for no user', fakeAsync((done) => {
    auth.user$ = of(null);
    new CanActivateViaAuthGuard(auth, router).canActivate(null, null).subscribe(rv => {
      expect(rv).toBeFalsy();
    });
  }));

});
