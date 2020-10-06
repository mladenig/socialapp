import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
    console.log("ggagagaga");
  }

  confirm() {
    if (this.bsModalRef.content.callback != null) {
      this.bsModalRef.content.callback('yes');
      this.bsModalRef.hide();
    }
  }

  decline() {
    if (this.bsModalRef.content.callback != null) {
      this.bsModalRef.content.callback('no');
      this.bsModalRef.hide();
    }
  }
}
