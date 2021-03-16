import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {BlogService} from '../../services/blog.service';
import {DomSanitizer} from '@angular/platform-browser';
import {SeoService, Tags} from '../../services/seo.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  id: string;
  title: string;
  author: string;
  html: string;

  constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router,
              private seo: SeoService) {
    this.route.params.subscribe(async (params) => {
      if (await blogService.isBlogIDValid(params.id)) {
        console.log('invalid blog');
        await this.router.navigate(['../'], {relativeTo: this.route});
      } else {
        this.id = params.id;
        this.blogService.getSingleBlog(String(this.id), true).then((res) => {
          console.log('res', res);
          if (res.length > 0) {
            this.html = res[0].body;
            this.title = res[0].title;
            this.author = res[0].author;
            const tags: Tags = {
              title: this.title,
              image: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/cat_relaxing_on_patio_other/1800x1200_cat_relaxing_on_patio_other.jpg',
              slug: `blog/${this.id}`
            };
            this.seo.generateTags(tags);
          } else {
            this.router.navigate(['../'], {relativeTo: this.route});
          }
        });
      }

    });


  }

  ngOnInit(): void {
    console.log('id', this.id);
  }


}
