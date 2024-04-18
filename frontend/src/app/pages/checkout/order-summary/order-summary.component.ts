import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api-service/api.service';
import { OrderInfo } from '../../../models/order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent implements OnInit {
  orderId = '';
  currentOrder!: OrderInfo;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['orderId'];
    });
    this.apiService
      .getOrderDetails(this.orderId)
      .subscribe((order) => (this.currentOrder = order));
  }
}
