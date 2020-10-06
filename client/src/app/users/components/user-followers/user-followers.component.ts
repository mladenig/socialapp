import { Component, OnInit, Input } from '@angular/core';
import { ShowUserDTO } from '../../models/show-user.dto';

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.scss']
})

/**
 * Not working for now expect big data and pagination improvement
 */
export class UserFollowersComponent implements OnInit {

  @Input() userFollowers: ShowUserDTO[];
  public returnFollowers: ShowUserDTO[];

  ngOnInit() {
    this.returnFollowers = this.userFollowers.slice(0, 9);
  }

  public pageChanged(event) {
    this.returnFollowers = this.userFollowers.slice(event.startItem, event.endItem);
  }
}
