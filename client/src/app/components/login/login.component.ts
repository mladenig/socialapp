import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { NotificatorService } from '../../core/services/notificator.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserLoginDTO } from '../../users/models/user-login.dto';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly toastr: NotificatorService,
    private readonly fb: FormBuilder,
    public modalRef: BsModalRef,
  ) {
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)])
      ]
    });
  }

  public login(credentials?: UserLoginDTO) {
    this.authService.login(credentials || this.loginForm.value).subscribe(
      res => {
        this.toastr.success('Login successful');
        this.modalRef.hide();
      },
      err => {
        this.toastr.error('Wrong username or password');
      },
      () => this.modalRef.hide()
    );
  }
}
