import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild, Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditRightsGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('%ccanActivate EditRightsGuard', `color:blue`);

    const permitted = true;

    return (
      permitted ||
      this.router.createUrlTree(['/login', { message: 'you do not have the permission to enter' }])
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('%ccanActivateChild EditRightsGuard', `color:blue`);

    return true;
  }
}
