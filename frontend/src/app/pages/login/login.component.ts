import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin() {
    this.apiService.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      error: (err) => (this.errorMessage = err.error),
    });
  }

  onHandleError() {
    this.errorMessage = '';
  }
}
