import {AdminUserPropertyDTO} from './admin-user-property.dto';

export class AdminShowCommentDTO {
  public id: number;

  public comment: string;

  public createdAt: string;

  public user: AdminUserPropertyDTO;
}
