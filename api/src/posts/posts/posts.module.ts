import { User } from './../../database/entities/user.entity';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from '../../database/entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../../database/entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Like, User]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
