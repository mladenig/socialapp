import {IsNotEmpty} from 'class-validator';
import {FollowUnfollow} from '../enums/follow-unfollow.enum';

export class FollowUnfollowDTO {

    @IsNotEmpty()
    public followUnfollow: FollowUnfollow;
}
