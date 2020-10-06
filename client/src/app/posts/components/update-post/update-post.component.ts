import {
  Component,
  OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SinglePostWithCommentsDTO } from '../models/post-with-comments.dto';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  public postUpdateForm: FormGroup;
  public post: SinglePostWithCommentsDTO;

  constructor(private readonly fb: FormBuilder, public modalRef: BsModalRef) {}

  ngOnInit() {
    this.postUpdateForm = this.fb.group({
      title: [this.post.title, Validators.compose([Validators.minLength(6)])],
      description: [this.post.description, Validators.compose([Validators.maxLength(30)])],
      isPublic: [this.post.isPublic]
    });
  }

  public updatePost() {
    this.post = {
      id: this.post.id,
      ...this.postUpdateForm.value
    };

    this.modalRef.hide();
  }
}
