import { UserService } from './../../providers/user-service';
import { CoachingRequestResponseModel } from './../../models/coachingresponse.model';
import { CoachingService } from './../../providers/coaching-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {Connections1Page, Home1Page, RequestPage, Dashboard1Page} from '../pages';

/**
 * Generated class for the RequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-sensei',
  templateUrl: 'sensei.html',
})
export class SenseiPage {
	request;
	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		private nativePageTransitions: NativePageTransitions,
		private coachingService: CoachingService,
		private userService: UserService,
		private alertCtrl: AlertController)
		{
			this.request = this.navParams.get("request");
			console.log("this.request", this.request);

		}

	// goNext(next) {
	// 	if(next == 'Dashboard1Page') {
	// 		this.nativePageTransitions.slide({direction: 'right'});
	// 	} else {
	// 		this.nativePageTransitions.fade({});
	// 	}
	// 	this.navCtrl.push(next, 0);
	// }

	accept()
	{
		   console.log("Accepted");
		   
		   let response = new CoachingRequestResponseModel();
		   response.isAccepted = true;
		   response.username = this.coachingService.userEmail;
		   response.coachingRequestId = this.request.caochingRequest.id;

		   let coachResponse = this.coachingService.coachResponse(response)
		   coachResponse.subscribe( 
		    data => this.handleAcceptSuccess(data),
		   err => this.handleAcceptError(err)
		  )
		  
	}

	handleAcceptSuccess(data: any)
	{
		console.log("accept data: ", data)
		this.goToDashboard();
	}

	handleAcceptError(err: any)
	{
		let errorMessage = err.headers.get("x-senseiapp-error");
		console.log(errorMessage);
		this.presentAlert(errorMessage);

	}

	presentAlert(message: any) {
		let alert = this.alertCtrl.create({
			title: 'Error',
			message: message,
			buttons: [
			  {
				text: 'OK',
				handler: () => {
				  console.log('Error Message', message);
				  this.goToDashboard();
				}
			  }
			]
		  });
		  alert.present();
	  }

	decline()
	{
		console.log("Declined");
		let response = new CoachingRequestResponseModel();
		response.isAccepted = false;
		response.username = this.coachingService.userEmail;
		response.coachingRequestId = this.request.caochingRequest.id;

		let coachResponse = this.coachingService.coachResponse(response)
		coachResponse.subscribe( 
		 data => this.handleDeclineSuccess(data),
		err => this.handleDeclinetError(err)
	   )
	}

	handleDeclineSuccess(data: any)
	{
		console.log("decline data :", data)
		this.goToDashboard(); 
	}
	handleDeclinetError(error: any)
	{
		console.log("decline erro :", error)
	}

	goToConnection()
	{
	  this.nativePageTransitions.fade({});
		  this.navCtrl.push(Connections1Page); 
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

	  goToDashboard() 
	  {
		  this.nativePageTransitions.fade({});
		  this.navCtrl.push(Dashboard1Page);
	  }
	
}
