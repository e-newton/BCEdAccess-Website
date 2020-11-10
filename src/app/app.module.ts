import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BlogRootComponent } from './components/blog-root/blog-root.component';
import {HttpClientModule} from '@angular/common/http';
import { BlogViewComponent } from './components/blog-view/blog-view.component';
import { BlogEditorComponent } from './components/blog-editor/blog-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

export const environment = {
  production : false,
  firebase : {
    apiKey: 'AIzaSyDk07G7MeFlY_A5AyK2e47jWQePJSbyI3o',
    authDomain: 'bcedaccess-website.firebaseapp.com',
    databaseURL: 'https://bcedaccess-website.firebaseio.com',
    projectId: 'bcedaccess-website',
    storageBucket: 'bcedaccess-website.appspot.com',
    messagingSenderId: '595114581930',
    appId: '1:595114581930:web:39f9f01d8e2f66ef27d5d3',
    measurementId: 'G-DHBS9MDXJM'
  }
};

@NgModule({
  declarations: [
    AppComponent,
    BlogRootComponent,
    BlogViewComponent,
    BlogEditorComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    CKEditorModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
