import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTreeComponent } from './page-tree.component';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {PageService} from '../../services/page.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../app.module';

describe('PageTreeComponent', () => {
  let component: PageTreeComponent;
  let fixture: ComponentFixture<PageTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]),
        AngularFireModule.initializeApp(environment.firebase)],
      declarations: [ PageTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTreeComponent);
    TestBed.inject(ActivatedRoute);
    TestBed.inject(PageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
