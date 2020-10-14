import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogRootComponent } from './components/blog-root/blog-root.component';
import { BlogPreviewComponent } from './components/blog-preview/blog-preview.component';
import {HttpClientModule} from '@angular/common/http';
import { BlogViewComponent } from './components/blog-view/blog-view.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogRootComponent,
    BlogPreviewComponent,
    BlogViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
