import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, RouterStateSnapshot, Route, UrlSegment, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({providedIn: 'root'})
export class PublicGuard implements CanActivate, CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router,
   ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.ckeckAuthentication()
    .pipe(
      // tap( isAuthenticated => console.log('isAuthenticated', isAuthenticated) ),
      tap( isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/')
        }
      }),
      map( isAuthenticated => !isAuthenticated )
    )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean |Observable<boolean> {
    return this.checkAuthStatus();
  }



}
