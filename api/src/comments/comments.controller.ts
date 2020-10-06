import { ShowCommentDTO } from '../common/DTOs/comments/show-comment.dto';
import { CommentDTO } from '../common/DTOs/comments/comment.dto';
import { UserJWT } from '../common/decorators/UserJWT';
import { CommentsService } from './comments.service';
import { Controller, Post, Body, Param, UseGuards, Delete, Get, UseInterceptors } from '@nestjs/common';
import { User } from '../database/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { TransformInterceptor } from '../transformer/interceptors/transform.interceptor';

@Controller('posts/:postId/comments')
export class CommentsController {

  constructor(private readonly commentService: CommentsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(CommentDTO))
  public async getComments(): Promise<CommentDTO[]> {
    return await this.commentService.getAllComments();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(CommentDTO))
  public async createComment(
    @Param('postId') postId: number,
    @UserJWT() user: User,
    @Body() comment: any,
  ): Promise<CommentDTO> {
    return await this.commentService.createComment(comment, postId, user.id);
  }

  @Delete('/:commentId')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowCommentDTO))
  public async deleteComment(
    @Param('commentId') commentId: number,
    @Param('postId') postId: number,
  ): Promise<ShowCommentDTO> {
    return await this.commentService.deleteComment(commentId, postId);
  }
}
