import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificatorService } from './services/notificator.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      countDuplicates: true,
      closeButton: true,
    })
  ],
  providers: [NotificatorService, StorageService, AuthService, AuthGuard],
  exports: [HttpClientModule]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}
