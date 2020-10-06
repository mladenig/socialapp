import { FullPostDTO } from './../../common/DTOs/posts/full-post.dto';
import { ShowPostWithCommentsDTO } from './../../common/DTOs/posts/show-post-with-comments.dto';
import { ShowPostsByPageDTO } from './../../common/DTOs/posts/show-posts-by-page.dto';
import { CreatePostDTO } from './../../common/DTOs/posts/create-post.dto';
import { UpdatePostDTO } from './../../common/DTOs/posts/update-post.dto';
import { Controller, Get, ValidationPipe, Body, UseInterceptors, Put, Param, ParseIntPipe, Delete, UseGuards, UseFilters, Post, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TransformInterceptor } from '../../transformer/interceptors/transform.interceptor';
import { ShowPostDTO } from '../../common/DTOs/posts/show-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { SystemErrorFilter } from '../../common/filters/error.filter';
import { User } from '../../database/entities/user.entity';
import { UserJWT } from '../../common/decorators/UserJWT';
import { ShowSinglePostDTO } from '../../common/DTOs/posts/show-single-post.dto';

@Controller('posts')
export class PostsController {

  constructor(
    private readonly postsService: PostsService,
  ) {}

  @Get()
  @UseInterceptors(new TransformInterceptor(ShowPostsByPageDTO))
  @UseFilters(SystemErrorFilter)
  async getAllPosts(
      @Query('take') take: string,
      @Query('skip') skip: string,
      ): Promise<ShowPostsByPageDTO> {
    return await this.postsService.getPostsByPage(take, skip);
  }

  @Get(':id')
  @UseInterceptors(new TransformInterceptor(ShowPostWithCommentsDTO))
  async getSinglePost(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ShowPostWithCommentsDTO> {
    return await this.postsService.getSinglePost(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowSinglePostDTO))
  async createPost(
    @Body(new ValidationPipe({
      transform: true,
      whitelist: true,
    })) createPost: CreatePostDTO,
    @UserJWT() user: User,
  ): Promise<ShowSinglePostDTO> {
    return await this.postsService.createPost(createPost, user.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowPostDTO))
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({
      transform: true,
      whitelist: true,
    })) updatePost: UpdatePostDTO,
  ): Promise<ShowSinglePostDTO> {
    return await this.postsService.updatePost(id, updatePost, 'user' as any);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowPostDTO))
  public async deletePost(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ShowSinglePostDTO> {
    return await this.postsService.deletePost(id);
  }

  @Delete(':id/like')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(SystemErrorFilter)
  @UseInterceptors(new TransformInterceptor(FullPostDTO))
  public async likePost(
    @Param('id', ParseIntPipe) postId: number,
    @UserJWT() user: User,
  ): Promise<FullPostDTO> {
    return this.postsService.likePost(postId, user);
  }
}
