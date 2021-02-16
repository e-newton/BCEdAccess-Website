import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewComponent } from './page-view.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../app.module';
import {RouterModule} from '@angular/router';

describe('PageViewComponent', () => {
  let component: PageViewComponent;
  let fixture: ComponentFixture<PageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot([])],
      declarations: [ PageViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
