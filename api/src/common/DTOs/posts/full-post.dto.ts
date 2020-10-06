import { LikeDTO } from './../likes/like.dto';
import { Publish } from './../../../transformer/decorators/publish';
import { ShowUserDTO } from './../users/show-user.dto';
import { CommentDTO } from './../comments/comment.dto';

export class FullPostDTO {

    @Publish()
    public id: number;

    @Publish()
    public title: string;

    @Publish()
    public description: string;

    @Publish()
    public img: string;

    @Publish()
    public allLikes: number;

    @Publish()
    public isPublic: boolean;

    @Publish()
    public isDeleted: boolean;

    @Publish()
    public createdAt: number;

    @Publish()
    public updatedAt: number;

    @Publish(ShowUserDTO)
    public user: ShowUserDTO;

    @Publish(LikeDTO)
    public likes: LikeDTO[];

    @Publish(CommentDTO)
    public comments?: CommentDTO[];
}
