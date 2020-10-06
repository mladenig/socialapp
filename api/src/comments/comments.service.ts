import { ShowCommentDTO } from './../common/DTOs/comments/show-comment.dto';
import { CommentDTO } from './../common/DTOs/comments/comment.dto';
import { Comment } from './../database/entities/comment.entity';
import { User } from './../database/entities/user.entity';
import { Post } from './../database/entities/post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemError } from '../common/exceptions/system.error';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  // for admin use
  public async getAllComments(): Promise<CommentDTO[]> {
    const comments: any = await this.commentsRepository.find({
      where: { isDeleted: false },
      order: { createdAt: 'DESC' },
    });

    return comments;
  }

  public async createComment(comment: { comment: string }, postId: number, userId: number) {
    const foundPost: any = await this.postsRepository.findOne({ id: postId });
    if (!foundPost) {
      throw new SystemError('Post not found.');
    }

    const foundUser: User = await this.usersRepository.findOne({ id: userId });
    if (!foundUser) {
      throw new SystemError('User not found.');
    }

    const commnt: any = this.commentsRepository.create(comment);
    commnt.user = foundUser;
    commnt.post = foundPost;

    return await this.commentsRepository.save(commnt);
  }

  public async deleteComment(commentId: number, postId: number): Promise<ShowCommentDTO> {
    const foundComment: Comment = await this.commentsRepository.findOne({
      id: commentId,
    });

    foundComment.isDeleted = true;

    return await this.commentsRepository.save(foundComment);
  }
}
