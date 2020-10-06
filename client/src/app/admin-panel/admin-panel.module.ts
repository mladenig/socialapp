import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPostsComponent } from './components/admin-posts/admin-posts.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminCommentsComponent } from './components/admin-comments/admin-comments.component';
import {SharedModule} from '../shared/shared.module';
import {AdminPanelRouting} from './admin-panel-routing.module';



@NgModule({
  declarations: [
    AdminPostsComponent,
    AdminUsersComponent,
    AdminCommentsComponent
  ],
  imports: [
    SharedModule, CommonModule, AdminPanelRouting
  ]
})
export class AdminPanelModule { }
