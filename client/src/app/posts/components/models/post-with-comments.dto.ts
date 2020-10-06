import { CommentDTO } from './../../../comments/components/models/comment.dto';
import { ShowUserDTO } from '../../../users/models/show-user.dto';

export class SinglePostWithCommentsDTO {
  public id: number;

  public title: string;

  public description: string;

  public img: string;

  public allLikes: number;

  public isPublic?: boolean;

  public user: ShowUserDTO;

  public comments: Comment[];
}
