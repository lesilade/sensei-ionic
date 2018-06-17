import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {profile} from "../../app/profile";

/**
 * Generated class for the AddskillPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-editeducation',
  templateUrl: 'editeducation.html',
})
export class EditeducationPage {
	jason = profile;
  	education;
	constructor(public navCtrl: NavController, public navParams: NavParams, private nativePageTransitions: NativePageTransitions) {
		  //this.education = this.jason.userEducation[navParams.data];
		  
		  this.education = this.navParams.get("education");
		  console.log(" this.education", this.education);
	}

	goBack() {
		this.nativePageTransitions.slide({direction: 'right'});
	  	this.navCtrl.pop();
	}

	goNext() {
		this.nativePageTransitions.fade({});
	  	this.navCtrl.pop();
	}
}
