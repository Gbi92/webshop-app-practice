import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../../services/api-service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderInfo } from '../../../models/order';
import { Store } from '@ngrx/store';
import { CartActions } from '../../../store/cart/cart.actions';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  isChecked$ = new BehaviorSubject(false);
  orderId = '';
  currentOrder!: OrderInfo;
  errorMessage = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['orderId'];
    });
    this.apiService
      .getOrderDetails(this.orderId)
      .subscribe((order) => (this.currentOrder = order));
  }

  toggleChecked() {
    this.isChecked$.next(!this.isChecked$.value);
  }

  pay() {
    const cartId = localStorage.getItem('cartId') ?? '';
    this.apiService.finalizeOrder(this.orderId).subscribe({
      next: () => {
        this.router.navigate([this.orderId, 'success'], {
          relativeTo: this.route.parent,
        });
        this.store.dispatch(CartActions.emptyCart({ cartId: cartId }));
      },
      error: (err) => (this.errorMessage = err.error),
    });
  }

  onHandleError() {
    this.errorMessage = '';
  }
}
