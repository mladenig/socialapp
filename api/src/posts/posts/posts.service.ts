import { FullPostDTO } from './../../common/DTOs/posts/full-post.dto';
import { ShowPostWithCommentsDTO } from './../../common/DTOs/posts/show-post-with-comments.dto';
import { ShowPostsByPageDTO } from './../../common/DTOs/posts/show-posts-by-page.dto';
import { ShowPostDTO } from './../../common/DTOs/posts/show-post.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../database/entities/post.entity';
import { Like } from '../../database/entities/like.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from '../../common/DTOs/posts/create-post.dto';
import { UpdatePostDTO } from '../../common/DTOs/posts/update-post.dto';
import { User } from '../../database/entities/user.entity';
import { SystemError } from '../../common/exceptions/system.error';
import { ShowSinglePostDTO } from '../../common/DTOs/posts/show-single-post.dto';
import axios from 'axios';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    @InjectRepository(Like) private readonly likesRepository: Repository<Like>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  public async getPosts(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  public async getPostsByPage(
    takeQuary: string,
    skipQiary: string,
  ): Promise<ShowPostsByPageDTO> {
    const options: any = {
      take: takeQuary,
      skip: skipQiary,
    };
    const foundPosts: ShowPostDTO[] = await this.postsRepository.find({
      where: {
        isDeleted: false,
        isPublic: true },
      order: { createdAt: 'DESC' },
      take: options.take || '10',
      skip: options.skip || '0',
    });
    if (!foundPosts) {
      throw new SystemError('Posts don\'t exist.', 404);
    }

    return {
      countAllPosts: await this.postsRepository.count(),
      posts: foundPosts,
    };
  }

  public async getSinglePost(postId: number): Promise<ShowPostWithCommentsDTO> {
    const singlePost: any = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['user'],
    });

    return {
      ...singlePost,
      comments: singlePost.comments.sort((a, b) => {
        return a.createdAt - b.createdAt;
      }),
    } as ShowPostWithCommentsDTO;
  }

  public async createPost(
    createPost: CreatePostDTO,
    userId: number,
  ): Promise<ShowSinglePostDTO> {
    const foundUser: User = await this.usersRepository.findOne({ id: userId });
    if (!foundUser) {
      throw new SystemError('User not found.', 404);
    }

    createPost.img = await this.uploadPhoto(createPost.img);

    const post: any = this.postsRepository.create(createPost);
    post.user = foundUser;

    return await this.postsRepository.save(post);
  }

  public async updatePost(
    id: number,
    updatePost: UpdatePostDTO,
    user: User,
  ): Promise<ShowSinglePostDTO> {
    const oldPost: any = await this.findById(id);

    const entityToUpdate = { ...oldPost, ...updatePost };
    const updated: any = this.postsRepository.create(entityToUpdate);

    return await this.postsRepository.save(updated);
  }

  public async deletePost(id: number): Promise<ShowSinglePostDTO> {
    const post: any = await this.findById(id);
    post.isDeleted = true;

    return await this.postsRepository.save(post);
  }

  // public async likePost(
  //   postId: number,
  //   userLiker: User,
  // ): Promise<FullPostDTO> {
  //   const postEntity: any = await this.findById(postId);
  //   const isLiked = await this.likesRepository.findOne({
  //     relations: ['post', 'user'],
  //     where: {
  //       user: userLiker,
  //       post: postEntity,
  //     },
  //   });
  //   if (!isLiked) {
  //     const liked = this.likesRepository.create({ liked: true });
  //     liked.user = Promise.resolve(userLiker);
  //     liked.post = Promise.resolve(postEntity);
  //     try {
  //       await this.likesRepository.save(liked);
  //       ++postEntity.allLikes;
  //     } catch (e) {
  //       throw new SystemError('Can`t like this post', 400);
  //     }

  //     return await this.postsRepository.save(postEntity);
  //   }
  //   try {
  //     if (isLiked.liked) {
  //       // BUG
  //       postEntity.allLikes = postEntity.allLikes - 1;
  //       isLiked.liked = !isLiked.liked;
  //     } else {
  //       ++postEntity.allLikes;
  //       isLiked.liked = !isLiked.liked;
  //     }
  //     await this.likesRepository.save(isLiked);
  //   } catch (e) {
  //     throw new SystemError('Can`t like this post', 400);
  //   }

  //   return await this.postsRepository.save(postEntity);
  // }

  public async likePost(postId: number, liker: User): Promise<FullPostDTO> {
    const foundPost = await this.postsRepository.findOne({
      relations: ['likes', 'user', 'comments'],
      where: {id: postId}});
    const foundUser = await this.usersRepository.findOne({where: {id: liker.id}});
    const foundLike = await this.likesRepository.findOne({
          relations: ['post', 'user'],
          where: {
            user: foundUser,
            post: foundPost,
          },
        });

    if (!foundLike) {
      const newLike = await this.likesRepository.create({ liked: true });
      newLike.user = Promise.resolve(foundUser);
      newLike.post = Promise.resolve(foundPost);
      foundPost.allLikes += 1;
      await this.likesRepository.save(newLike);
    } else if (foundLike) {
      foundPost.allLikes -= 1;
      foundLike.liked = false;
      await this.likesRepository.save(foundLike);
    }

    return foundPost;
  }

  private async findById(postId: number): Promise<ShowSinglePostDTO> {
    const foundPost: any = await this.postsRepository.findOne({
      id: postId,
    });
    if (!foundPost || foundPost.isDeleted) {
      throw new SystemError('No such post found', 400);
    }

    return foundPost;
  }

  async uploadPhoto(base: string): Promise<string> {
    try {
      const data = await axios(`https://api.imgur.com/3/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // tslint:disable-next-line: object-literal-key-quotes
          Authorization: `Client-ID 7084d3c72f8fab9`,
        },
        data: { image: base },
      });
      return data.data.data.link;
    } catch (error) {
      throw new SystemError('Can`t upload image', 400);
    }
  }
}
