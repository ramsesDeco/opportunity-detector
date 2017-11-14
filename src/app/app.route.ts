import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrencyTableComponent } from './currency/currency-table/currency-table.component';

const routes: Routes = [
  { path: '', component: CurrencyTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
