import { UsersService } from '../../users.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShowUserDTO } from '../../models/show-user.dto';
import { NotificatorService } from '../../../core/services/notificator.service';

@Injectable({
  providedIn: 'root'
})
export class UserPageResolverService implements Resolve<ShowUserDTO> {

  public user;

  constructor(
    private readonly router: Router,
    private readonly userAccountService: UsersService,
    private readonly toastr: NotificatorService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ShowUserDTO> {
    const id: number = +route.paramMap.get('id');
    return this.userAccountService.getUserById(id).pipe(
      map(user => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/posts']);
          this.toastr.error('There was an unexpected error.');
          return;
        }
      })
    );
  }
}
