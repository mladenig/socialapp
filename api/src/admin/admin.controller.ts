
import { AdminService } from './admin.service';
import {
  Get,
  Delete,
  Controller,
  Param,
  UseInterceptors,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { UserJWT } from '../common/decorators/UserJWT';
import { AuthGuard } from '@nestjs/passport';
import {SystemErrorFilter} from '../common/filters/error.filter';
import { User } from '../database/entities/user.entity';
import {Post} from '../database/entities/post.entity';
import {Comment} from '../database/entities/comment.entity';
import {ShowUserDTO} from '../common/DTOs/users/show-user.dto';
import {AdminUserDTO} from '../common/DTOs/admin/admin-get-user.dto';
import {TransformInterceptor} from '../transformer/interceptors/transform.interceptor';
import {AdminPostDTO} from '../common/DTOs/admin/admin-get-post.dto';
import {AdminCommentDTO} from '../common/DTOs/admin/admin-get-comments.dto';
import {AdminGuard} from '../common/guards/admin-guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminsService: AdminService) {}

  /**
   * Get All users
   * @param loggedUser
   */
  @Get('users')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseInterceptors(new TransformInterceptor(AdminUserDTO))
  @UseFilters(SystemErrorFilter)
  async getAllUsers(
      @UserJWT() loggedUser: ShowUserDTO,
      ): Promise<User[]> {
    return await this.adminsService.getAllUsers(loggedUser);
  }

  /**
   * Delete user
   * @param loggedUser
   * @param userForDelete
   */
  @Delete('users/:userId')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseFilters(SystemErrorFilter)
  async deleteUser(
      @UserJWT() loggedUser: ShowUserDTO,
      @Param('userId') userForDelete: number,
  ): Promise<User> {
    return await this.adminsService.deleteUser(userForDelete, loggedUser);
  }

  /**
   * Get All posts
   * @param admin
   */
  @Get('posts')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseInterceptors(new TransformInterceptor(AdminPostDTO))
  @UseFilters(SystemErrorFilter)
  async getAllPosts(
      @UserJWT() admin: ShowUserDTO,
  ): Promise<Post[]> {
    return await this.adminsService.getAllPosts(admin);
  }

  /**
   * Get all comments
   * @param admin
   */
  @Get('comments')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @UseInterceptors(new TransformInterceptor(AdminCommentDTO))
  @UseFilters(SystemErrorFilter)
  async getAllComments(
      @UserJWT() admin: ShowUserDTO,
  ): Promise<Comment[]> {
    return await this.adminsService.getAllComments(admin);
  }
}
