import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

function hexToRgb(hex): any {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain the logo image', () => {
    const img = fixture.debugElement.nativeElement.querySelector('#logo');
    expect(img.src).toContain('bcedaccess_logo.png');
  });
  it('should have the correct style', () => {
    const nav = fixture.debugElement.nativeElement.querySelector('nav');
    const rgb = hexToRgb(component.style['background-color']);
    const col = 'background-color: rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';

    expect(nav.attributes.style.value).toContain(col);
  });

});
