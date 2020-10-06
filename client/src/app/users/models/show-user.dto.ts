import { Role } from "./user-role.dto";

export class ShowUserDTO {
  public id: number;

  public username: string;

  public email: string;

  public bio: string;

  public role: Role;

  public profilePic: string;

  public position: any;

  public followersCount: number;

  public followingCount: number;
}
