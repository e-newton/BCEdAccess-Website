import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutBarComponent } from './logout-bar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../app.module';
import {RouterModule} from '@angular/router';
import {routes} from '../../app-routing.module';

describe('LogoutBarComponent', () => {
  let component: LogoutBarComponent;
  let fixture: ComponentFixture<LogoutBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutBarComponent ],
      imports: [AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot(routes),
        RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
