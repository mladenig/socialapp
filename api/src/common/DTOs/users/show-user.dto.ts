import { Publish } from '../../../transformer/decorators/publish';
import { Position } from '../../../database/entities/position.entity';

export class ShowUserDTO {

  @Publish()
  public id: number;

  @Publish()
  public username: string;

  @Publish()
  public email: string;

  @Publish()
  public bio: string;

  @Publish()
  public profilePic: string;

  @Publish()
  public position: Position;

  @Publish()
  public followersCount: number;

  @Publish()
  public followingCount: number;

}
