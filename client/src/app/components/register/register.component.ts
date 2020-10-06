import { UsersService } from '../../users/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotificatorService } from '../../core/services/notificator.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ImageCroppedEvent, ImageCropperComponent} from 'ngx-image-cropper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * In progress to be replaced with user-update from shared components
 */
export class RegisterComponent {

  public registerForm: FormGroup;

  constructor(
    private readonly usersService: UsersService,
    private readonly toastr: NotificatorService,
    private readonly modalService: BsModalService,
    private readonly fb: FormBuilder,
    public modalRef: BsModalRef,

  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        email: ['', Validators.compose([Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        confirmPassword: ['', Validators.compose([Validators.required])]
      },
      {validator: this.MustMatch('password', 'confirmPassword')}
    );
  }

  public MustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public register() {
    const user = { ...this.registerForm.value };
    this.usersService.register(user).subscribe(
      () => this.toastr.success('Registered successfully'),
      e => {
        this.toastr.error('Registration failed');
      },
      () => {
         this.modalRef.hide();
      }
    );
  }
}
