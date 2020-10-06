import { NotificatorService } from '../../../core/services/notificator.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { ShowUserDTO } from '../../models/show-user.dto';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {


  public returnedArray: ShowUserDTO[];
  public users: ShowUserDTO[];
  public totalPaginationLength: number;
  public startUsers = {
    skip: 0,
    take: 18,
  };
  constructor(
    private readonly usersService: UsersService,
    private readonly toastr: NotificatorService,
  ) { }

  ngOnInit(): void {
    this.usersService.getAllUsers(this.startUsers.skip, this.startUsers.take ).subscribe(
          data => {
            this.users = data.users;
            this.returnedArray = this.users.slice(this.startUsers.skip, this.startUsers.take / 2);
            this.totalPaginationLength = data.countAllUsers;
          },
          _ => this.toastr.error('Can\`t get users')
    );
  }
  public getUsers(startItem, endItem) {
    this.usersService.getAllUsers(startItem + (this.startUsers.take / 2) , (this.startUsers.take / 2)).subscribe(
      data => this.users = this.users.concat(data.users),
      _ => this.toastr.error('Can\`t get users')
    );
  }

  public pageChanged(event: PageChangedEvent): void {
    const startItem: number = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    if (!(this.users.length >= this.totalPaginationLength)) {
      this.getUsers(startItem, endItem);
    }
    this.returnedArray = this.users.slice(startItem, endItem);
  }
}
