import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../models/country';
import { ApiService } from '../../services/api-service/api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  countryList: Country[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
      country: new FormControl('', Validators.required),
      firstname: new FormControl(''),
      lastname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      additional: new FormControl(''),
      city: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      phone: new FormControl(''),
    });
    this.apiService
      .getCountryList()
      .subscribe((countries) => (this.countryList = countries));
  }

  onSubmit() {}
}
