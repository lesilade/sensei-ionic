import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import {UserModel} from '../models/user.model';
import {CredentialsModel} from '../models/credentials.model';
import {UserActivateModel} from '../models/useractivate.model';
import {NewsFeedModel} from '../models/newsfeed.model';
import {CommentModel} from '../models/comment.model';

import *  as AppConfig from '../app/config';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  private cfg: any;
  error: string;
  jwtHelper = new JwtHelper();
  userEmail : string;
  id_token : string;
  contentHeader : Headers;
  baseUrl: string;
  private isLoggedIn = false;

  
  constructor(
    private storage: Storage,
    private http: Http,
   ) {
    this.cfg = AppConfig.cfg;
    //This is to call remote AWS api
    //this.baseUrl ='http://ec2-34-215-4-29.us-west-2.compute.amazonaws.com:8080';

    //This is for testing locally
    this.baseUrl = 'http://localhost:8080';
  }

  register(userData: UserModel) {
      this.http.post(this.baseUrl + this.cfg.auth.register, userData)
      .map(res => res.json())
      .subscribe(
        data => console.log("data", data),
        err => this.storage.set("register_error", "Error : " + err._body + " and Status: " + err.status)
      );
  }

  activate(userActivateModel: UserActivateModel) {
   console.log("userActivateModel", userActivateModel);
    this.http.post(this.baseUrl + this.cfg.auth.activate, userActivateModel)
      .map(res => res.json())
      .subscribe(
        data => console.log("activation data", data),
        err => this.storage.set("activate_error", "Error : " + err._body + " and Status: " + err.status)
      );
   }

    login(credentials: CredentialsModel) {

    credentials.rememberMe = true;
    return this.http.post(this.baseUrl + this.cfg.auth.login, credentials)
      .map(res => res.json());
  }


  logout() 
  {
    this.storage.remove('email');
    this.storage.remove('id_token');
    console.log("token removed from storage: ");
  }

  authenticated() : boolean {

    this.storage.get('id_token').then(id_token => {
      if (id_token === null) {
        console.log("authenticated from authservice id_token", id_token);
        this.isLoggedIn = false;
      }
      else{
        console.log("authenticated from authservice this.isLoggedIn", this.isLoggedIn);
        this.isLoggedIn = true;
      }
    })
    .catch(
      err => console.log(err)
    );
    return this.isLoggedIn;
  }

  isValid() {
    return tokenNotExpired();
  }

}
