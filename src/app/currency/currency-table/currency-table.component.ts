import { Component, OnInit } from '@angular/core';

import { SocketService } from '../../services/socket.service';

import { CurrencyService } from '../currency.service';

import { Volabit } from '../volabit-response';
import { Bitso } from '../bitso-response';
import { Bitstamp } from '../bitstamp-response';
import { CurrencyDisplayView } from './currency-display-view';

@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.html',
  styleUrls: ['./currency-table.scss']
})
export class CurrencyTableComponent implements OnInit {

  public volabit: CurrencyDisplayView;
  public bitso: CurrencyDisplayView;
  public bitstamp: CurrencyDisplayView;
  private usdToMxnRate: number;

  constructor(private currencyService: CurrencyService, private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.on('update')
      .subscribe(() => {
        console.log('update by websocket');
        this.fetchData();
      });

    this.fetchData();
  }

  private getPercentage(bitstampUsdValue, anotherUsdValue): string {
    const difference: number = bitstampUsdValue - anotherUsdValue;
    const sign: string = difference > 0 ? '+' : '-';
    const percentage: number = (Math.abs(difference) / bitstampUsdValue) * 100;
    return sign + percentage;
  }

  private fillPercentage(counter: number) {
    if (counter === 3) {
      const bitstampValue = this.bitstamp.usdPrice;
      this.volabit.percentageVsBitstamp = this.getPercentage(bitstampValue, this.volabit.usdPrice);
      this.bitso.percentageVsBitstamp = this.getPercentage(bitstampValue, this.bitso.usdPrice);
    }
  }


  private transformFromUsdToMxn(dollar): number {
    return dollar * this.usdToMxnRate;
  }
  private transformFromMxnToUsd(Mxn): number {
    return Mxn / this.usdToMxnRate;
  }

  private fetchData() {
    let counter = 0;

    this.currencyService.getUsdValueInMxn()
      .subscribe(
      usd => {
        this.usdToMxnRate = usd.rates.MXN;
        this.currencyService.getVolabitInfo()
          .subscribe(
          info => {
            this.volabit = {
              mxnPrice: Number.parseFloat(info.btc_mxn_buy),
              usdPrice: Number.parseFloat(info.btc_usd_buy)
            };
            counter++;
            this.fillPercentage(counter);
          }, error => {
            console.log(error);
          });

        this.currencyService.getBitsoInfo()
          .subscribe(
          info => {
            this.bitso = {
              mxnPrice: Number.parseFloat(info.payload.bid),
              usdPrice: this.transformFromMxnToUsd(Number.parseFloat(info.payload.bid))
            };
            counter++;
            this.fillPercentage(counter);
          }, error => {
            console.log(error);
          });


        this.currencyService.getBitstampInfo()
          .subscribe(
          info => {
            this.bitstamp = {
              mxnPrice: this.transformFromMxnToUsd(Number.parseFloat(info.bid)),
              usdPrice: Number.parseFloat(info.bid)
            };
            counter++;
            this.fillPercentage(counter);
          }, error => {
            console.log(error);
          });
      }, error => {
        console.log(error);
      });
  }

}
