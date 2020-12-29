import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout-bar',
  templateUrl: './logout-bar.component.html',
  styleUrls: ['./logout-bar.component.css']
})
export class LogoutBarComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

}
