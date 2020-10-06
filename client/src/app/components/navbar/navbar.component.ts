import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {UserToken} from '../../users/models/user-token';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input() public loggedIn: boolean;
  @Output() public toggleMenu = new EventEmitter<void>();
  @Output() public logout = new EventEmitter<void>();

  public user: UserToken;
  public modalRef: BsModalRef;
  private userSubscription: Subscription;

  constructor(
    private readonly modalService: BsModalService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.loggedUser$.subscribe(
      user => this.user = user);
  }

  public triggerLogout() {
    this.router.navigate(['/posts']);
    this.logout.emit();
  }

  public loginModal() {
    this.modalRef =  this.modalService.show(LoginComponent);
  }

  public registerModal() {
    this.modalRef = this.modalService.show(RegisterComponent);
  }

  public ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
