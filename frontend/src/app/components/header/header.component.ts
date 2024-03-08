import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingService } from '../../services/shopping-service/shopping.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartCounter = 0;
  private addedOneSub!: Subscription;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.addedOneSub = this.shoppingService.addedPlusOneEmitter.subscribe(
      (addedOne) => {
        if (addedOne) this.cartCounter++;
      }
    );
  }

  ngOnDestroy(): void {
    this.addedOneSub.unsubscribe();
  }
}
