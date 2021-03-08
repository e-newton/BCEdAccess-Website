import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PullOutMenuComponent } from './pull-out-menu.component';

describe('PullOutMenuComponent', () => {
  let component: PullOutMenuComponent;
  let fixture: ComponentFixture<PullOutMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PullOutMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PullOutMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
