import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapeEditorComponent } from './grape-editor.component';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../app.module';
import {PageService} from '../../services/page.service';

describe('GrapeEditorComponent', () => {
  let component: GrapeEditorComponent;
  let fixture: ComponentFixture<GrapeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]),
        AngularFireModule.initializeApp(environment.firebase)],
      declarations: [ GrapeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrapeEditorComponent);
    TestBed.inject(ActivatedRoute);
    TestBed.inject(PageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
