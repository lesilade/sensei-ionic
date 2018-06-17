import { CoachingService } from './../../providers/coaching-service';
import { AvailabilityModel } from './../../models/availability.model';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthService } from './../../providers/auth-service';
import { CoachingRequestModel } from './../../models/coaching-request.model';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {Home1Page, Dashboard1Page} from '../pages';


@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {
		requestForm : FormGroup;
		private loading : any;
		requestData: any;
  	constructor(
			private navCtrl: NavController, 
			private nativePageTransitions: NativePageTransitions,
			private formBuilder: FormBuilder,
			private authService: AuthService,
			private coachingService: CoachingService,
			private _loadingCtrl: LoadingController) 
			{
				this.requestForm = this.formBuilder.group({
				   closeBy: [true],
					 description: ['', Validators.required],
					 duration:['1'],
					 inNetwork: [true],
					 industry: ['', Validators.required],
					 subtopic: ['', Validators.required],
					 topic: ['', Validators.required],
				 });
			}

	
		submitRequest()
		{
			console.log("this.requestForm: ", this.requestForm.value);

			this.loading = this._loadingCtrl.create({
				content: 'Searching for coach...'
			});
		 this.loading.present();
			
			let coachingRequest = this.populateRequestData(this.requestForm.value);
									this.coachingService.requestCoach(coachingRequest)
									.subscribe( 
									  data =>this.handleSuccess(data),
										err => this.handleLoginError(err)
									)
		}

		handleLoginError(error: any)
		{
			console.log("err", error);
		}
 
		handleSuccess(data: any) 
		{ 
			this.loading.dismiss();
			this.requestData = data;
			console.log("Coaching request response", data);

			this.goToDashboard();
		 }


		goToDashboard() 
		{
			this.nativePageTransitions.fade({});
            let coachingRequest = this.requestData;
			this.navCtrl.push(Dashboard1Page, {request: 'request',  coachingRequest: coachingRequest});
		}
	  
	  goHome()
	  {
			this.nativePageTransitions.fade({});
			this.navCtrl.push(Home1Page);
	   }

		populateRequestData(formData: any)
		{
				let requestData = new CoachingRequestModel();
				requestData.closeBy = formData.closeBy;
				requestData.description = formData.description;
				requestData.duration = formData.duration;
				requestData.inNetwork = formData.inNetwork;
				requestData.industry = formData.industry;
				requestData.subtopic = formData.subtopic;
				requestData.topic = formData.topic;
				requestData.username = this.authService.userEmail;
			
			 return requestData;
		}
}
