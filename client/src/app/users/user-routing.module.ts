import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import {UserPageResolverService} from './components/user-page/user-page-resolver.service';

const userRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: UsersPageComponent
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: UserPageComponent,
    resolve: { userInfo: UserPageResolverService }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(userRoutes)]
})
export class UserRountingModule {}
