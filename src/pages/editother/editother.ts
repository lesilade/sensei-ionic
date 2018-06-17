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
  selector: 'page-editother',
  templateUrl: 'editother.html',
})
export class EditotherPage {
	jason = profile;
  	affiliation;
	constructor(public navCtrl: NavController, public navParams: NavParams, private nativePageTransitions: NativePageTransitions) {
	  	this.affiliation = this.jason.userAffiliation[navParams.data];
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
