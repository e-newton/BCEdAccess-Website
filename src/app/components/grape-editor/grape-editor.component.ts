import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import 'grapesjs/dist/css/grapes.min.css';
// @ts-ignore
import grapesjs from 'grapesjs';
import 'grapesjs-blocks-bootstrap4';
import 'grapesjs-preset-webpage';
import './bootstrap-fixed-columns';
import './bootstrap-responsive-columns';
import './bootstrap-lists';
import './bootstrap-text';
import './bootstrap-collapse';
import * as csm from './customStyleManager';
import '../../../assets/canvas-styling.css';

@Component({
  selector: 'app-grape-editor',
  templateUrl: './grape-editor.component.html',
  styleUrls: ['./grape-editor.component.css',]
})
export class GrapeEditorComponent implements OnInit, AfterViewInit {
  editor;

  constructor() {
  }

  ngOnInit(): void {
    this.editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#gjs',
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Size of the editor
      height: '700px',
      width: '100%',
      // Disable the storage manager for the moment
      storageManager: false,
      // Avoid any default panel
      panels: {defaults: []},
      styleManager: {
        clearProperties: true,
      },
      plugins: ['bootstrap-collapse', 'bootstrap-responsive-columns', 'bootstrap-fixed-columns', 'gjs-preset-webpage', 'bootstrap-lists', 'bootstrap-text'],

      // plugins: ['gjs-preset-webpage', 'grapesjs-blocks-bootstrap4'],
      canvas: {
        styles: [
          'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
          'assets/canvas-styling.css'
        ],
        scripts: [
          'https://code.jquery.com/jquery-3.4.1.slim.min.js',
          'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',
          'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js'
        ],
      },

      customStyleManager: csm.default,
    });
    this.editor.BlockManager.add('link-button', {
      category: 'fuc',
      label: 'link-button',
      content: {
        draggable: true,
        droppable: true,
        components: '<a type="button" class="btn btn-primary">Learn More</a>'
      },
      render: ({model, className}) => '<button class = "btn btn-primary">Button that is a link</button>',
    });
    this.editor.BlockManager.add('f-container', {
      category: 'fuc',
      label: 'Fluid Container',
      tagName: '', // removes the containter around the random shit
      draggable: true,
      droppable: true,
      content: ''
    });
    this.editor.BlockManager.add('bs-row', {
      category: 'fuc',
      label: 'Row',
      tagName: '',
      draggable: true,
      droppable: true,
      content: '<div class = "row" data-gjs-custom-name="Row"></div>'
    });
    this.editor.BlockManager.add('bs-col', {
      category: 'fuc',
      label: 'Column-Fill',
      draggable: true,
      droppable: true,
      content: '<div class="col" data-gjs-draggable=".row">Column</div>',

    });
    this.editor.BlockManager.add('header', {
      category: 'fuc',
      label: 'HeaderComponent',
      draggable: true,
      droppable: true,
      content: '<hello-world></hello-world>',
    });

    this.editor.on('component:add', () => {
      this.printHTML();
      this.printCSS();
      this.editor.refresh();
    });
    this.editor.on('component:update', () => {
      this.printHTML();
      this.printCSS();
      this.editor.refresh();
    });

    console.log('editor', this.editor);

    this.editor.refresh();


  }

  ngAfterViewInit(): void {
    // Refresh to cause the highlight to not be messed up
    this.editor.refresh();
    this.editor.StyleManager.getSectors().reset(csm.default);
    console.log(csm.default);
    console.log('editor', this.editor);
    const styleManager = this.editor.StyleManager;
    const typographySector = styleManager.getSector('typography');
    const fontProperty = styleManager.getProperty('typography', 'font-family');
    const list = fontProperty.get('list');
    list.push({
      value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"\n' +
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
      name: 'Bootstrap Default'
    });
    fontProperty.set('list', list);
    fontProperty.set('defaults', `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"\\n' +
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`);
    styleManager.render();
    this.editor.runCommand('open-tm');
    this.editor.BlockManager.getAll().forEach(block => {
      console.log(block);
      if (block && block.attributes && block.attributes.category === 'Forms') {
        console.log(block);
        this.editor.BlockManager.remove(block.id);
      }
    });
  }

  printHTML(): void {
    // console.log(this.editor.getHtml());
    console.log(this.editor.getHtml());
  }

  printCSS(): void {
    console.log(this.editor.getCss());
  }

}