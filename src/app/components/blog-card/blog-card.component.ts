import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {Reference} from '@angular/fire/storage/interfaces';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {
  @Input() id: string;
  @Input() title: string;
  coverImageURL = 'assets/bcedaccess_logo.png';
  constructor(public as: AngularFireStorage, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.as.ref(`blogs/${this.id}/`).listAll().toPromise().then((images) => {
      let coverRef: Reference;
      for (const ref of images.items) {
        console.log(this.id, ref.name);
        if (ref.name.includes('cover_image.')) {
          coverRef = ref;
          break;
        }
      }
      if (!coverRef) {
        return;
      }
      console.log('Running Update');
      coverRef.getDownloadURL().then((url) => {
        this.coverImageURL = url;
        console.log('Cover Image URL', this.coverImageURL);
        this.cdRef.detectChanges();
      });
    });
  }

}
