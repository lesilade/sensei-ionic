import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {profile} from "../../app/profile";
import {EditeducationPage} from '../pages';

/**
 * Generated class for the AddskillPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
	selector: 'page-educations',
	templateUrl: 'educations.html',
})
export class EducationsPage {
	jason = profile;
	educations;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams, 
		private nativePageTransitions: NativePageTransitions) 
	{
		this.educations = this.jason.userEducation;
		  
		// this.educations = this.navParams.get("education");
		// console.log("this.education", this.educations);
	}

	goBack() {
		this.nativePageTransitions.slide({direction: 'right'});
		this.navCtrl.pop();
	}

	goEditeducationPage(educationToEdit) {
		this.nativePageTransitions.fade({});
		//this.navCtrl.push(EditeducationPage, {education: educationToEdit});
	}
}
