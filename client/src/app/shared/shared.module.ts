import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxBootstrapModule } from './ngx-bootstrap.module';
import {FollowUnfollowUserComponent} from './components/follow-unfollow-user/follow-unfollow-user.component';
import {UserPreviewComponent} from './components/user-preview/user-preview.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {UserUpdateComponent} from '../users/components/user-update/user-update.component';
import {SinglePostComponent} from './components/single-post/single-post.component';
import {SmallFollowUnfollowUserComponent} from './components/small-follow-unfollow-user/small-follow-unfollow-user.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {ConfirmDeleteComponent} from './components/confurm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    FollowUnfollowUserComponent,
    UserPreviewComponent,
    UserUpdateComponent,
    SinglePostComponent,
    SmallFollowUnfollowUserComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxBootstrapModule,
    ImageCropperModule,
    AngularFontAwesomeModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxBootstrapModule,
    ImageCropperModule,
    AngularFontAwesomeModule,
    FollowUnfollowUserComponent,
    UserPreviewComponent,
    FollowUnfollowUserComponent,
    SmallFollowUnfollowUserComponent,
    UserUpdateComponent,
    SinglePostComponent,
    PaginationComponent,
  ]
})
export class SharedModule {}
