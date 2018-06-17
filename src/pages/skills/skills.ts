import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {profile} from "../../app/profile";
import {SkillModel} from '../../models/skill.model';
import {CoachingService} from '../../providers/coaching-service';
import {AddressModel} from '../../models/address.model';
import {CoachingRequestResponseModel} from '../../models/coachingresponse.model';
import {UserConnectionModel} from '../../models/userconnection.model';
import {Storage} from '@ionic/storage';
import {ProfilePage} from '../pages';

/**
 * Generated class for the AddskillPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
	selector: 'page-skills',
	templateUrl: 'skills.html',
})
export class SkillsPage {
	jason = profile;
	userSkills = [];
	allSkills : any[];
	private skillData: FormGroup;
	constructor(
		public navCtrl: NavController,
		public formBuilder: FormBuilder,
		private nativePageTransitions: NativePageTransitions,
		private coachingService: CoachingService,
		public storage: Storage
	)
	{
		this.skillData = this.formBuilder.group({
			name: ['']
		});


		this.coachingService.getSkills()
		.subscribe(
			data => this.passData(data),
			err => console.log("error getting all newsfeed", err)
			);


	}

    passData(data: any)
    {
		this.allSkills = data ;
		console.log("allSkills: ", this.allSkills)
		for(let i = 0; i < this.allSkills.length; i++)
		{
		 	this.userSkills.push(this.allSkills[i].name);
		}
    }

	addSkill()
	{

		//Adding skill
		
		  let addSkillResponse = this.coachingService.addSkill(this.skillData.value)
		  addSkillResponse.subscribe( 
		    data => 	this.userSkills.push(data.name),
		    err => console.log("Error while adding skill", err)
		  );

	 
			 
			 //post connection following
			 //let follow = this.coachingService.postUserConnection(this.getUserConnectionDummyData())

				 		
		//test adding address
		//this.coachingService.address(this.getDummyAddressData());
	}

	removeSKill(skill,index)
	{
		this.userSkills.splice(index,1);
		console.log("this.userSkills: ", this.userSkills);
	}

	displayConnections(data: any)
	{
		for(let i = 0; i < data.length; i++)
		{
		  console.log("User Coaching Connections:", data[i])
		}
	}

	addTraineeAvailabilityData(data : any)
	{
		let coachingAvailabilityResponse = this.coachingService.coachingAvailability(this.skillData.value, data.id)
		coachingAvailabilityResponse.subscribe( 
		  data => console.log("Coach ", data),
		  err => console.log("Error while adding skill", err)
		);
	}

	displayCoachRequestDashboard(data: any)
	{
	  for(let i = 0; i < data.length; i++)
	  {
		console.log("Coaching Request:", data[i])
	  }
	}

	displayDashboard(data: any)
	{
	  for(let i = 0; i < data.length; i++)
	  {
		  if(data[i].status === 'pending')
		  {
			console.log("Pending :", data[i])
		  }
		  else if(data[i].status === 'accept'){
			console.log("Current Session :", data[i])
		 }
	  }
	}

	displayFollowing(data: any)
	{
	  for(let i = 0; i < data.length; i++)
	  {
			console.log("User Following :", data[i])
	  }
	}


	displayFollowers(data: any)
	{
	  for(let i = 0; i < data.length; i++)
	  {
			console.log("User Followers :", data[i])
	  }
	}

	 getUserConnectionDummyData()
	 {
		 let obj = new UserConnectionModel();

		 obj.connectionUsername = 'surrytt@gmail.com';

		 return obj;
	 }
	
	  getDummyAddressData()
    {
      let address = new AddressModel();

      address.addressLine1 = '133 Maint St';
      address.addressLine2 = 'Apt 1450';
      address.city = 'Overland Park';
      address.country = 'US';
      address.state = 'Kansas';
      address.zipcode = '66213';
      address.username = 'surrytt@gmail.com';

      return address;
	}
	
	getDummyCoachingRequestResponseData()
    {
      let coachingRequestResponse = new CoachingRequestResponseModel();

	  coachingRequestResponse.coachingRequestId = 10;
	  coachingRequestResponse.username = "balaraje2@gmail.com";
	  coachingRequestResponse.isAccepted = true;

      return coachingRequestResponse;
    }

	goToProfile() 
	{
		this.nativePageTransitions.fade({});
		this.navCtrl.push(ProfilePage);
	}
}

