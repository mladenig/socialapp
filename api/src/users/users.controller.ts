import { CreateUserDTO } from '../common/DTOs/users/create-user.dto';
import { User } from '../database/entities/user.entity';
import { ShowUserDTO } from '../common/DTOs/users/show-user.dto';
import { UsersService } from './users.service';
import {
  Get,
  Post,
  Put,
  Patch,
  Delete,
  UseFilters,
  Body,
  Param,
  Query,
  UseGuards,
  Controller,
  UseInterceptors,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UserJWT } from '../common/decorators/UserJWT';
import { AuthGuard } from '@nestjs/passport';
import {actionsToMethods} from '../common/contracts/follow-unfollow.actions';
import {ShowUserByPageDTO} from '../common/DTOs/users/show-user-by-page.dto';
import { ShowFullUserDTO } from '../common/DTOs/users/show-full-user.dto';
import {SystemErrorFilter} from '../common/filters/error.filter';
import { TransformInterceptor } from '../transformer/interceptors/transform.interceptor';
import {FollowUnfollowDTO} from '../common/DTOs/follow-unfollow.dto';
import {UpdateUserDTO} from '../common/DTOs/users/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get all users page by page uses query parameters
   * @param take
   * @param skip
   */
  @Get()
  @UseInterceptors(new TransformInterceptor(ShowUserByPageDTO))
  @UseFilters(SystemErrorFilter)
  async getAllUsers(
      @Query('take') take: string,
      @Query('skip') skip: string,
      ): Promise<ShowUserByPageDTO> {
    return await this.usersService.getUsersByPage(take, skip);
  }

  /**
   * HEAVY CALL
   * Get single user with all his relations
   * @param userId
   * @param loggedUser
   */
  @Get('/:userId')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new TransformInterceptor(ShowFullUserDTO))
  @UseFilters(SystemErrorFilter)
  async getUser(
      @Param('userId') userId: number,
      @UserJWT() loggedUser: ShowUserDTO,
    ): Promise<User> {
        return await this.usersService.getUserFullInfo(userId, loggedUser);
  }

  /**
   * Register new user
   * Gets base64 string for image
   * @param newUser
   */
  @Post()
  @UseFilters(SystemErrorFilter)
  @UseInterceptors(new TransformInterceptor(ShowUserDTO))
  async registerUser(
      @Body(ValidationPipe) newUser: CreateUserDTO,
  ): Promise<ShowUserDTO> {

    return await this.usersService.registerUser(newUser);
  }

  /**
   * Update user
   * Need improvement
   * @param id
   * @param loggedUser
   * @param updateUser
   */
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(SystemErrorFilter)
  @UseInterceptors(new TransformInterceptor(ShowUserDTO))
  async updateUser(
      @Param('id', ParseIntPipe) id: number,
      @UserJWT() loggedUser: ShowUserDTO,
      @Body() updateUser: any,
  ) {
    return await this.usersService.updateUser(id, loggedUser, updateUser);
  }

  /**
   * Follow-Unfollow user by user
   * @param userToFollow
   * @param body
   * @param follower
   */
  @Patch('/:userId')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(SystemErrorFilter)
  @UseInterceptors(new TransformInterceptor(ShowUserDTO))
  async followUnfollowUser(
    @Param('userId') userToFollow: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
        body: FollowUnfollowDTO,
    @UserJWT() follower: User,
  ): Promise<ShowUserDTO> {
    return await this.usersService[actionsToMethods[body.followUnfollow]](userToFollow, follower);
  }

  /**
   * @param loggedUser
   * @param userForDelete
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:userId')
  @UseFilters(SystemErrorFilter)
  async deleteUser(
      @UserJWT() loggedUser: ShowUserDTO,
      @Param('userId') userForDelete: number,
  ): Promise<CreateUserDTO> {
    return await this.usersService.deleteUser(userForDelete, loggedUser);
  }

  // FOR big data
  // @Get('/:userId/followers')
  // @UseInterceptors(new TransformInterceptor(ShowUserDTO))
  // @UseFilters(SystemErrorFilter)
  // async getUserFollowers(
  //     @Param('userId') userId: number
  // ): Promise<User[]> {
  //   return await this.usersService.getUserFollowers(userId);
  // }

  // FOR big data
  // @Get('/:userId/following')
  // @UseInterceptors(new TransformInterceptor(ShowUserDTO))
  // @UseFilters(SystemErrorFilter)
  // async getUserFollowing(@Param('userId') userId: number): Promise<User[]> {
  //   return await this.usersService.getUserFollowing(userId);
  // }
}
