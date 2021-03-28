import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  search = '';
  limit = '';
  results = [];
  loading = true;

  constructor(private router: Router, private activeRouter: ActivatedRoute) {
    this.search = activeRouter.snapshot.paramMap.get('search');
    this.limit = activeRouter.snapshot.paramMap.get('limit');
    fetch(`https://us-central1-bcedaccess-website.cloudfunctions.net/app/search/${this.search}/${this.limit}`)
      .then(res => res.json())
      .then(res => {
        console.log('res', res);
        this.results = res.results;
        this.results.forEach(r => {
          if (r.type === 'blog') {
            r.link = ['/', 'blog', r.id];
          } else{
            r.link = r.id;
            while (r.link.includes('\\')){
              r.link = r.link.replace('\\', '/');
            }
            while (r.link.startsWith('/')){
              r.link = r.link.substring(1, r.link.length);
            }
            console.log(r.link.split('/'));
            r.link = ['/'].concat(r.link.split('/'));
          }
        });
        this.loading = false;
      });
  }

  ngOnInit(): void {
  }

  getRandomImage(): string{
    const width = Math.floor(Math.random() * 900) + 256;
    const height = Math.floor(Math.random() * 900) + 256;
    return `https://via.placeholder.com/${width}x${height}.png?text=Placeholder+Image`;
  }

}
