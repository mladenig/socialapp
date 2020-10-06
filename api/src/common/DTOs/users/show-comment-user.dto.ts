import { Publish } from '../../../transformer/decorators/publish';

export class CommentUserDTO {
  @Publish()
  public id: number;

  @Publish()
  public username: string;

  @Publish()
  public profilePic: string;
}
