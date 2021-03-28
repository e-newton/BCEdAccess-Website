import { Component } from '@angular/core';
import {Style} from '@angular/cli/lib/config/schema';
import {PullOutStyleService} from './services/pull-out-style.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BCEdAccess-Website';
  constructor(public style: PullOutStyleService){

  }
}
