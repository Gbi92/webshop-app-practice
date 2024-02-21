import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment.development';
import { NewsList } from '../models/news';
import { Observable } from 'rxjs';
import { UserData } from '../models/userData';
import { LoginResponse, RegistrationResponse } from './api.service.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private basePath = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsList> {
    return this.http.get<NewsList>(`${this.basePath}/news`);
  }

  register(userData: UserData): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.basePath}/register`, {
      name: userData.username,
      email: userData.email,
      password: userData.password,
    });
  }

  login(userData: UserData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.basePath}/login`, {
      email: userData.email,
      password: userData.password,
    });
  }
}
