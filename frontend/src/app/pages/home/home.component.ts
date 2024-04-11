import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';

import { ApiService } from '../../services/api-service/api.service';
import { News } from '../../models/news';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  news: News[] = [];
  imgBasePath = `${environment.apiUrl}/images/`;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getNews().subscribe((newsList) => (this.news = newsList));
  }
}
