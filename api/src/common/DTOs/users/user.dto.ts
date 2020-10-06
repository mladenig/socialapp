import { UserRoles } from '../../enums/user-roles';
import { Publish } from '../../../transformer/decorators/publish';

export class UserDTO {

  @Publish()
  public id: number;

  @Publish()
  public username: string;

  @Publish()
  public role: UserRoles;

  @Publish()
  public email: string;

  @Publish()
  public bio: string;

  @Publish()
  public profilePicture: string;

  @Publish()
  public isPrivate: boolean;
}
