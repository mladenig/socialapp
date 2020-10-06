import { Publish } from '../../../transformer/decorators/publish';
import {ShowUserDTO} from './show-user.dto';

export class ShowUserByPageDTO {
    @Publish()
    public countAllUsers: number;

    @Publish(ShowUserDTO)
    public users: any;
}
