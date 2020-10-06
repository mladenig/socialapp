import { ShowUserDTO } from './../../../users/models/show-user.dto';
import { PostDTO } from './../../../posts/components/models/post.model';

export class CommentDTO {
  id: number;
  content: string;
  createdAt: number;
  user: ShowUserDTO;
  post: PostDTO;
}
