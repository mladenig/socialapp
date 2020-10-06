import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { UserToken } from './users/models/user-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  private loggedInSubscription: Subscription;
  private userSubscription: Subscription;

  public loggedIn: boolean;
  public user: UserToken;

  constructor(
    private readonly authService: AuthService,
  ) {}

  public ngOnInit() {
    this.loggedInSubscription = this.authService.isLoggedIn$.subscribe(
      loggedIn => this.loggedIn = loggedIn,
    );
    this.userSubscription = this.authService.loggedUser$.subscribe(
      user => this.user = user,
    );
  }

  public ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  public logout() {
    this.authService.logout();
  }
}
