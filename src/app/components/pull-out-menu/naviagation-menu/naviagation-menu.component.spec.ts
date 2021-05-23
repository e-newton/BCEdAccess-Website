import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviagationMenuComponent } from './naviagation-menu.component';

describe('NaviagationMenuComponent', () => {
  let component: NaviagationMenuComponent;
  let fixture: ComponentFixture<NaviagationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaviagationMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaviagationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
