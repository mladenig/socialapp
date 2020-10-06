import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import axios from 'axios';
import {ShowUserByPageDTO} from '../common/DTOs/users/show-user-by-page.dto';
import {ShowUserDTO} from '../common/DTOs/users/show-user.dto';
import {UpdateUserDTO} from '../common/DTOs/users/update-user.dto';
import { CreateUserDTO } from '../common/DTOs/users/create-user.dto';
import {Post} from '../database/entities/post.entity';
import { User } from '../database/entities/user.entity';
import {SystemError} from '../common/exceptions/system.error';
import {Position} from '../database/entities/position.entity';
import {ImgurEnum} from '../common/enums/imgur.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Position) private readonly positionsRepository: Repository<Position>,
  ) {}

  /**
   * Register new user
   * @param user
   */
  public async registerUser(user: CreateUserDTO): Promise<ShowUserDTO> {

    const foundUser: User = await this.usersRepository.findOne({
      username: user.username,
    });

    if (foundUser) {
      throw new SystemError('User already exists.', 400);
    }

    const newUser: User = this.usersRepository.create(user);
    newUser.profilePic = ImgurEnum.defaultAvatar;
    newUser.password = await bcryptjs.hashSync(user.password, 10);

    return await this.usersRepository.save(newUser);
  }

  /**
   * Update user
   * @param id
   * @param loggedUser
   * @param user
   */
  public async updateUser(id: number, loggedUser: ShowUserDTO, user: UpdateUserDTO): Promise<ShowUserDTO> {
    const foundUser: User = await this.usersRepository.findOne({
      id: loggedUser.id,
    });

    this.validateMe(id, loggedUser.id);

    if ( !foundUser ) {
      throw new SystemError('User not found', 404);
    }

    if (loggedUser.id !== id ) {
      throw new SystemError('You can\`t update this user', 400);
    }

    if (user.profilePic) {
      user.profilePic = await this.uploadPhoto(user.profilePic);
    }

    user.position = await this.positionsRepository.findOne({ where : { position: user.position} } );

    const userUpdated = { ...foundUser, ...user };
    const userToUpdated = this.usersRepository.create(userUpdated);

    return await this.usersRepository.save(userToUpdated);
  }

  /**
   * Get full user information
   * HEAVY METHOD
   * TypeScript unexpected behavior DTO id:number but comes string
   * @param userId
   * @param loggedUser
   */
  public async getUserFullInfo(userId: number, loggedUser: ShowUserDTO): Promise<User> {

    const foundUser: User = await this.usersRepository
        .findOne({ id: userId, isDeleted: false });
    if (!foundUser) {
      throw new SystemError('User not found', 404);
    }
    foundUser.followers = await this.getUserFollowers(userId);
    foundUser.following = await  this.getUserFollowing(userId);

    const isFollowing = foundUser.followers.some((user) => user.id === loggedUser.id);

    if (userId == loggedUser.id) {
      foundUser.posts = await  this.getUserAllPosts(userId);
    } else if (isFollowing) {
      foundUser.posts = await  this.getUserAllPosts(userId);
    } else {
      foundUser.posts = await  this.getUserPublicPosts(userId);
    }

    return foundUser;
  }

  /**
   * Get All users page by page
   * @param takeQuary
   * @param skipQiary
   */
  public async getUsersByPage(takeQuary: string, skipQiary: string): Promise<ShowUserByPageDTO> {
    const options: any = {
      take: takeQuary,
      skip: skipQiary,
    };
    const countAllUsers = await this.usersRepository.count();

    if (options.skip >= countAllUsers){
      throw new SystemError('No more users.', 400);
    }

    const foundUsers: User[] = await this.usersRepository
        .find({
          where: { isDeleted: false },
          order: { createdAt: 'DESC' },
          take: options.take || '10',
          skip: options.skip || '0',
        });
    if (!foundUsers) {
      throw new SystemError('Users doesn\'t exist.', 404);
    }

    return {
      countAllUsers,
      users: foundUsers,
    };
  }

  /**
   * Find user by username
   * @param name
   */
  public async findUserByUsername(name: string): Promise<User> {

    return await this.usersRepository.findOne({
      username: name,
    });
  }

  /**
   * Find user by e-mail
   * @param userEmail
   */
  public async findUserByEmail(userEmail: string): Promise<User> {
    const foundUser: User = await this.usersRepository.findOne({
      email: userEmail,
    });

    if (!foundUser) {
      throw new SystemError('User doesn\'t exist.', 404);
    }

    return foundUser;
  }

  /**
   * Delete user
   * and his relations, post and comments
   * likes stays
   * comment DELETE not implemented
   * @param user
   * @param loggedUser
   */
  public async deleteUser(user: number, loggedUser: ShowUserDTO): Promise<User> {
    const foundUser: User = await this.usersRepository.findOne({
      id: user,
    });
    if (!foundUser) {
      throw new SystemError('User doesn\'t exist.', 404);
    }

    this.validateMe(user, loggedUser.id);

    if (foundUser.posts) {
      foundUser.posts.map(post => post.isDeleted = true);
    }
    // commend for delete;
    // foundUser.comments.map(comment => post.isDeleted = true)
    foundUser.isDeleted = true;

    return this.usersRepository.save(foundUser);
  }

  /**
   * Follow user by  auth user
   * @param userToFollow
   * @param userFollower
   */
  public async followUser(userToFollow: number, userFollower: User): Promise<ShowUserDTO> {

    const toFollow: User = await this.findUserById(userToFollow);
    toFollow.followers = await this.getUserFollowers(toFollow.id);
    toFollow.followers = [...toFollow.followers, userFollower];

    return await this.usersRepository.save(toFollow);
  }

  /**
   * Unfollow user by auth user
   * @param userToUnfollow
   * @param userFollower
   */
  public async unfollowUser(userToUnfollow: number, userFollower: User): Promise<ShowUserDTO> {
    const toUnfollow: User = await this.getUserFullInfo(userToUnfollow, userFollower);
    toUnfollow.followers = toUnfollow.following.filter(
      user => user.id !== userToUnfollow,
    );

    return await this.usersRepository.save(toUnfollow);
  }

  /**
   * Get all user followers
   * Too similar methods with next one
   * @param userId
   */
  private async getUserFollowers(userId: number): Promise<User[]> {

    const user = await this.usersRepository.findOne({
      relations: ['followers'],
      where: { id: userId},
    });
    user.followers = await this.isDeleted(user.followers);

    return user.followers;
  }

  /**
   * Get all user following
   * @param userId
   */
  private async getUserFollowing(userId: number): Promise<User[]> {

    const user = await this.usersRepository.findOne({
      relations: ['following'],
      where: { id: userId },
    });
    user.following = await this.isDeleted(user.following);
    return user.following;
  }

  /**
   * Get all user posts
   * @param userId
   */
  private async getUserAllPosts(userId: number): Promise<Post[]> {

    const user = await this.usersRepository.findOne({
      relations: ['posts'],
      where: { id: userId },
    });

    user.posts = await this.isDeleted(user.posts);

    return user.posts;
  }

  /**
   * Filter deleted items
   * Why WebStorm wants to be static?
   * How to set type output it?
   * @param array
   */
  private isDeleted(array) {
    array = array.filter(item => item.isDeleted === false);

    return  array;
  }

  /**
   * Get User public Posts
   * @param userId
   */
  private async getUserPublicPosts(userId: number): Promise<Post[]> {

    const user = await this.usersRepository.findOne({
      relations: ['posts'],
      where: { id: userId },
    });
    user.posts = user.posts.filter((post) => post.isDeleted === false && post.isPublic === true);

    return user.posts;
  }

  /**
   * Validate if logged user is the user how calls
   * TypeScript unexpected behavior id:number but comes string
   * @param user
   * @param me
   */
  private validateMe(user: number, me: number): boolean {
    if (user != me) {
      throw new SystemError('You can`t follow/unfollow yourseff', 400);
    }
    return true;
  }

  /**
   * Upload photo to imgur API
   * Client ID is exposed!!!
   * How to move it to .env file and use it hear?
   * @param base
   */
  private async uploadPhoto(base: string): Promise<string> {

    try {
      const data = await axios(ImgurEnum.galleryRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ImgurEnum.clientID,
        },
        data: {image: base},
      });
      return data.data.data.link;
    } catch (error) {
      throw new SystemError('Can\`t upload image', 400);
    }
  }

  /**
   * Find user by ID if he is not deleted
   * @param userId
   */
  private async findUserById(userId: number): Promise<User> {

    const foundUser: User = await this.usersRepository
        .findOne({ id: userId, isDeleted: false });

    if (!foundUser) {
      throw new SystemError('User doesn\'t exist.');
    }

    return foundUser;
  }
}
