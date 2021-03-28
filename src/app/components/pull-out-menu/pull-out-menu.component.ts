import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PullOutStyleService} from '../../services/pull-out-style.service';

@Component({
  selector: 'app-pull-out-menu',
  templateUrl: './pull-out-menu.component.html',
  styleUrls: ['./pull-out-menu.component.css']
})
export class PullOutMenuComponent implements OnInit {


  @ViewChild('openbutton') viewButton: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('widgets') widgets: ElementRef;
  @ViewChild('helvButton') helvButton: ElementRef;
  @ViewChild('arialButton') arialButton: ElementRef;
  @ViewChild('dyslexButton') dyslexButton: ElementRef;
  i = 0;
  opened = false;
  constructor(public style: PullOutStyleService) { }

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

  changeFont(event): void{
    if (event.path[0].id === 'arialButton'){
      // this.style.changeFont('arial');
      // this.arialButton.nativeElement.className = 'btn btn-dark';
      this.dyslexButton.nativeElement.className = 'btn btn-light';
      this.helvButton.nativeElement.className = 'btn btn-light';
    } else if (event.path[0].id === 'dyslexButton'){
      this.style.changeFont('dyslex');
      // this.arialButton.nativeElement.className = 'btn btn-light';
      this.dyslexButton.nativeElement.className = 'btn btn-dark';
      this.helvButton.nativeElement.className = 'btn btn-light';
    } else{
      this.style.changeFont('helv');
      // this.arialButton.nativeElement.className = 'btn btn-light';
      this.dyslexButton.nativeElement.className = 'btn btn-light';
      this.helvButton.nativeElement.className = 'btn btn-dark';

    }
    console.log(event);
  }

}
