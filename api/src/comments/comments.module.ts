import { Comment } from './../database/entities/comment.entity';
import { Post } from './../database/entities/post.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post, Comment]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
