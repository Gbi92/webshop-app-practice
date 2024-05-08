import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { ApiService } from '../api-service/api.service';
import { UserData } from '../../models/userData';
import { LoginResponse } from '../api-service/api.service.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private apiService: ApiService, private router: Router) {}

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  login(loginDetails: UserData): Observable<LoginResponse> {
    return this.apiService.login(loginDetails).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        this.isLoginSubject.next(true);
        this.router.navigate(['/']);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
    this.router.navigate(['/']);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
