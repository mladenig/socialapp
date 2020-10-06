import { Component, OnInit, Input } from '@angular/core';
import { ShowUserDTO } from '../../models/show-user.dto';
import {UserUpdateComponent} from '../user-update/user-update.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NotificatorService} from '../../../core/services/notificator.service';
import {AuthService} from '../../../core/services/auth.service';
import {Subscription} from 'rxjs';
import {UserToken} from '../../models/user-token';
import {UsersService} from '../../users.service';
import {filter, switchMap, tap} from 'rxjs/operators';
import {ConfirmDeleteComponent} from '../../../shared/components/confurm-delete/confirm-delete.component';
import {ShowFullUserDTO} from '../../models/show-full-user.dto';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() fullUser: ShowFullUserDTO;
  public loggedUser: UserToken;

  private userSubscription: Subscription;
  modalRef: BsModalRef;

  constructor(
    private readonly modalService: BsModalService,
    private readonly authService: AuthService,
    private readonly toastr: NotificatorService,
    private readonly usersService: UsersService
  ) {}
  public followUnfollow() {

  }
  ngOnInit() {
    console.log(this.fullUser);
    this.userSubscription = this.authService.loggedUser$.subscribe(
        user => this.loggedUser = user,
        _ => this.toastr.error('Can\`t get logged user!')
    );
  }

  public updateUserModal() {
    const modalRef = this.modalService.show(UserUpdateComponent, {
      initialState: {
        user: this.fullUser
      }
    });

    this.modalService.onHidden
      .pipe(
        switchMap(() => this.usersService.update(this.fullUser.id, modalRef.content.user))
      )
      .subscribe(
        (updatedUser) => {
          this.fullUser = { ...this.fullUser, ...updatedUser};
          this.toastr.success('User updated successfully');
        },
        _ => {
          this.toastr.error('You can\`t update user!');
        },
      );
  }

  public deleteUser() {
    this.modalRef = this.modalService.show(ConfirmDeleteComponent, {
      initialState: {
        prompt: 'Are you sure you want to delete this record?',
        callback: (result) => {
          if (result === 'yes') {
            this.usersService.deleteUser(this.loggedUser.id).subscribe(
              success => {
                this.authService.logout();
                this.toastr.success('User deleted');
                },
              _ => this.toastr.error('Can\`t delete this user!')
            );
          }
        }
      }
    });
  }
}
