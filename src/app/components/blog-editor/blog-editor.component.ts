import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {FormControl, NgForm} from '@angular/forms';
import {Blog} from '../../model/blog';
import {ActivatedRoute, Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent, CKEditorComponent} from '@ckeditor/ckeditor5-angular';
import * as CustomEditor from 'ckeditor5/build/ckeditor';
import {DomSanitizer} from '@angular/platform-browser';
import {FirebaseStorageUploadAdapter} from '../../model/firebase-storage-upload-adapter';
import {AngularFireStorage} from '@angular/fire/storage';
import {FirebaseStorageImageCacheService} from '../../services/firebase-storage-image-cache.service';


@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.css']
})
export class BlogEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  config = {

    toolbar: {
      items: [
        'heading',
        '|',
        'CKFinder',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'subscript',
        'superscript',
        'removeFormat',
        '|',
        'fontBackgroundColor',
        'fontColor',
        'fontSize',
        'fontFamily',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'alignment',
        'indent',
        'outdent',
        '|',
        'horizontalLine',
        'link',
        'imageUpload',
        'imageInsert',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'specialCharacters',
        'undo',
        'redo'
      ]
    },
    language: 'en',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:full',
        'imageStyle:side'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    }
  };
  editor = CustomEditor;
  // custom = CustomEditor;
  @ViewChild('editorComponent') editorComponent: CKEditorComponent;
  loadedBlog: Blog;
  id: any;
  title = '';
  author = '';
  body = '';
  draft = true;
  featured = false;
  views = 0;
  date = new Date();
  backendResponse = '';
  titleFC = new FormControl('');
  authorFC = new FormControl('');
  editing = false;
  images = [];
  coverImageURL = '';

  constructor(private blogService: BlogService, public activatedRouter: ActivatedRoute, public route: Router,
              public as: AngularFireStorage, public fsic: FirebaseStorageImageCacheService) {
    if (this.activatedRouter.snapshot.paramMap.get('id')) {
      this.id = (this.activatedRouter.snapshot.paramMap.get('id'));
    } else {
      this.generateID().then((n) => this.id = String(n));
    }

  }

  onEditorChange({editor}: ChangeEvent): void {
    // const data = editor.getData();
    const data = this.editorComponent.editorInstance.getData();
    console.log(data);
    this.editorComponent.data = data;

  }

  async generateID(): Promise<number> {
    let n = this.random(3, 100);
    let valid = await this.blogService.isBlogIDValid(String(n));
    while (!valid) {
      n = this.random(3, 100);
      valid = await this.blogService.isBlogIDValid(String(n));
    }
    return n;
  }

  async getImages(): Promise<void> {
    if (!this.editorComponent.editorInstance) {
      return;
    }
    const data = this.editorComponent.editorInstance.getData();
    const imageRX = /%2F.+?\..+?(?=\?)/g; // Will find an image file in the html, including a %2F string
    const imgs = data.match(imageRX);
    if (!imgs) {
      this.images = [];
      return;
    }
    for (let i = 0; i < imgs.length; i++) {
      const index = imgs[i].lastIndexOf('%2F');
      imgs[i] = imgs[i].slice(index);
      imgs[i] = decodeURI(imgs[i].replace('%2F', ''));
    }
    this.images = imgs;


  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.blogService.getSingleBlog(String(this.id)).then((rows) => {
      const blog: Blog = rows[0];
      if (this.editorComponent.editorInstance) {
        this.editorComponent.editorInstance.plugins.get('FileRepository').createUploadAdapter = (loader) => {
          const adapter = new FirebaseStorageUploadAdapter(loader);
          adapter.as = this.as;
          return adapter;
        };
      }

      if (!blog) {
        console.log(this.editorComponent);
        return;
      }
      this.title = blog.title;
      this.author = blog.author;
      this.body = blog.body;
      this.editorComponent.data = blog.body;
      this.views = blog.views;
      this.date = blog.date;
      this.featured = blog.featured;
      this.draft = blog.draft;
      this.coverImageURL = blog.coverImage;

      // This is to make unit testing work. I don't like it and neither should you.
      if (this.editorComponent.editorInstance) {
        this.editorComponent.editorInstance.setData(blog.body);

      }
      this.titleFC.setValue(this.title);
      this.authorFC.setValue(this.author);
      this.editing = true;
    });

  }


  random(low: number, high: number): number {
    return Math.floor(Math.random() * (high - low) + low);
  }

  saveAsDraft(): void {
    this.draft = true;
    this.onSubmit();
  }

  publish(): void {
    this.draft = false;
    this.onSubmit();
  }

  onSubmit(): void {
    this.title = this.titleFC.value;
    this.id = this.titleFC.value.toString().toLowerCase().trim().replaceAll(' ', '-');
    this.id = this.id.replaceAll(/[^a-z^A-Z^0-9_-]+/gi, '');
    this.author = this.authorFC.value;
    if (this.editing) {
      this.blogService.updateBlog(this.createBlog()).then((res) => {
        if (res) {
          this.backendResponse = 'Blog successfully posted!';
        } else {
          this.backendResponse = 'An error has occurred';
        }
      });
    } else {
      this.blogService.postBlog(this.createBlog()).then((res) => {
        if (res) {
          this.backendResponse = 'Blog successfully posted!';
        } else {
          this.backendResponse = 'An error has occurred';
        }
      });
    }
    if (this.draft) {
      this.route.navigate(['./dashboard']);
    } else {
      this.route.navigate(['./blog']);
    }


  }

  createBlog(): Blog {
    return new Blog(this.id, this.title, this.author, this.editorComponent.data,
      this.views, this.draft, this.date, this.featured, this.coverImageURL);
  }

  async ngOnDestroy(): Promise<void> {
    await this.getImages();
    await this.fsic.updateBlogImages(this.id, this.images);
  }

  uploadCoverImage($event: InputEvent): void {
    const files: FileList = ($event.target as HTMLInputElement & EventTarget).files;
    if (!files) {
      return;
    }
    const file: File = files[0];
    this.fsic.uploadBlogCoverImage(this.id, file).then((url) => {
      this.coverImageURL = url;
      console.log('file uploaded');
    });

  }
}
