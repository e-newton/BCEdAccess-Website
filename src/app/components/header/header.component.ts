import {Component, Injector, OnInit} from '@angular/core';
import {createCustomElement} from '@angular/elements';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(injector: Injector) {
    if (!customElements.get('hello-world')){
      customElements.define('hello-world', createCustomElement(HeaderComponent, {injector}));
      console.log('HELLO I HAVE BEEN BUILT');
    }

  }

  ngOnInit(): void {
  }

}
