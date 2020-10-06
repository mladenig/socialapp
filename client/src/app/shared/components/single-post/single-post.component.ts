import { NotificatorService } from '../../../core/services/notificator.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../../../posts/posts.service';
import { SinglePostWithCommentsDTO } from '../../../posts/components/models/post-with-comments.dto';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  @Input() post: SinglePostWithCommentsDTO;
  toggleLike: boolean;

  constructor(
    private readonly router: Router,
    private readonly postsService: PostsService,
    private readonly toastr: NotificatorService,
    ) { }

  ngOnInit() {
  }

  likePost() {
    this.postsService.likePost(this.post.id).subscribe(
      () => this.toastr.success('Post liked'),
      e => {
        this.toastr.error(`${e.error.error}`);
      }
    );
  }

  viewPost() {
    this.router.navigate([`posts/`, this.post.id]);
  }

  viewUser() {
    this.router.navigate([`users/`, this.post.user.id]);
  }
}
