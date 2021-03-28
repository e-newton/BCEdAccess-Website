import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Reference} from '@angular/fire/storage/interfaces';
import {FirebaseStorageImageCacheService} from '../../services/firebase-storage-image-cache.service';
import {BlogService} from '../../services/blog.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  coverImageURL = 'assets/bcedaccess_logo.png';
  constructor(public as: AngularFireStorage, private cdRef: ChangeDetectorRef, private fsic: FirebaseStorageImageCacheService, private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getSingleBlog(this.id).then((blog) => {
      if (blog[0] &&  blog[0].coverImage){
        this.coverImageURL = blog[0].coverImage;
      }
      this.cdRef.detectChanges();
    });

  }

}
