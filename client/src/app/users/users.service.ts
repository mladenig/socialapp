import { Injectable } from '@angular/core';
import { UserRegisterDTO } from './models/user-register.dto';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import { UserToken } from './models/user-token';
import { CONFIGS } from '../configs/configs';
import { HttpClient } from '@angular/common/http';
import { ShowUserDTO } from './models/show-user.dto';
import {ShowUserByPageDTO} from './models/show-user-by-page.dto';
import {ShowFullUserDTO} from './models/show-full-user.dto';
import {tap} from 'rxjs/operators';
import {StorageService} from '../core/services/storage.service';
import {NotificatorService} from '../core/services/notificator.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // public updateUsers$: Subject<BehaviorSubject<any>> = new BehaviorSubject(); // used to reload list of posts in all-posts component.

  private readonly updatedUserSubject$ = new BehaviorSubject<ShowUserDTO>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
    private readonly toastr: NotificatorService,
  ) {}

  public get updatedFullUser$(): Observable<ShowUserDTO> {
    return this.updatedUserSubject$.asObservable();
  }

  public register(user: UserRegisterDTO): Observable<UserToken> {
    return this.http.post<UserToken>(
      `${CONFIGS.API_DOMAIN_NAME}/api/users`,
      user
    );
  }

  public update(id: number, user: UserRegisterDTO): Observable<ShowUserDTO> {
    return this.http
      .put<ShowUserDTO>(`${CONFIGS.API_DOMAIN_NAME}/api/users/${id}`, user)
      .pipe(
        tap(( updatedUser ) => {
          try {
            this.updatedUserSubject$.next(updatedUser);
          } catch (error) {
            this.toastr.error('You Can\`t login');
          }
        })
      );
  }

  public getAllUsers(skip, take): Observable<ShowUserByPageDTO> {
    return this.http.get<ShowUserByPageDTO>(
      `${CONFIGS.API_DOMAIN_NAME}/api/users/?skip=${skip}&take=${take}`
    );
  }

  public getUserById(id: number): Observable<ShowFullUserDTO> {
    return this.http.get<ShowFullUserDTO>(
      `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}`
    );
  }

  public deleteUser(id: number): Observable<ShowFullUserDTO> {
    return this.http.delete<ShowFullUserDTO>(
      `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}`
    );
  }

  // For Big data
  public getUserFollowers(id: number): Observable<ShowUserDTO[]> {
    return this.http.get<ShowUserDTO[]>(
      `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}/followers`
    );
  }

  // For Big data
  public getUserFollowing(id: number): Observable<ShowUserDTO[]> {
    return this.http.get<ShowUserDTO[]>(
      `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}/following`
    );
  }

  public followUnfollowUser(id: number, status: {followUnfollow: boolean}): Observable<any> {
    return this.http.patch<ShowFullUserDTO>(`${CONFIGS.API_DOMAIN_NAME}/api/users/${id}`, status);
  }

  public getUsersPositions(): Observable<any> {
    return this.http.get<any>(
      `${CONFIGS.API_DOMAIN_NAME}/api/positions`
    );
  }
}
