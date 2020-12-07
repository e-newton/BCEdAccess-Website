import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteAuthorComponent } from './invite-author.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../app-routing.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../app.module';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

describe('InviteAuthorComponent', () => {
  let component: InviteAuthorComponent;
  let fixture: ComponentFixture<InviteAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [HttpClientTestingModule,
        RouterModule.forRoot([]),
        FormsModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        CKEditorModule],
      declarations: [ InviteAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteAuthorComponent);
    component = fixture.componentInstance;
    let router;
    router = TestBed.inject(Router);
    let route;
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
