import { Publish } from '../../../transformer/decorators/publish';
import {UserAsPropertyDTO} from './user-as-property.dto';

export class AdminCommentDTO {
    @Publish()
    public id: number;

    @Publish()
    public comment: string;

    @Publish()
    public createdAt: number;

    @Publish(UserAsPropertyDTO)
    public user: UserAsPropertyDTO;
}
