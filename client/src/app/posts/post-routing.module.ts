import { PostInfoResolverService } from './components/post-info/post-info.resolver';
import { PostInfoComponent } from './components/post-info/post-info.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../auth/auth.guard';

const postRoutes: Routes = [
  {
    path: '',
    component: AllPostsComponent
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: PostInfoComponent,
    resolve: { postInfo: PostInfoResolverService }
  },
  {
    path: 'createpost',
    canActivate: [AuthGuard],
    component: CreatePostComponent
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(postRoutes)]
})
export class PostsRountingModule {}
