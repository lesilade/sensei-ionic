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
  selector: 'page-editexperience',
  templateUrl: 'editexperience.html',
})
export class EditexperiencePage {
	jason = profile;
  	userExp;
	constructor(public navCtrl: NavController, public navParams: NavParams, private nativePageTransitions: NativePageTransitions) {
	  	this.userExp = this.jason.userExperience[navParams.data];
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
