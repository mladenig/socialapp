import { ShowPostWithCommentsDTO } from './show-post-with-comments.dto';
import { ShowPostDTO } from './show-post.dto';
import { Publish } from '../../../transformer/decorators/publish';

export class ShowPostsByPageDTO {
    @Publish()
    public countAllPosts: number;

    @Publish(ShowPostWithCommentsDTO)
    public posts: ShowPostWithCommentsDTO[];
}
