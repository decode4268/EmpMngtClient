import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const authResponse = localStorage.getItem('token');
    if (authResponse) {
      return true; // logged in
    }
    this.router.navigate(['/login']);
    return false;
  }
}
