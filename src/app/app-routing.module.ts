import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogRootComponent} from './components/blog-root/blog-root.component';
import {BlogViewComponent} from './components/blog-view/blog-view.component';
import {BlogEditorComponent} from './components/blog-editor/blog-editor.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CanActivateViaAuthGuard} from './auth/can-activate-via-auth-guard';
import {HomePageComponent} from './components/home-page/home-page.component';
import {AcceptInviteComponent} from './components/accept-invite/accept-invite.component';
import {GrapeEditorComponent} from './components/grape-editor/grape-editor.component';
import {PageBaseComponent} from './components/page-base/page-base.component';
import {PageViewComponent} from './components/page-view/page-view.component';
import {PageTreeComponent} from './components/page-tree/page-tree.component';

export const routes: Routes = [
  {path: 'blog/editor/:id', component: BlogEditorComponent, canActivate: [CanActivateViaAuthGuard]},
  {path: 'blog/editor', component: BlogEditorComponent, canActivate: [CanActivateViaAuthGuard]},
  {path: 'blog/:id', component: BlogViewComponent},
  {path: 'blog', component: BlogRootComponent},
  {path: 'login', component: LoginComponent},
  {path: 'tree', component: PageTreeComponent},
  {path: 'p', component: PageBaseComponent, children: [
      {path: '**', component: PageBaseComponent}
    ]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateViaAuthGuard]},
  {path: 'acceptinvite', component: AcceptInviteComponent},
  {path: 'grape', component: GrapeEditorComponent},
  {path: '', component: HomePageComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [CanActivateViaAuthGuard],
})
export class AppRoutingModule { }
