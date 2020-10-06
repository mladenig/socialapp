import { ShowUserDTO } from './../users/show-user.dto';
import { ShowPostDTO } from './../posts/show-post.dto';
import { Publish } from '../../../transformer/decorators/publish';
export class LikeDTO {

@Publish()
public id: number;

@Publish()
public liked: boolean;

@Publish(ShowPostDTO)
public post: Promise<ShowPostDTO>;

@Publish(ShowUserDTO)
public user: Promise<ShowUserDTO>;
}
