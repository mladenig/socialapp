import { Publish } from '../../../transformer/decorators/publish';

export class UserAsPropertyDTO {

    @Publish()
    public id: number;

    @Publish()
    public username: string;
}
