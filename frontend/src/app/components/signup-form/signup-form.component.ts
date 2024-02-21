import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      }),
      acceptTerms: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    this.apiService.register(this.signupForm.value.userData).subscribe({
      next: (res) => this.router.navigate(['/login']),
      error: (err) => (this.errorMessage = err.error),
    });

    this.signupForm.reset();
  }

  onHandleError() {
    this.errorMessage = '';
  }
}
