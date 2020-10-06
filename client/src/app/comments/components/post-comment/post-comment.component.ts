import { ActivatedRoute } from '@angular/router';
import { CommentsService } from './../../comments.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificatorService } from '../../../core/services/notificator.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @ViewChild('textArea', { static: true }) public textArea: ElementRef;
  public commentCreationForm: FormGroup;
  public postId;

  @Output() public submitComment: EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly commentsService: CommentsService,
    private readonly toastr: NotificatorService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
  ) {
    this.commentCreationForm = this.fb.group({
      comment: [
        '',
        Validators.compose([Validators.required, Validators.minLength(4)])
      ]
    });
  }

  ngOnInit() {
    this.getPostId();
  }

  public getPostId() {
    this.postId = +this.route.snapshot.params[`id`];
  }

  postComment() {
    if (this.commentCreationForm.valid) {
      this.submitComment.emit(this.commentCreationForm.value);
      this.commentCreationForm.reset();
      this.textArea.nativeElement.blur();
    }
  }
}
