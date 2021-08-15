import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EffectsArray } from './store/effects/index';
import { authReducer } from './store/reducers/auth.reducer';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature( EffectsArray ),
    StoreModule.forFeature(  'auth', authReducer ),
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
