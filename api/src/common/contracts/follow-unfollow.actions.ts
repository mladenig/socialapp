import {FollowUnfollowUser} from '../enums/follow-unfollow.actions';

export const actionsToMethods = {
    [FollowUnfollowUser.Follow]: 'followUser',
    [FollowUnfollowUser.Unfollow]: 'unfollowUser',
};
