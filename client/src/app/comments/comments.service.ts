import { CommentDTO } from './components/models/comment.dto';
import { CONFIGS } from '../configs/configs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCommentDTO } from './components/models/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly http: HttpClient) {}

  getComments(postId: number) {
    return this.http.get<CommentDTO>(
      `${CONFIGS.API_DOMAIN_NAME}/api/posts/${postId}/comments`
    );
  }

  createComment(comment: CreateCommentDTO, postId: number) {
    return this.http.post<CreateCommentDTO>(
      `${CONFIGS.API_DOMAIN_NAME}/api/posts/${postId}/comments`,
      comment
    );
  }

  deleteComment(postId: number, commentId: number) {
    return this.http.delete(
      `${CONFIGS.API_DOMAIN_NAME}/api/posts/${postId}/comments/${commentId}`
    );
  }
}
