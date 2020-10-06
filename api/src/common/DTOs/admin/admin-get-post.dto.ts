import { Publish } from '../../../transformer/decorators/publish';
import {UserAsPropertyDTO} from './user-as-property.dto';

export class AdminPostDTO {

    @Publish()
    public id: number;

    @Publish()
    public title: string;

    @Publish(UserAsPropertyDTO)
    public user: UserAsPropertyDTO;

    @Publish()
    public description: string;

    @Publish()
    public img: string;

    @Publish()
    public isPublic: boolean;

    @Publish()
    public isDeleted: boolean;

    @Publish()
    public allLikes: number;
}
