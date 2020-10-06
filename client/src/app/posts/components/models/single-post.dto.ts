import { ShowUserDTO } from '../../../users/models/show-user.dto';

export class SinglePostDTO {
  public id: number;

  public title: string;

  public description: string;

  public img: string;

  public likes: number;

  public isPublic: boolean;

  public user: ShowUserDTO;
}
