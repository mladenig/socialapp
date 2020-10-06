import { Subject } from 'rxjs';
import { SinglePostWithCommentsDTO } from './../models/post-with-comments.dto';
import { NotificatorService } from './../../../core/services/notificator.service';
import { CreatePostComponent } from './../create-post/create-post.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PostsService } from './../../posts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit, OnDestroy {
  public posts: SinglePostWithCommentsDTO[];
  public pageSize = 3;
  public count = 0;

  private unsubscribe$: Subject<void> = new Subject();

  private currentPage: PageChangedEvent = {
    page: 0,
    itemsPerPage: this.pageSize
  };

  constructor(
    private readonly postsService: PostsService,
    private readonly modalService: BsModalService,
    private readonly toastr: NotificatorService
  ) {}

  ngOnInit() {
    this.postsService.isListUpdated().subscribe(() => {
      this.loadPosts(this.currentPage);
    });
    this.loadPosts(this.currentPage);
  }

  private loadPosts({ page, itemsPerPage }): void {
    setTimeout(() => {
      this.scrollTo();
    }, 300),
      this.postsService
        .getAllPosts(page, itemsPerPage)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.posts = data.posts;
            this.count = data.countAllPosts;
          },
          error => this.toastr.error(error.error.error)
        );
  }

  public createPostModal() {
    this.modalService.show(CreatePostComponent);
  }

  public pageChanged(event: PageChangedEvent): void {
    this.currentPage.page = (event.page - 1) * event.itemsPerPage;
    this.currentPage.itemsPerPage = event.itemsPerPage;
    this.loadPosts(this.currentPage);
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();

    this.unsubscribe$.complete();
  }

  public trackByFn(item: SinglePostWithCommentsDTO) {
    return item.id;
  }
  private scrollTo() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
    });
  }
}
