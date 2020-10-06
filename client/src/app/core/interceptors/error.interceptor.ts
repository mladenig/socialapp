import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificatorService } from '../services/notificator.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  public constructor(
    private readonly router: Router,
    private readonly toastr: NotificatorService,
  ) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error.status === 404) {
          this.router.navigate(['/not-found']);
          this.toastr.error('Resource not found!');
        } else if (error.status >= 500) {
          this.router.navigate(['/server-error']);
          this.toastr.error('Oops.. something went wrong.. :(');
        }
        return throwError(error);
      })
    );
  }
}
