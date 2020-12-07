import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteAuthorComponent } from './invite-author.component';

describe('InviteAuthorComponent', () => {
  let component: InviteAuthorComponent;
  let fixture: ComponentFixture<InviteAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteAuthorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
