import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-all-comments',
  templateUrl: './all-comments.component.html',
  styleUrls: ['./all-comments.component.scss']
})
export class AllCommentsComponent implements OnInit {

 @Input() comments;

  constructor(
  ) { }

  ngOnInit() {
  }
}
