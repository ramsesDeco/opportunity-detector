import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.route';

import { SocketService } from './services/socket.service';

import { CurrencyService } from './currency/currency.service';
import { CurrencyTableComponent } from './currency/currency-table/currency-table.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    CurrencyTableComponent
  ],
  providers: [
    SocketService,
    CurrencyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
