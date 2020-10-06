import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../auth/auth.guard';
import {AdminPostsComponent} from './components/admin-posts/admin-posts.component';
import {AdminUsersComponent} from './components/admin-users/admin-users.component';
import {AdminCommentsComponent} from './components/admin-comments/admin-comments.component';
import {AdminGuard} from '../auth/admin.guard';

const adminRoutes: Routes = [

  {
    path: 'posts',
    // Need Admin guard
    canActivate: [AuthGuard, AdminGuard],
    component: AdminPostsComponent,
  },
  {
    path: 'users',
    // Need Admin guard
    canActivate: [AuthGuard, AdminGuard],
    component: AdminUsersComponent,
  },
  {
    path: 'comments',
    // Need Admin guard
    canActivate: [AuthGuard, AdminGuard],
    component: AdminCommentsComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(adminRoutes)]
})
export class AdminPanelRouting {}
