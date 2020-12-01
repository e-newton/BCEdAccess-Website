import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Injectable} from '@angular/core';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanActivateViaAuthGuard implements CanActivate{
  user;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(user => {
      if (user){
        this.user = user;
        console.log('guard user', user);
      } else{
        this.user = null;
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn){
          this.router.navigate(['/login']);
        }
      })

    );
  }
}
