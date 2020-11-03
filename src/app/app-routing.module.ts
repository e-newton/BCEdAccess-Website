import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogRootComponent} from './components/blog-root/blog-root.component';
import {BlogViewComponent} from './components/blog-view/blog-view.component';
import {BlogEditorComponent} from './components/blog-editor/blog-editor.component';

export const routes: Routes = [
  {path: 'blog/editor/:id', component: BlogEditorComponent},
  {path: 'blog/editor', component: BlogEditorComponent},
  {path: 'blog/:id', component: BlogViewComponent},
  {path: 'blog', component: BlogRootComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
