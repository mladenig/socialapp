import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../../../users/users.service';
import {AuthService} from '../../../core/services/auth.service';
import {Subscription} from 'rxjs';
import {NotificatorService} from '../../../core/services/notificator.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-small-follow-unfollow-user',
  templateUrl: './small-follow-unfollow-user.component.html',
  styleUrls: ['./small-follow-unfollow-user.component.scss']
})

export class SmallFollowUnfollowUserComponent implements OnInit, OnDestroy {

  @Input() userToFollowUnfollow: number;

  public isFollowed: boolean;
  private userSubscription: Subscription;
  public authUser;

  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly toastr: NotificatorService,
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.loggedFullUser$.subscribe(
      user => {
        this.authUser = user;
        if (this.authUser) {
          if (user.following.some(follower => follower.id === this.userToFollowUnfollow)) {
            this.isFollowed = true;
          }
          this.isFollowed = false;
        }
      },
      _ => this.toastr.error('Can\`t get proper state'),
    );
  }

  public followUnfollow() {
    const status = {
      followUnfollow: !this.isFollowed,
    };
    this.userService.followUnfollowUser(this.userToFollowUnfollow, status).pipe(
      switchMap(() => (
        this.userService.getUserById(this.authUser.id)
      ))
    ).subscribe(
      myProfile => {
        this.authService.updateFullUser(myProfile);
      },
      _ => this.toastr.error('Update user info fail'),
    );
  }

  public ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
