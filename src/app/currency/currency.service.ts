import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Volabit } from './volabit-response';
import { Bitso } from './bitso-response';
import { Bitstamp } from './bitstamp-response';
import { DollarExchange } from './from-usd-to-mxn';


@Injectable()
export class CurrencyService {

  constructor(private http: Http, options: RequestOptions) {

  }

  public getVolabitInfo(): Observable<Volabit> {
    return this.http
      .get('https://www.volabit.com/api/v1/tickers')
      .map(response => response.json() as Volabit)
      .catch(this.handleError);
  }

  public getBitsoInfo(): Observable<Bitso> {
    return this.http
      .get('https://api.bitso.com/v3/ticker/?book=btc_mxn')
      .map(response => response.json() as Bitso)
      .catch(this.handleError);
  }


  public getBitstampInfo(): Observable<Bitstamp> {
    return this.http
      .get('https://www.bitstamp.net/api/ticker')
      .map(response => response.json() as Bitstamp)
      .catch(this.handleError);
  }

  public getUsdValueInMxn(): Observable<DollarExchange> {
    return this.http
      .get('http://api.fixer.io/latest?base=USD&symbols=MXN')
      .map(response => response.json() as DollarExchange)
      .catch(this.handleError);
  }


  private handleError(error: Response | any) {
    return Observable.throw(error.message || 'Server error');
  }

}
