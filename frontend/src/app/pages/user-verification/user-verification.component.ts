import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrl: './user-verification.component.scss',
})
export class UserVerificationComponent implements OnInit {
  isLoading = true;
  userId = '';
  userToken = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queries: any) => {
      this.userId = queries.params.user_id;
      this.userToken = queries.params.verification_token;
    });
    this.apiService.verifyEmail(this.userId, this.userToken).subscribe({
      next: (res) => (this.isLoading = false),
      error: (err) => console.log(err),
    });
  }
}
