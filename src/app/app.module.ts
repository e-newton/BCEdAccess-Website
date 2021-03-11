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
import { SafeHTMLPipe } from './pipes/safe-html.pipe';
import { OembedPipe } from './pipes/oembed-pipe.pipe';
import { BlogPipePipe } from './pipes/blog-pipe.pipe';
import { LoginComponent } from './components/login/login.component';
import {JsonPipe} from '@angular/common';
import { LogoutBarComponent } from './components/logout-bar/logout-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { InviteAuthorComponent } from './components/invite-author/invite-author.component';
import { AcceptInviteComponent } from './components/accept-invite/accept-invite.component';
import { DraftWidgetComponent } from './components/dashboard/draft-widget/draft-widget.component';
import { ToDatePipe } from './pipes/to-date.pipe';
import { ConcatPipe } from './pipes/concat.pipe';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { GrapeEditorComponent } from './components/grape-editor/grape-editor.component';
import { PageBaseComponent } from './components/page-base/page-base.component';
import {RouterModule} from '@angular/router';
import { PageViewComponent } from './components/page-view/page-view.component';
import {PageTreeComponent} from './components/page-tree/page-tree.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TreeModule} from '@circlon/angular-tree-component';
import { PullOutMenuComponent } from './components/pull-out-menu/pull-out-menu.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

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
    FooterComponent,
    SafeHTMLPipe,
    OembedPipe,
    BlogPipePipe,
    LoginComponent,
    LogoutBarComponent,
    DashboardComponent,
    HomePageComponent,
    InviteAuthorComponent,
    AcceptInviteComponent,
    DraftWidgetComponent,
    ToDatePipe,
    ConcatPipe,
    BlogCardComponent,
    GrapeEditorComponent,
    PageBaseComponent,
    PageViewComponent,
    PageTreeComponent,
    PullOutMenuComponent,
    SearchBarComponent,
    SearchResultsComponent,
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
    RouterModule,
    DragDropModule,
    TreeModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
