import { Component, OnInit, Input } from '@angular/core';
import { UserToken } from '../../models/user-token';
import { ShowUserDTO } from '../../models/show-user.dto';
import { UsersService } from '../../users.service';
import { NotificatorService } from '../../../core/services/notificator.service';

@Component({
  selector: 'app-user-following',
  templateUrl: './user-following.component.html',
  styleUrls: ['./user-following.component.scss']
})

/**
 * Not working for now expect big data and pagination improvement
 */
export class UserFollowingComponent implements OnInit {
  @Input() userFollowing: ShowUserDTO[];
  public returnFollowing: ShowUserDTO[];

  ngOnInit() {
    this.returnFollowing = this.userFollowing.slice(0, 9);
  }

  public pageChanged(event) {
    this.returnFollowing = this.userFollowing.slice(event.startItem, event.endItem);
  }
}
