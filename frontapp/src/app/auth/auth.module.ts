import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import {RouterModule} from '@angular/router';
import { AUTH_ROUTES } from './auth.routing';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AUTH_ROUTES)
  ],
  declarations: [RegistrationComponent, LoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AuthModule { }
