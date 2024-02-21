import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import {
  matPerson,
  matLock,
  matEmail,
} from '@ng-icons/material-icons/baseline';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NewsCardComponent,
    RegistrationComponent,
    SignupFormComponent,
    AlertComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({ matPerson, matLock, matEmail }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
