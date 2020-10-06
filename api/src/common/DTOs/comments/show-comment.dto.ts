import { ShowUserDTO } from '../users/show-user.dto';
import { Publish } from '../../../transformer/decorators/publish';

export class ShowCommentDTO {
  @Publish()
  public id: number;

  @Publish()
  public comment: string;

  @Publish()
  public createdAt: number;

  @Publish(ShowUserDTO)
  public user: ShowUserDTO;
}
