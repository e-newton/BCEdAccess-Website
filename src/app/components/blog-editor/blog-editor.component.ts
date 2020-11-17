import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BlogService} from '../../services/blog.service';
import {FormControl, NgForm} from '@angular/forms';
import {Blog} from '../../model/blog';
import {ActivatedRoute, Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent, CKEditorComponent} from '@ckeditor/ckeditor5-angular';
import * as CustomEditor from 'ckeditor5/build/ckeditor';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.css']
})
export class BlogEditorComponent implements OnInit, AfterViewInit {

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
    }};
  editor = CustomEditor;
  // custom = CustomEditor;
  @ViewChild( 'editorComponent' ) editorComponent: CKEditorComponent;
  loadedBlog: Blog;
  id: number;
  title = '';
  author = '';
  body = '';
  backendResponse = '';
  titleFC = new FormControl('');
  authorFC = new FormControl('');
  editing = false;

  constructor(private blogService: BlogService, public activatedRouter: ActivatedRoute, public route: Router) {
    if (this.activatedRouter.snapshot.paramMap.get('id')){
      this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    } else {
      this.generateID().then((n) => this.id = n);
    }
  }

  onEditorChange( { editor }: ChangeEvent ): void {
    // const data = editor.getData();
    const data = this.editorComponent.editorInstance.getData();
    console.log( data );
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


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.blogService.getSingleBlog(String(this.id)).then((rows) => {
      const blog: Blog = rows[0];
      if (!blog) {
        return;
      }
      this.title = blog.title;
      this.author = blog.author;
      this.body = blog.body;
      this.editorComponent.data = blog.body;

      // This is to make unit testing work. I don't like it and neither should you.
      if (this.editorComponent.editorInstance){
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

  onSubmit(): void {
      this.title = this.titleFC.value;
      this.author = this.authorFC.value;
      if (this.editing){
        this.blogService.updateBlog(this.createBlog()).then((res) => {
          if (res) {
            this.backendResponse = 'Blog successfully posted!';
          } else {
            this.backendResponse = 'An error has occurred';
          }
        });
      } else{
        this.blogService.postBlog(this.createBlog()).then((res) => {
          if (res) {
            this.backendResponse = 'Blog successfully posted!';
          } else {
            this.backendResponse = 'An error has occurred';
          }
        });
      }


  }

  createBlog(): Blog {
    return new Blog(this.id, this.title, this.author, this.editorComponent.data);
  }
}
