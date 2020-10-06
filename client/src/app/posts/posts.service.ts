import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { SinglePostWithCommentsDTO } from './components/models/post-with-comments.dto';
import { ShowPostByPageDTO } from './components/models/show-post-by-page.dto';
import { UpdatePostDTO } from './components/models/update-post.dto';
import { CreatePostDTO } from './components/models/create-post.dto';
import { CONFIGS } from './../configs/configs';
import { SinglePostDTO } from './components/models/single-post.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { ShowUserDTO } from '../users/models/show-user.dto';
import { NotificatorService } from '../core/services/notificator.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  public updateList: Subject<void> = new Subject(); // used to reload list of posts in all-posts component.

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly toastr: NotificatorService
  ) {}

  // public getAllPosts() {
  //   return this.http.get<SinglePostDTO[]>(`${CONFIGS.API_DOMAIN_NAME}/api/posts`);
  // }

  public isListUpdated(): Observable<void> {
    return this.updateList.asObservable(); // used in all posts component
  }

  public getAllPosts(skip, take): Observable<ShowPostByPageDTO> {
    return this.http.get<ShowPostByPageDTO>(
      `${CONFIGS.API_DOMAIN_NAME}/api/posts/?skip=${skip}&take=${take}`
    );
  }

  public getSinglePost(postId: number) {
    // back-end - cannot read id of null
    // TODO
    return this.http
      .get<SinglePostWithCommentsDTO>(
        `${CONFIGS.API_DOMAIN_NAME}/api/posts/${postId}`
      )
      .pipe(
        catchError(error => {
          this.router.navigate(['/posts']);
          this.toastr.error('There was an unexpected error.');
          return throwError(error);
        })
      );
  }

  public createPost(post: CreatePostDTO) {
    return this.http
      .post<CreatePostDTO>(`${CONFIGS.API_DOMAIN_NAME}/api/posts`, post)
      .pipe(tap(() => this.updateList.next()));
  }

  public deletePost(postId: number) {
    return this.http
      .delete<SinglePostDTO>(`${CONFIGS.API_DOMAIN_NAME}/api/posts/${postId}`)
      .pipe(tap(() => this.updateList.next()));
  }

  public updatePost(post: UpdatePostDTO) {
    return this.http
      .put<SinglePostDTO>(`${CONFIGS.API_DOMAIN_NAME}/api/posts/${post.id}`, post
      )
      .pipe(tap(() => this.updateList.next()));
  }

  public getPostUserById(id: number): Observable<ShowUserDTO> {
    return this.http.get<ShowUserDTO>(
      `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}`
    );
  }

  public likePost(postId: number) {
    return this.http
      .delete(`${CONFIGS.API_DOMAIN_NAME}/api/posts/${postId}/like`)
      .pipe(tap(() => this.updateList.next()));
  }

}
