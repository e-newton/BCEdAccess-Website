import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchFC = new FormControl('');

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  submit($event: Event): void{
    void this.router.navigate(['search', this.searchFC.value, '10']);
  }

}
