import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { AllCommentsComponent } from './components/all-comments/all-comments.component';
import { CommentsService } from './comments.service';
import { SingleCommentComponent } from './components/single-comment/single-comment.component';

@NgModule({
  declarations: [
    PostCommentComponent,
    AllCommentsComponent,
    SingleCommentComponent
  ],
  imports: [CommonModule, SharedModule],
  exports: [PostCommentComponent, AllCommentsComponent, SingleCommentComponent],
  providers: [CommentsService]
})
export class CommentsModule {}
