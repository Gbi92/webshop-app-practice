import { Component } from '@angular/core';
import { ShopComponent } from './pages/shop/shop.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  cartItemCounter = 0;

  onShopPageActivation(component: any) {
    if (component instanceof ShopComponent) {
      component.cartIncreased.subscribe((cartItemCount) => {
        this.cartItemCounter = cartItemCount;
      });
    }
  }
}
