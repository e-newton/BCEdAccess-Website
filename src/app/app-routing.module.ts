import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogRootComponent} from './components/blog-root/blog-root.component';
import {BlogViewComponent} from './components/blog-view/blog-view.component';
import {BlogEditorComponent} from './components/blog-editor/blog-editor.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CanActivateViaAuthGuard} from './auth/can-activate-via-auth-guard';

export const routes: Routes = [
  {path: 'blog/editor/:id', component: BlogEditorComponent},
  {path: 'blog/editor', component: BlogEditorComponent},
  {path: 'blog/:id', component: BlogViewComponent},
  {path: 'blog', component: BlogRootComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateViaAuthGuard]}



];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [CanActivateViaAuthGuard],
})
export class AppRoutingModule { }
