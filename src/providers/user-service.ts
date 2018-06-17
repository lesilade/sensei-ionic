import { Observable } from 'rxjs/Observable';
import { Experience } from './../models/experience.model';
import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import {UserModel} from '../models/user.model';
import {CredentialsModel} from '../models/credentials.model';
import {UserActivateModel} from '../models/useractivate.model';
import {NewsFeedModel} from '../models/newsfeed.model';
import {CommentModel} from '../models/comment.model';
import {EducationModel} from '../models/education.model';

import *  as AppConfig from '../app/config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

  private cfg: any;
  error: string;
  jwtHelper = new JwtHelper();
  userEmail : string;
  id_token : string;
  baseUrl: string;
  
  constructor(
    private storage: Storage,
    private http: Http )
  {
    this.cfg = AppConfig.cfg;
    //this.baseUrl ='http://ec2-34-215-4-29.us-west-2.compute.amazonaws.com:8080';
    this.baseUrl = 'http://localhost:8080';

    this.storage.get('email').then(email => {
      if (email === null) {
      console.log("NewsfeedService : email is null");
      }
      else{
        this.userEmail = email;
    
      }
    })
    .catch(
      err => console.log("Error retrieving the token from the storage", err)
    );
  }

  addEducation(educationModel: EducationModel) 
  {
      console.log("educationModel: ", educationModel)
      return this.http.post(this.baseUrl + this.cfg.user.education, educationModel)
            .map((res:Response) => res.json())
            .catch((error: any) => Observable.throw(error.json()));
  }

  addExperience(experience: Experience)
  {
    experience.username = this.userEmail;
    console.log("educationModel: " , experience)
    return this.http.post(this.baseUrl + this.cfg.user.experience, experience)
          .map((res:Response) => res.json())
          .catch((error: any) => Observable.throw(error.json()));
  }

  getUserProfile()
  {
    let url:string = this.baseUrl + this.cfg.user.profile;
    return this.http.get(url)
              .map((res:Response) => res.json())
              .catch((error: any) => Observable.throw(error.json()));
    }

}
