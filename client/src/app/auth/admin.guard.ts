import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { NotificatorService } from '../core/services/notificator.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly toastr: NotificatorService,
    private readonly router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.loggedUser$.pipe(
      map(user => {
        if (user.role !== 'Admin') {
          this.router.navigate(['posts']);
          this.toastr.error(`You are not authorized to access this page!`);
          return false;
        } else {
          return true;
        }
      })
    );

  }
}
