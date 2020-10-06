import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import {Post} from '../database/entities/post.entity';
import {Comment} from '../database/entities/comment.entity';
import {PostsService} from '../posts/posts/posts.service';
import {CommentsService} from '../comments/comments.service';
import {UsersService} from '../users/users.service';
import {Like} from '../database/entities/like.entity';
import {Position} from '../database/entities/position.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment, Like, Position]),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    UsersService,
    PostsService,
    CommentsService,
  ],
  exports: [
    AdminService,
    UsersService,
    PostsService,
    CommentsService,
  ],
})
export class AdminModule {}
