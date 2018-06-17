import { Experience } from './../../models/experience.model';
import { EditexperiencePage } from './../editexperience/editexperience';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {profile} from "../../app/profile";
import { AddexperiencePage } from '../pages';
import { UserService } from '../../providers/user-service';

/**
 * Generated class for the AddskillPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
	selector: 'page-experiences',
	templateUrl: 'experiences.html',
})
export class ExperiencesPage {
	jason = profile;
	userExp;
	experiences : Experience[];
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,  
		private nativePageTransitions: NativePageTransitions,
	    private userService: UserService ) {
		//this.userExp = this.jason.userExperience;
			  		  
		 this.experiences = this.navParams.get("experiences");
		 console.log("this.userExp", this.experiences);

		 this.userExp = this.navParams.get("experience");
		 console.log("this.userExp", this.userExp);

		 if(this.userExp)
		 {
			this.experiences.push(this.userExp);
		 }
	  }
	  

	goBack() {
    	this.nativePageTransitions.slide({direction: 'right'});
		this.navCtrl.pop();
	}

	goNext() {
    	this.nativePageTransitions.fade({});
		this.navCtrl.push(EditexperiencePage);
	}

	goToAddExperience()
	{
		this.navCtrl.push(AddexperiencePage);
	}
}
