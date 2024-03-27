import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { cartReducer } from './store/cart.reducer';
import { CartEffects } from './store/cart.effects';

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
