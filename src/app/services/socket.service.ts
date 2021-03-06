
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';


@Injectable()
export class SocketService {
  private socket: any;

  constructor(private http: Http, options: RequestOptions) {
    if (environment.production) {
      this.socket = io();
    } else {
      this.socket = io('http://localhost:3000');
    }
  }

  public emit(event, message) {
    this.socket.emit(event, message);
  }

  public on = (event) => {
    return Observable.create((observer) => {
      this.socket.on(event, (message) => {
        observer.next(message);
      });
    });
  }
}
