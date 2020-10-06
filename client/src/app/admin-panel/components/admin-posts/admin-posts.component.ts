import { Component, OnInit } from '@angular/core';
import {NotificatorService} from '../../../core/services/notificator.service';
import {AdminPanelService} from '../../admin-panel.service';
import {AdminPostDTO} from '../../modals/admin-show-post.dto';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss']
})
export class AdminPostsComponent implements OnInit {

  public allPosts: AdminPostDTO[];
  constructor(
    private readonly toastr: NotificatorService,
    private readonly adminPanelService: AdminPanelService
  ) { }

  ngOnInit() {
    this.adminPanelService.getAllPosts().subscribe(
      posts => this.allPosts = posts,
      _ =>  this.toastr.error('Can\`t get user'),
    );
  }

  public deletePost(userId) {
    this.adminPanelService.deleteUser(userId).subscribe(
      _ => this.toastr.success('User deleted'),
      _ => this.toastr.error('Can\`t deleted user')
    );
  }

}
