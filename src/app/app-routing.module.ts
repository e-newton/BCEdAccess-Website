import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogRootComponent} from './components/blog-root/blog-root.component';

const routes: Routes = [
  {path: 'blogs', component: BlogRootComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
