import { Component, OnInit } from '@angular/core';
import {AdminUserDTO} from '../../modals/admin-show-user.dto';
import {AdminPanelService} from '../../admin-panel.service';
import {NotificatorService} from '../../../core/services/notificator.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  public allUsers: AdminUserDTO[];
  constructor(
    private readonly toastr: NotificatorService,
    private readonly adminPanelService: AdminPanelService
  ) { }

  ngOnInit() {
    this.adminPanelService.getAllUsers().subscribe(
      users => this.allUsers = users,
      _ =>  this.toastr.error('Can\`t get user'),
    );
  }

  public deleteUser(userId) {
    this.adminPanelService.deleteUser(userId).subscribe(
      _ => this.toastr.success('User deleted'),
      _ => this.toastr.error('Can\`t deleted user')
    );
  }
}
