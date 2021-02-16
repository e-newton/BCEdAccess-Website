import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import 'grapesjs/dist/css/grapes.min.css';
// @ts-ignore
import grapesjs from 'grapesjs';
import 'grapesjs-blocks-bootstrap4';
import 'grapesjs-preset-webpage';
import 'grapesjs-preset-newsletter';
import './bootstrap-fixed-columns';
import './bootstrap-responsive-columns';
import './bootstrap-lists';
import './bootstrap-text';
import './bootstrap-collapse';
import * as csm from './customStyleManager';
import '../../../assets/canvas-styling.css';
import {ActivatedRoute} from '@angular/router';
import {PageService} from '../../services/page.service';
import {FormControl} from '@angular/forms';
import {Page} from '../../model/page';
import * as juice from 'juice';
import {PageChild} from '../../model/page-child';
import {AngularFireStorage} from '@angular/fire/storage';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-grape-editor',
  templateUrl: './grape-editor.component.html',
  styleUrls: ['./grape-editor.component.css', ]
})
export class GrapeEditorComponent implements OnInit, AfterViewInit {
  editor;
  parentID: string;
  id: string;
  initialID = '';
  page: Page;
  titleFC = new FormControl('');
  urlFC = new FormControl('');
  saving = false;

  constructor(private activeRoute: ActivatedRoute, private ps: PageService, public as: AngularFireStorage) {
  }

  ngOnInit(): void{
    // const params = await this.activeRoute.params.toPromise();
    // console.log('params', params);
    const initAssets = [];
    this.editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#gjs',
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Size of the editor
      height: '700px',
      width: '100%',
      avoidInlineStyle: true,
      // Disable the storage manager for the moment
      storageManager: false,
      // Avoid any default panel
      panels: {defaults: []},
      styleManager: {
        clearProperties: true,
      },
      assetManager: {
        assets: initAssets,

        uploadFile: async (e) => {
          const files: FileList = e.dataTransfer ? e.dataTransfer.files : e.target.files;
          for (let i = 0; i < files.length; i++) {
            const file: File = files.item(i);
            const storageRef = await this.as.ref(`pages/${uuid()}`);
            await storageRef.put(file);
            const dl = await storageRef.getDownloadURL().toPromise();
            console.log(this.editor.AssetManager);
            this.editor.AssetManager.add({
              src: dl,
              type: 'image',
              height: 100,
              width: 200,
          });
            return {data: [{
                src: dl,
                type: 'image',
                height: 100,
                width: 200,
              }]};
          }
        }
      },
      plugins: ['bootstrap-collapse', 'bootstrap-responsive-columns', 'bootstrap-fixed-columns', 'gjs-preset-webpage',
                'bootstrap-lists', 'bootstrap-text'],

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
    this.as.ref(`pages/`).listAll().forEach(async (l) => {
      for (const f of l.items) {
        const dl = await f.getDownloadURL();
        this.editor.AssetManager.add({
          src: dl,
          type: 'image',
          height: 100,
          width: 200,
        });
      }
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
      this.editor.refresh();
    });
    this.editor.on('component:update', () => {
      this.printHTML();
      this.editor.refresh();
    });
    this.editor.on('asset:upload:end', () => {
    console.log('upload')
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
      if (block && block.attributes && block.attributes.category === 'Forms') {
        this.editor.BlockManager.remove(block.id);
      }
    });
    this.parentID = this.activeRoute.snapshot.queryParams.parent;
    this.id = this.activeRoute.snapshot.queryParams.id;
    // If we are already on a page, load that HTML.
    if (this.id) {
      this.ps.getPage(this.id).then((page) => {
        this.page = page;
        this.editor.setComponents(page.body);
        this.titleFC.setValue(page.title);
        this.initialID = page.id;
        console.log('initial id', this.page);
        this.urlFC.setValue(this.initialID.replace(this.page.parent, '').replace('\\', ''));
        this.editor.store();
      });
    }

  }

  async save(): Promise<void> {
    this.saving = true;
    this.page = await this.createPage();
    if (this.parentID) {
      const newID = this.parentID + '\\' + this.urlFC.value;
      const page = new Page(this.parentID, this.titleFC.value, this.getHTML(), true, newID, true);
      await this.ps.savePage(page);
      const parent = await this.ps.getPage(this.parentID);
      parent.addChild(new PageChild(newID, this.titleFC.value));
      await this.ps.savePage(parent);
    } else if (this.initialID !== this.page.parent + '\\' + this.urlFC.value) {
      if (!this.parentID) {
        this.page.body = this.getHTML();
        await this.ps.savePage(this.page);
      } else{
        console.log('init', this.initialID, this.urlFC.value, this.page);
        const newID = this.page.parent + '\\' + this.urlFC.value;
        this.page.body = this.getHTML();
        this.page.title = this.titleFC.value;
        await this.ps.savePage(this.page);
        await this.ps.changeID(this.initialID, newID);
      }
    }
    this.saving = false;
  }

  async createPage(): Promise<Page> {
    if (this.page) {
      this.page.id = this.id;
      this.page.title = this.titleFC.value;
      this.page.body = this.getHTML();
      return this.page;
    }
    else {
      return new Page(this.parentID, this.titleFC.value, this.getHTML(), true, this.urlFC.value, true);
    }
  }

  printHTML(): void {
    console.log(this.editor.getHtml());
  }

  getHTML(): string {
    return  `<style>${this.editor.getCss()}</style>` + this.editor.getHtml();
  }


  titleUpdate(): void {
    let value = this.titleFC.value.toString().toLowerCase().trim().replaceAll(' ', '-');
    value = value.replaceAll(/[^a-z^A-Z^0-9_-]+/gi, '');
    this.urlFC.setValue(value);
  }

}
