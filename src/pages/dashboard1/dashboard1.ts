import { CoachingRequestModel } from './../../models/coaching-request.model';
import { CoachingService } from './../../providers/coaching-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {dashboards} from "../../app/profile";
import { Home1Page } from '../home1/home1';
import { RequestPage } from '../request/request';
import { MessagePage } from '../message/message';
import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';
import { Connections1Page, SenseiPage } from '../pages';

@Component({
  selector: 'page-dashboard1',
  templateUrl: 'dashboard1.html',
})
export class Dashboard1Page {
	pet;
	tabIndex;
  pendingDashboards;
  currentDashboard;
  request;
  requestCurrent;
  coach;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private nativePageTransitions: NativePageTransitions,
    private coachingService: CoachingService) 
    {
      this.coach = {pending: [], current: []};
    }

  handleCurrentDashboardSuccess(data: any)
  {
    this.currentDashboard = data;
    // populate coach dashboard for current session
     for(var i = 0; i < this.currentDashboard.length; i++)
     {
        this.coach.current.push(this.currentDashboard[i]);
      }
  }

  handleTraineePendingRequestSucess(data: any)
  {
     this.request = data;
     console.log("data: ", data) ;
  }

  handleTraineeCurrentRequestSessionSucess(data: any)
  {
    this.requestCurrent = data;
    console.log("data: ", data) ;
  }
  
  handlePendingDashboardSuccess(data: any)
  {
    this.pendingDashboards = data;
    console.log("this.pendingDashboards : ", this.pendingDashboards) ;
        //populate coach dashboard for pending request
        for(var i = 0; i < this.pendingDashboards.length; i++)
        { 
           this.coach.pending.push(this.pendingDashboards[i]);
        }
  }

  ionViewDidLoad(){

    console.log("Calling ionViewDidLoad");

    this.tabIndex = this.navParams.get('request');
    
//trainee request for pending 
 this.coachingService.getCurrentUserTraineePendingRequest()
.subscribe( 
data => this.handleTraineePendingRequestSucess(data),
err => console.log("Error getting request dashboard", err)
);

//trainee request for current 
this.coachingService.getCurrentUserTraineeRequestSession()
.subscribe( 
data => this.handleTraineeCurrentRequestSessionSucess(data),
err => console.log("Error getting request dashboard", err)
);


//get request for coach dashboard for pending request. 

this.coachingService.getCoachDashboardPending()
 .subscribe( 
data => this.handlePendingDashboardSuccess(data),
err => console.log("Error getting dashboard", err)
);


//get request for coach dashboard for current request. 
this.coachingService.getCoachDashboardCurrent()
.subscribe( 
data => this.handleCurrentDashboardSuccess(data),
err => console.log("Error getting dashboard", err)
);
   
  }

ionViewDidEnter() {
  

    if(this.tabIndex == 'request') {
      this.pet = 'request';
    } else {
      this.pet = 'coach';
    }
    this.tabIndex = '';
   
    //this.coach = {pending: [], current: []};
   }

 
  goHome(){
    this.nativePageTransitions.fade({});
		this.navCtrl.push(Home1Page);
  }

  goToRequest()
  {
    this.nativePageTransitions.fade({});
		this.navCtrl.push(RequestPage);
  }

  showRequest(requestData)
  {
    this.nativePageTransitions.fade({});
    this.navCtrl.push(SenseiPage, {request: requestData});
  }

  goToMessage()
  {
    this.nativePageTransitions.fade({});
		this.navCtrl.push(MessagePage);
  }
  goToSearch()
  {
    this.nativePageTransitions.fade({});
		this.navCtrl.push(SearchPage);
  }

  goToProfile()
  {
    this.nativePageTransitions.fade({});
		this.navCtrl.push(ProfilePage);
  }

  goToConnection()
  {
    this.nativePageTransitions.fade({});
		this.navCtrl.push(Connections1Page); 
  }

}
