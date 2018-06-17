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
import {LikeModel} from '../models/like.model';

import *  as AppConfig from '../app/config';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewsFeedService {

  private cfg: any;
  error: string;
  jwtHelper = new JwtHelper();
  userEmail : string;
  userImageUrl: string;
  id_token : string;
  contentHeader : Headers;
  newsfeed : NewsFeedModel;
  feeds: any = {};
  baseUrl: string;

  constructor(
    private storage: Storage,
    private http: Http
    ) {
    this.cfg = AppConfig.cfg;
    //this.baseUrl ='http://ec2-34-215-4-29.us-west-2.compute.amazonaws.com:8080';
    this.baseUrl = 'http://localhost:8080';

    this.storage.get('id_token').then(id_token => {
      if (id_token === null) {
      console.log("NewsfeedService : id_token is null");
      }
      else{
      
      console.log("NewsfeedService : id_token is ", id_token);
      this.contentHeader = new Headers({"Authorization": "Bearer " + id_token});
      let userProfile = this.jwtHelper.decodeToken(id_token);
      this.userEmail = userProfile.email;
      this.userImageUrl = userProfile.imageUrl;
      }
    })
    .catch(
      err => console.log("Error retrieving the token from the storage", err)
    );

    }

  postFeed(postData: NewsFeedModel)
  {
       postData.imageUrl = this.userImageUrl;
       postData.login = this.userEmail;
       let url = this.baseUrl + this.cfg.newsfeed.postNewsFeed;
      
      return this.http.post(url, postData).map((res:Response) => res.json());
  }

  postFeedComment(commentData: CommentModel, newsFeedId: Number)
  {
        commentData.newsfeedId = newsFeedId;
        let url = this.baseUrl + this.cfg.newsfeed.comment;
        return this.http.post(url, commentData).map((res:Response) => res.json());
  }

  postFeedLike(likeData: LikeModel)
  {
        return this.http.post(this.baseUrl + this.cfg.newsfeed.likes, likeData)
        .map((res:Response) => res.json());
  
  }

  getNewsFeeds()
  {
     let url:string = this.baseUrl + this.cfg.newsfeed.allNewsFeed;
     return this.http.get(url).map((res:Response) => res.json());
  }

}
