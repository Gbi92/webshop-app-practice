import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ApiService } from '../api-service/api.service';
import { UserData } from '../../models/userData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private apiService: ApiService, private router: Router) {}

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  // TODO: better error handling + put registration here too?
  login(loginDetails: UserData): void {
    this.apiService.login(loginDetails).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.isLoginSubject.next(true);
        this.router.navigate(['/']);
      },
      error: (err) => {
        throw new Error(err.message);
      },
    });
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
