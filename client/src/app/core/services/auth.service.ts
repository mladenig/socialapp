import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { NotificatorService } from './notificator.service';
import { UserToken } from '../../users/models/user-token';
import { UserLoginDTO } from '../../users/models/user-login.dto';
import { CONFIGS } from '../../configs/configs';
import {UsersService} from '../../users/users.service';
import {ShowFullUserDTO} from '../../users/models/show-full-user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly helper = new JwtHelperService();

  private readonly isLoggedInSubject$ = new BehaviorSubject<boolean>(
    this.isUserLoggedIn()
  );
  private readonly loggedUserSubject$ = new BehaviorSubject<UserToken>(
    this.loggedUser()
  );
  private readonly loggedFullUserSubject$ = new BehaviorSubject<ShowFullUserDTO>(
    this.loggedFullUserFromStorage()
  );

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
    private readonly router: Router,
    private readonly toastr: NotificatorService,
    private readonly userService: UsersService,
  ) {}

  public get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject$.asObservable();
  }

  public get loggedUser$(): Observable<UserToken> {
    return this.loggedUserSubject$.asObservable();
  }

  public get loggedFullUser$(): Observable<ShowFullUserDTO> {
    return this.loggedFullUserSubject$.asObservable();
  }

  public login(user: UserLoginDTO): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${CONFIGS.API_DOMAIN_NAME}/api/session`, user)
      .pipe(
        tap(({ token }) => {
          try {
            const loggedUser = this.helper.decodeToken(token);
            this.storage.save('token', token);
            this.loggedFullUser(loggedUser.id);
            this.isLoggedInSubject$.next(true);
            this.loggedUserSubject$.next(loggedUser);
          } catch (error) {
            this.toastr.error('You Can\`t login');
          }
        })
      );
  }

  private isUserLoggedIn(): boolean {
    return !!this.storage.read('token');
  }

  private loggedUser(): UserToken {
    try {
      return this.helper.decodeToken(this.storage.read('token'));
    } catch (err) {
      this.isLoggedInSubject$.next(false);

      return null;
    }
  }

  private loggedFullUser(userId: number) {
    this.userService.getUserById(userId).subscribe(user => {
      const fullUser = JSON.stringify(user);
      this.storage.save('fullUser', fullUser);
      this.loggedFullUserSubject$.next(user as any);
    });
  }

  private loggedFullUserFromStorage(): ShowFullUserDTO {
    try {
      const user = this.storage.read('fullUser');
      return JSON.parse(user);
    } catch {
      this.isLoggedInSubject$.next(false);
      this.loggedUserSubject$.next(null);
    }
  }

  public logout() {
    this.storage.clear();
    this.isLoggedInSubject$.next(false);
    this.loggedUserSubject$.next(null);
    this.toastr.success('Successfully logged out!');
    this.router.navigate(['posts']);
  }

  public updateFullUser(user: ShowFullUserDTO) {
    this.loggedFullUserSubject$.next(user);
  }
}
