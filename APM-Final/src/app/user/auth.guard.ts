import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Route,
  UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('%ccanActivate AuthGuard', `color:blue`);
    return this.checkLoggedIn(state.url);
  }







  // Use the segments to build the full route
  // when using canLoad
  canLoad(route: Route, segments: UrlSegment[]): any {
    console.log('%ccanLoad AuthGuard', `color:blue`);
    return false && this.checkLoggedIn(segments.join('/'));
  }

  checkLoggedIn(url: string): boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      return true;
    }

    // Retain the attempted URL for redirection
    this.authService.redirectUrl = url;

    /** before v7.2 */
    this.router.navigate(['/login']);
    return false;
    /*              */

    /** since v7.2 */
    // return this.router.createUrlTree(['/login', { message: 'you do not have the permission to enter' }])
    /*              */
  }
}
