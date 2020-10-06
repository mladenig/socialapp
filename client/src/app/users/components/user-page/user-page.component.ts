import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { UserToken } from '../../models/user-token';
import {ActivatedRoute} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NotificatorService} from '../../../core/services/notificator.service';
import {ShowFullUserDTO} from '../../models/show-full-user.dto';

@Component({
  selector: 'app-users-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {

  public fullUser: ShowFullUserDTO;
  public modalRef: BsModalRef;
  public loggedUser: UserToken;

  private userSubscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly modalService: BsModalService,
    private readonly toastr: NotificatorService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.loggedUser$.subscribe(
      user => this.loggedUser = user,
      error => this.toastr.error('Can\`t get logged user data')
    );
    this.route.data.subscribe(
      ({ userInfo }) => this.fullUser = userInfo,
      (error) => this.toastr.error('Can\`t get user data'),
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
