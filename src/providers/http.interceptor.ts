import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs';
import { Storage } from '@ionic/storage';
import {Http, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

export class HttpInterceptor extends Http {
  constructor(connectionBackend: ConnectionBackend, requestOptions: RequestOptions, public storage: Storage) {
    super(connectionBackend, requestOptions);
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(
      this.getRequestOptionArgs(options)
    ).mergeMap((options) => {
      return super.get(url, options)
    });
  }

  public post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(
      this.getRequestOptionArgs(options)
    ).mergeMap((options) => {
      return super.post(url, body, options)
    })
  }

  public put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(
      this.getRequestOptionArgs(options)
    ).mergeMap((options) => {
      return super.put(url, body, options)
    })
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.fromPromise(
      this.getRequestOptionArgs(options)
    ).mergeMap((options) => {
      return super.delete(url, options)
    });
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs) {
    return this.storage.get('id_token').then((token) => {
      if (options == null) {
        options = new RequestOptions();
      }

      if (options.headers == null) {
        options.headers = new Headers();
      }

      if (token !== null) {
        options.headers.append('Authorization', 'Bearer ' + token);
       // console.log("token",token);
      }
      options.headers.append('Content-Type', 'application/json');

      //console.log("options",options);
      return options;
    });
  }
}