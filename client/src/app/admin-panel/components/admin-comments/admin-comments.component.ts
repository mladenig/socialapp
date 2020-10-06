import { Component, OnInit } from '@angular/core';
import {NotificatorService} from '../../../core/services/notificator.service';
import {AdminPanelService} from '../../admin-panel.service';
import {AdminShowCommentDTO} from '../../modals/admin-show-comment.dto';
@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.scss']
})
export class AdminCommentsComponent implements OnInit {

  public allComments: AdminShowCommentDTO[];

  constructor(
    private readonly toastr: NotificatorService,
    private readonly adminPanelService: AdminPanelService
  ) { }

  ngOnInit() {
    this.adminPanelService.getAllComments().subscribe(
      comments => this.allComments = comments,
      _ =>  this.toastr.error('Can\`t get comments'),
    );
  }

}
