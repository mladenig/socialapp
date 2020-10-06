import { ShowUserDTO } from './../users/show-user.dto';
import { Publish } from '../../../transformer/decorators/publish';

export class ShowPostDTO {

    @Publish()
    public id: number;

    @Publish()
    public title: string;

    @Publish(ShowUserDTO)
    public user: ShowUserDTO;

    @Publish()
    public description: string;

    @Publish()
    public img: string;

    @Publish()
    public isPublic: boolean;

    @Publish()
    public allLikes: number;
}
