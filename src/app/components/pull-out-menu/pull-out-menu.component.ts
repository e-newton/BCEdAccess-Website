import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-pull-out-menu',
  templateUrl: './pull-out-menu.component.html',
  styleUrls: ['./pull-out-menu.component.css']
})
export class PullOutMenuComponent implements OnInit {


  @ViewChild('openbutton') viewButton: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('widgets') widgets: ElementRef;
  i = 0;
  opened = false;
  constructor() { }

  ngOnInit(): void {
  }

  openMenu(): void {
    if (this.opened) {
      this.menu.nativeElement.style.width = '0';
    } else{
      this.menu.nativeElement.style.width = '250px';
    }
    this.opened = !this.opened;

    this.changeMenuButton();
  }

  changeMenuButton(): void {
    this.viewButton.nativeElement.classList.toggle('change');

  }

}
