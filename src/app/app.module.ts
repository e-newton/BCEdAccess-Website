import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogRootComponent } from './components/blog-root/blog-root.component';
import {HttpClientModule} from '@angular/common/http';
import { BlogViewComponent } from './components/blog-view/blog-view.component';
import { BlogEditorComponent } from './components/blog-editor/blog-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BlogRootComponent,
    BlogViewComponent,
    BlogEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
