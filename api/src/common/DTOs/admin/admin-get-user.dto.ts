import { Publish } from '../../../transformer/decorators/publish';

export class AdminUserDTO {

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
    public followersCount: number;

    @Publish()
    public followingCount: number;

    @Publish()
    public isDeleted: string;
}
