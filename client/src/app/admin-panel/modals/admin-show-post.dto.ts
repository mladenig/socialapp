import {AdminUserPropertyDTO} from './admin-user-property.dto';

export class AdminPostDTO {
  public id: number;

  public img: string;

  public title: string;

  public description: string;

  public isPublic: boolean;

  public isDeleted: boolean;

  public user: AdminUserPropertyDTO;

  public allLikes: number;
}
