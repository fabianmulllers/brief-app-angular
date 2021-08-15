import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducers } from './store/app.reducer';

import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http'

import { EffectsArray } from './store/effects'
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,

    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot( EffectsArray ),
    StoreModule.forRoot( appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
