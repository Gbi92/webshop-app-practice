import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth-service/auth-guard.service';
import { LoginGuard } from './services/login-guard.service';
import { OrderSummaryComponent } from './pages/checkout/order-summary/order-summary.component';
import { PaymentComponent } from './pages/checkout/payment/payment.component';
import { CheckoutFormComponent } from './pages/checkout/checkout-form/checkout-form.component';
import { CheckoutSuccessComponent } from './pages/checkout/checkout-success/checkout-success.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'register',
    canActivate: [LoginGuard],
    component: RegistrationComponent,
  },
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:productId', component: ProductComponent },
  {
    path: 'checkout',
    canActivateChild: [AuthGuard],
    component: CheckoutComponent,
    children: [
      { path: '', component: CheckoutFormComponent },
      { path: ':orderId/summary', component: OrderSummaryComponent },
      { path: ':orderId/payment', component: PaymentComponent },
      { path: ':orderId/success', component: CheckoutSuccessComponent },
    ],
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
