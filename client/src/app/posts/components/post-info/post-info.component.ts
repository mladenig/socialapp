import { AuthService } from './../../../core/services/auth.service';
import { FormGroup } from '@angular/forms';
import { SinglePostWithCommentsDTO } from './../models/post-with-comments.dto';
import { NotificatorService } from './../../../core/services/notificator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from './../../posts.service';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommentsService } from '../../../comments/comments.service';
import { UpdatePostComponent } from '../update-post/update-post.component';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit {
  postData: SinglePostWithCommentsDTO;
  logged;
  ownership = true;

  constructor(
    private readonly postsService: PostsService,
    private readonly toastr: NotificatorService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly commentsService: CommentsService,
    private readonly modalService: BsModalService
  ) {}

  ngOnInit() {
    this.auth.loggedFullUser$.subscribe(data => this.logged = data);
    const { postInfo } = this.route.snapshot.data;
    this.postData = postInfo;
    this.isOwner();
  }

  public loadPost() {
    this.postsService.getSinglePost(this.postData.id).subscribe(post => {
      this.postData = post;
    });
  }

  likePost() {
    this.postsService.likePost(this.postData.id).subscribe(
      () => {
        this.loadPost();
        this.toastr.success('Post liked');
      },
      e => {
        this.toastr.error(`${e.error.error}`);
      }
    );
  }

  deletePost() {
    this.postsService.deletePost(this.postData.id).subscribe(
      () => {
        this.toastr.success('Post deleted');
        this.router.navigate(['/posts']);
      },
      e => {
        this.toastr.error('Something went wrong.');
      }
    );
  }

  public updatePostModal() {
    const modalRef = this.modalService.show(UpdatePostComponent, {
      initialState: {
        post: this.postData
      }
    });

    this.modalService.onHidden
      .pipe(
        filter(() => (modalRef.content.postUpdateForm as FormGroup).dirty),
        switchMap(() => this.postsService.updatePost(modalRef.content.post))
      )
      .subscribe(
        () => {
          this.toastr.success('Post updated successfully');
        },
        e => {
          this.toastr.error(e.error.error);
        },
        () => {
          this.loadPost();
        }
      );
  }

  public postComment(value): void {
    this.commentsService.createComment(value, this.postData.id).subscribe(
      () => {
        this.loadPost();
        this.toastr.success('Comment posted');
      },
      e => {
        this.toastr.error(e.error.error);
      }
    );
  }

  deleteComment(commentId: number) {
    this.commentsService.deleteComment(this.postData.id, commentId).subscribe(
      () => {
        this.loadPost();
        this.toastr.success('Comment deleted successfully!');
      },
      err => {
        this.toastr.error('Something went wrong.');
      }
    );
  }

  viewUser() {
    this.router.navigate([`users/`, this.postData.user.id]);
  }

  private isOwner() {
    if (this.logged.id !== this.postData.user.id) {
      this.ownership = false;
    }
  }
}
