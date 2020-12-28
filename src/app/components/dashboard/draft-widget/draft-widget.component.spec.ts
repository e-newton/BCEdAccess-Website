import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftWidgetComponent } from './draft-widget.component';

describe('DraftWidgetComponent', () => {
  let component: DraftWidgetComponent;
  let fixture: ComponentFixture<DraftWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
