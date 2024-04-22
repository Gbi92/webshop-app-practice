import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import {
  matPerson,
  matLock,
  matEmail,
  matClose,
  matArrowBackIos,
  matAdd,
  matRemove,
} from '@ng-icons/material-icons/baseline';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptorService } from './services/auth-service/auth-interceptor.service';
import { cartReducer } from './store/cart/cart.reducer';
import { CartEffects } from './store/cart/cart.effects';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './pages/login/login.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CheckoutFormComponent } from './pages/checkout/checkout-form/checkout-form.component';
import { OrderSummaryComponent } from './pages/checkout/order-summary/order-summary.component';
import { PaymentComponent } from './pages/checkout/payment/payment.component';
import { TrimDirective } from './directives/trim.directive';
import { CheckoutSuccessComponent } from './pages/checkout/checkout-success/checkout-success.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RegistrationComponent,
    SignupFormComponent,
    AlertComponent,
    LoginComponent,
    ShopComponent,
    ProductCardComponent,
    CartComponent,
    ProductComponent,
    CheckoutComponent,
    PageNotFoundComponent,
    CheckoutFormComponent,
    OrderSummaryComponent,
    PaymentComponent,
    TrimDirective,
    CheckoutSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      matPerson,
      matLock,
      matEmail,
      matClose,
      matArrowBackIos,
      matAdd,
      matRemove,
    }),
    StoreModule.forRoot({
      cart: cartReducer,
    }),
    EffectsModule.forRoot([CartEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
