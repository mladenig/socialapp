import { AuthService } from './../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.scss']
})
export class SingleCommentComponent implements OnInit {

  @Input() comment: any;
  @Output() delete: EventEmitter<number> = new EventEmitter();
  user;
  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  showUser() {
    this.router.navigate([`users/`, this.comment.user.id]);
  }

  getUser() {
    this.auth.loggedUser$.subscribe((data) => {
      this.user = data;
    });
  }
}
