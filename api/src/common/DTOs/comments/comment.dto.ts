import { CommentUserDTO } from './../users/show-comment-user.dto';
import { Publish } from '../../../transformer/decorators/publish';

export class CommentDTO {
  @Publish()
  public id: number;

  @Publish()
  public comment: string;

  @Publish()
  public createdAt: number;

  @Publish(CommentUserDTO)
  public user: CommentUserDTO;
}
