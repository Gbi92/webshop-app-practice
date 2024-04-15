import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.isLoggedIn().pipe(
      take(1),
      exhaustMap((loggedIn) => {
        if (!loggedIn) {
          return next.handle(req);
        }
        const token = this.authService.getToken();
        const modifiedReq = req.clone({
          headers: req.headers.append('Authorization', `Bearer ${token}`),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
