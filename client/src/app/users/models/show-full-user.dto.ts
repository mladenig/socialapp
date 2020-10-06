import { Role } from './user-role.dto';
import {ShowUserDTO} from './show-user.dto';
import {PostDTO} from '../../posts/components/models/post.model';

export class ShowFullUserDTO {
  public id: number;

  public username: string;

  public email: string;

  public bio: string;

  public role: Role;

  public profilePic: string;

  public position: any;

  public posts: PostDTO[];

  public followers: ShowUserDTO[];

  public following: ShowUserDTO[];

  public followersCount: number;

  public followingCount: number;
}
