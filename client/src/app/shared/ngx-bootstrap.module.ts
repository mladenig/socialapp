import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot()
  ],
  exports: [
    ModalModule,
    TabsModule,
    PaginationModule
  ]

})
export class NgxBootstrapModule { }
