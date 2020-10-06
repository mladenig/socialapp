import { CommentsModule } from './../comments/comments.module';
import { PostsRountingModule } from './post-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { PostInfoComponent } from './components/post-info/post-info.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';



@NgModule({
  declarations: [AllPostsComponent, PostInfoComponent, CreatePostComponent, UpdatePostComponent],
  imports: [
    CommonModule, SharedModule, PostsRountingModule, CommentsModule
  ],
  entryComponents: [UpdatePostComponent]
})
export class PostsModule { }
