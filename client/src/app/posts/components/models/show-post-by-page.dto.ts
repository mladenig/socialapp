import { SinglePostWithCommentsDTO } from './post-with-comments.dto';

export class ShowPostByPageDTO {

    public countAllPosts: number;
    public posts: SinglePostWithCommentsDTO[];

}
