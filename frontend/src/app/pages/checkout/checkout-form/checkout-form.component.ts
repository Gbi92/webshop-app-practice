import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../../models/country';
import { ApiService } from '../../../services/api-service/api.service';
import { Shipping } from '../../../models/shipping';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.scss',
})
export class CheckoutFormComponent implements OnInit {
  @Output() orderAdded: EventEmitter<string> = new EventEmitter();
  cartId = '';
  storedCartId = localStorage.getItem('cartId');
  checkoutForm!: FormGroup;
  countryList: Country[] = [];
  orderId = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cartId = this.storedCartId ? this.storedCartId : '';
  }

  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
      country: new FormControl('', Validators.required),
      firstname: new FormControl(''),
      lastname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      additional: new FormControl(''),
      city: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });
    this.apiService
      .getCountryList()
      .subscribe((countries) => (this.countryList = countries));
  }

  onSubmit() {
    const formValue = this.checkoutForm.value;
    const shippingDetails: Shipping = {
      lastName: formValue.lastname,
      firstName: formValue.firstName,
      zip: formValue.zip,
      city: formValue.city,
      street: formValue.address,
      countryId: formValue.country,
      phoneNumber: formValue.phone,
      additionalAddress: formValue.additional,
    };

    this.apiService.addOrder(this.cartId, shippingDetails).subscribe({
      next: (orderDetails) => {
        this.orderId = orderDetails.id;
        this.onOrderAdded();
        this.router.navigate([this.orderId, 'summary'], {
          relativeTo: this.route,
        });
      },
      // TODO
      error: (err) => console.log(err),
    });
  }

  onOrderAdded() {
    this.orderAdded.emit(this.orderId);
  }
}
