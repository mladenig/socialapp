import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../users.service';
import {NotificatorService} from '../../../core/services/notificator.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ShowFullUserDTO} from '../../models/show-full-user.dto';
import {ShowUserDTO} from '../../models/show-user.dto';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

 /* FOR IMAGE CROPPER */
  public imageChangedEvent: string;
  public croppedImage: string;
  public croppedImageClean: string;
  public showCropper = false;

  public userForm: FormGroup;
  public user: ShowUserDTO;
  public position: string;
  public setPosition: string;

  constructor(
    private readonly usersService: UsersService,
    private readonly toastr: NotificatorService,
    private readonly fb: FormBuilder,
    public modalRef: BsModalRef,
  ) {
  }

  ngOnInit() {
    this.userForm = this.fb.group(
      {
        email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
        bio: [this.user.bio, Validators.compose([Validators.maxLength(2000)])]
      });
    this.usersService.getUsersPositions().subscribe(
      position => this.position = position
    );
  }

  public uploadUser() {
    this.user = {
      ...this.userForm.value,
      position: this.setPosition,
      profilePic: this.croppedImageClean
    };
    if (this.croppedImage) {
      this.user.profilePic = this.croppedImageClean;
    }
    this.modalRef.hide();
  }

  changePosition(e) {
    this.setPosition = e.target.value;
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
    this.toastr.success('Image loaded');
  }

  cropperReady() {
    console.log('Cropper ready');
  }

  loadImageFailed() {
    console.log('Load failed');
  }
}
