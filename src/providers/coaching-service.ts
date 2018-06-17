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
import {SkillModel} from '../models/skill.model';
import {CoachingRequestModel} from '../models/coaching-request.model';
import {AvailabilityModel} from '../models/availability.model';
import {AddressModel} from '../models/address.model';
import {CoachingRequestResponseModel} from '../models/coachingresponse.model';
import {UserConnectionModel} from '../models/userconnection.model';
import {AuthService} from './auth-service';

import { Observable } from 'rxjs/Observable';

import *  as AppConfig from '../app/config';
import 'rxjs/add/operator/map';

@Injectable()
export class CoachingService {

  private cfg: any;
  error: string;
  jwtHelper = new JwtHelper();
  userEmail : string;
  id_token : string;
  contentHeader : Headers;
  newsfeed : NewsFeedModel;
  baseUrl: string;
  

  constructor(
    private storage: Storage,
    private http: Http,
    private authService: AuthService) {
    
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

  addSkill(skillData: SkillModel)
  {
        skillData.username = this.userEmail;
        let url = this.baseUrl + this.cfg.user.addSkill;
        return this.http.post(url, skillData)
        .map((res:Response) => res.json());
  }

  getSkills()
  {
    let url:string = this.baseUrl + this.cfg.user.skills;
     return this.http.get(url).map((res:Response) => res.json());
  }

  public getSomething():Observable<any> 
  {
    let url:string = this.baseUrl + this.cfg.user.skills;
    return this.http.get(url).map((res:Response) => res.json());
  }

  requestCoach(request: CoachingRequestModel)
  {
      let url = this.baseUrl + this.cfg.coaching.request;
      return this.http.post(url, request).map((res:Response) => res.json());
  }

  coachResponse(responseData: CoachingRequestResponseModel)
  {
      console.log("coaching responseData ", responseData);
      responseData.isAccepted = true;
      let url = this.baseUrl + this.cfg.coaching.coachResponse;
      return this.http.post(url, responseData, {headers: this.contentHeader})
      .map(res => res.json());
  }

  coachingAvailability(skillData: SkillModel, id: Number)
  {
    let request = this.populateAvailabilityData(id);
    let url = this.baseUrl + this.cfg.coaching.availabilities;
    return this.http.post(url, request)
    .map(res => res.json());
  }

  address(addressData: AddressModel) {
    let url = this.baseUrl + this.cfg.user.address
   
    this.http.post(url, addressData, {headers: this.contentHeader})
    .map(res => res.json())
    .subscribe(
      data => console.log("data", data),
      err => this.storage.set("register_error", "Error : " + err._body + " and Status: " + err.status)
    );
  }

  getCoachDashboardPending()
  {
     let url = this.baseUrl + this.cfg.dashboard.coachPending;
     return this.http.get(url).map((res : Response) => res.json());
  }

  getCoachDashboardCurrent()
  {
     let url = this.baseUrl + this.cfg.dashboard.coachCurrent;
     return this.http.get(url).map((res : Response) => res.json());
  }

  getCurrentUserTraineePendingRequest()
  {
     let url = this.baseUrl + this.cfg.dashboard.coachrequestPending;
     return this.http.get(url).map((res : Response) => res.json());
  }

  getCurrentUserTraineeRequestSession()
  {
     let url = this.baseUrl + this.cfg.dashboard.coachrequestCurrent;
     return this.http.get(url).map((res : Response) => res.json());
  }

  getCoachingConnections()
  {
    let url = this.baseUrl + this.cfg.connections.connection;
    return this.http.get(url).map((res : Response) => res.json());
  }

  postUserConnection(userConnectionModel: UserConnectionModel) {
   let url = this.baseUrl + this.cfg.connections.follow;
   return this.http.post(url, userConnectionModel).map((res : Response) => res.json());

  }

  blockUserConnection(userConnectionModel: UserConnectionModel) {
    let url = this.baseUrl + this.cfg.connections.block;
    return this.http.post(url, userConnectionModel).map(res => res.json());
    
  }

  unfollowUserConnection(userConnectionModel: UserConnectionModel)
  {
    let url = this.baseUrl + this.cfg.connections.unfollow;
    return this.http.post(url, userConnectionModel).map(res => res.json());
  }

  getUserConnectionFollowing()
  {
     let url = this.baseUrl + this.cfg.connections.following;
     return this.http.get(url).map((res : Response) => res.json());
  }

  getUserConnectionFollowers()
  {
    let url = this.baseUrl + this.cfg.connections.followers;
     return this.http.get(url).map((res : Response) => res.json());
  }


  populateAvailabilityData(id: Number)
  {
    let availability = new AvailabilityModel();
    //availability.coachRequestId = id;
    availability.day = 'Monday'
    availability.timeofday = 'Morning';
    availability.username = this.userEmail;

    let availability2 = new AvailabilityModel();
    //availability.coachRequestId = id;
    availability2.day = 'Wednesday'
    availability2.timeofday = 'Afternoon';
    availability2.username = this.userEmail;
   
    let availabilitys = [];
    availabilitys.push(availability)
    availabilitys.push(availability2)

    console.log("requestData.availabilities: ", availabilitys);

    return availabilitys;
  }

  populateDummyRequestData()
  {
      let requestData = new CoachingRequestModel();
      requestData.closeBy = true;
      requestData.description = "Looking to learn HTML 5";
      requestData.duration = 3;
      requestData.inNetwork = true;
      requestData.industry = 'Software';
      requestData.subtopic = 'HTML 5';
      requestData.topic = 'HTML 5'; 
      requestData.username = this.userEmail;
    
     return requestData;
  }
}
