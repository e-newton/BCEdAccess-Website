import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapeEditorComponent } from './grape-editor.component';

describe('GrapeEditorComponent', () => {
  let component: GrapeEditorComponent;
  let fixture: ComponentFixture<GrapeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrapeEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrapeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
