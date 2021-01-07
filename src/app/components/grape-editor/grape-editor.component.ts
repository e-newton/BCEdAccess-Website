import { Component, OnInit } from '@angular/core';
import 'grapesjs/dist/css/grapes.min.css';
// @ts-ignore
import grapesjs from 'grapesjs';
import 'grapesjs-blocks-bootstrap4';
import 'grapesjs-preset-webpage';

@Component({
  selector: 'app-grape-editor',
  templateUrl: './grape-editor.component.html',
  styleUrls: ['./grape-editor.component.css']
})
export class GrapeEditorComponent implements OnInit {
  editor;
  constructor() { }

  ngOnInit(): void {
    this.editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#gjs',
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Size of the editor
      height: '80vh',
      width: '100%',
      // Disable the storage manager for the moment
      storageManager: false,
      // Avoid any default panel
      panels: { defaults: [] },
      styleManager: {
        clearProperties: true,
      },
      plugins: ['gjs-preset-webpage', 'grapesjs-blocks-bootstrap4'],
      canvas: {
        styles: [
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
        ],
        scripts: [
          'https://code.jquery.com/jquery-3.3.1.slim.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
          'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'
        ],
      }
    });
  }

}
