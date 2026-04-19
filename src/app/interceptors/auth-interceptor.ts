import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authToken: any;

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>,
    next: HttpHandler):
    Observable<HttpEvent<unknown>> {
    // const token = this.auth.getToken();
    const token = this.authToken;

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            alert('Session Expired, Please login again!');
            this.router.navigate(['login'])
          }
        }
        return throwError(() => new Error('Some other error occured!'));
      })

    );
  }
}
