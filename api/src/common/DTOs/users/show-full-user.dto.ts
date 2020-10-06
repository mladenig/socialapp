import { Publish } from '../../../transformer/decorators/publish';
import { ShowUserDTO } from './show-user.dto';
import {ShowPostDTO} from '../posts/show-post.dto';
import { Position } from '../../../database/entities/position.entity';

export class ShowFullUserDTO {

    @Publish()
    public id: number;

    @Publish()
    public username: string;

    @Publish()
    public email: string;

    @Publish()
    public bio: string;

    @Publish()
    public profilePic: string;

    @Publish()
    public position: Position;

    @Publish(ShowPostDTO)
    public posts: ShowPostDTO;

    @Publish(ShowUserDTO)
    public followers: ShowUserDTO;

    @Publish(ShowUserDTO)
    public following: ShowUserDTO;

    @Publish()
    public followersCount: number;

    @Publish()
    public followingCount: number;

}
