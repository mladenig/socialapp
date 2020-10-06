import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserRountingModule } from './user-routing.module';
import { UsersPageComponent } from './components/users-page/users-page.component';
import {UserUpdateComponent} from './components/user-update/user-update.component';
import {UserPageResolverService} from './components/user-page/user-page-resolver.service';
import { UserFollowersComponent } from './components/user-followers/user-followers.component';
import { UserFollowingComponent } from './components/user-following/user-following.component';
import {ConfirmDeleteComponent} from '../shared/components/confurm-delete/confirm-delete.component';

/**
 * Need improvement prepare for big data
 */
@NgModule({
  declarations: [
    UserInfoComponent,
    UserPageComponent,
    UsersPageComponent,
    ConfirmDeleteComponent,
    // UserFollowersComponent,
    // UserFollowingComponent,
  ],
  providers: [UserPageResolverService],
  imports: [SharedModule, CommonModule, UserRountingModule],
  entryComponents: [UserUpdateComponent, ConfirmDeleteComponent]
})
export class UsersModule {}
