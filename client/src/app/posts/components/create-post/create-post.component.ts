import { NotificatorService } from './../../../core/services/notificator.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PostsService } from '../../posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @ViewChild(ImageCropperComponent, { static: true }) imageCropper: ImageCropperComponent;

  /* FOR IMAGE CROPPER */
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public croppedImageClean: any = '';
  public showCropper = false;

  public postCreationForm: FormGroup;
  public isPrivate = false;

  constructor(
    private readonly postsService: PostsService,
    private readonly toastr: NotificatorService,
    private readonly fb: FormBuilder,
    public modalRef: BsModalRef,
  ) {
    this.postCreationForm = this.fb.group(
      {
        title: ['', Validators.compose([Validators.minLength(6)])],
        description: ['', Validators.compose([Validators.maxLength(30)])],
        isPublic: [true]
      },
    );
  }

  ngOnInit() {
  }

  public createPost() {
    const { title, description, isPublic } = this.postCreationForm.value;
    const post = { title, description, img: this.croppedImageClean, isPublic };

    this.postsService.createPost(post).subscribe(
      () => this.toastr.success('Post created successfully'),
      e => {
        this.toastr.error(e.error.error);
      },
      () => {
         this.modalRef.hide();
      }
    );
  }

  fileChangeEvent(event: any): void {
    const file = event.srcElement.files[0];
    if (!file || !(/image\/(gif|jpg|jpeg|png)$/i).test(file.type) || file.size > 2000000 ) {
      this.toastr.error('File type/size invalid!');
      return;
    }
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedImageClean = event.base64.replace('data:image/png;base64,', '');
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady() {
    console.log('Cropper ready');
  }

  loadImageFailed() {
    console.log('Load failed');
  }
}
