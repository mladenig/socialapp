import { ShowUserDTO } from '../../../users/models/show-user.dto';

export class PostDTO {
  id: number;
  likes: number;
  user: ShowUserDTO;
  title: string;
  description: string;
  img: string;
  allLikes: string;
  isPublic: boolean;
  comments?: Comment;
}
