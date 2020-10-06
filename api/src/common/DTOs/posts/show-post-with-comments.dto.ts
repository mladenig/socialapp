import { ShowUserDTO } from './../users/show-user.dto';
import { CommentDTO } from './../comments/comment.dto';
import { Publish } from '../../../transformer/decorators/publish';

export class ShowPostWithCommentsDTO {

    @Publish()
    public id: number;

    @Publish()
    public title: string;

    @Publish()
    public description: string;

    @Publish(ShowUserDTO)
    public user: ShowUserDTO;

    @Publish(CommentDTO)
    public comments?: CommentDTO[];

    @Publish()
    public img: string;

    @Publish()
    public isPublic: boolean;

    @Publish()
    public allLikes: number;
}
