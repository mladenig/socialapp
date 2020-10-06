import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import {SystemError} from '../common/exceptions/system.error';
import {Post} from '../database/entities/post.entity';
import {Comment} from '../database/entities/comment.entity';
import {ShowUserDTO} from '../common/DTOs/users/show-user.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    @InjectRepository(Comment) private readonly commentsRepository: Repository<Comment>,
  ) {}

  /**
   * Get all users
   * @param admin
   */
  public async getAllUsers(admin: ShowUserDTO): Promise<User[]> {

    return  await this.usersRepository.find();
  }

  /**
   * Delete user
   * @param user
   * @param admin
   */
  public async deleteUser(user: number, admin: ShowUserDTO): Promise<User> {

    const foundUser: User = await this.usersRepository.findOne({
      id: user,
    });
    try {
      if (foundUser.posts) {
        foundUser.posts.map(post => post.isDeleted = true);
      }

      foundUser.isDeleted = true;
    } catch (e) {
      throw new SystemError('User cant\'t be deleted.', 404);
    }

    return this.usersRepository.save(foundUser);
  }

  /**
   * Get all post
   * @param admin
   */
  public async getAllPosts(admin: ShowUserDTO): Promise<Post[]> {

    return this.postsRepository.find();
  }

  /**
   * Get all comments
   * @param admin
   */
  public async getAllComments(admin: ShowUserDTO): Promise<Comment[]> {

    return this.commentsRepository.find();
  }
}
