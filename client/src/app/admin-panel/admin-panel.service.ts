import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIGS } from '../configs/configs';
import { AdminUserDTO } from './modals/admin-show-user.dto';
import { AdminPostDTO } from './modals/admin-show-post.dto';
import { AdminShowCommentDTO } from './modals/admin-show-comment.dto';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  constructor(
    private readonly http: HttpClient,
  ) {}

  public getAllUsers(): Observable<AdminUserDTO[]> {
    return this.http.get<AdminUserDTO[]>(
      `${CONFIGS.API_DOMAIN_NAME}/api/admin/users`
    );
  }
  public deleteUser(id: number): Observable<AdminUserDTO> {
    return this.http.delete<AdminUserDTO>(
      `${CONFIGS.API_DOMAIN_NAME}/api/admin/users/${id}`
    );
  }

  public getAllPosts(): Observable<AdminPostDTO[]> {
    return this.http.get<AdminPostDTO[]>(
      `${CONFIGS.API_DOMAIN_NAME}/api/admin/posts`
    );
  }
  public deletePost(id: number): Observable<AdminUserDTO> {
    return this.http.delete<AdminUserDTO>(
      `${CONFIGS.API_DOMAIN_NAME}/api/admin/post/${id}`
    );
  }

  public getAllComments(): Observable<AdminShowCommentDTO[]> {
    return this.http.get<AdminShowCommentDTO[]>(
      `${CONFIGS.API_DOMAIN_NAME}/api/admin/comments`
    );
  }
}
