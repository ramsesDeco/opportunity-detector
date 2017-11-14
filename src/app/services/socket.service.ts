
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000';
  private socket: any;

  constructor(private http: Http, options: RequestOptions) {
    this.socket = io(this.url);
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
