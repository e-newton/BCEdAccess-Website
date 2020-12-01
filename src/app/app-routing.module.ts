import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogRootComponent} from './components/blog-root/blog-root.component';
import {BlogViewComponent} from './components/blog-view/blog-view.component';
import {BlogEditorComponent} from './components/blog-editor/blog-editor.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {path: 'blog/editor/:id', component: BlogEditorComponent},
  {path: 'blog/editor', component: BlogEditorComponent},
  {path: 'blog/:id', component: BlogViewComponent},
  {path: 'blog', component: BlogRootComponent},
  {path: 'login', component: LoginComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
