import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): boolean {
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser) {
      return true;
    }

    window.alert("You don't have permission to view this page");
    this.router.navigate(['/']);
    return false;
  }
}
