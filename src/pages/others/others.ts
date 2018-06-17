import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {profile} from "../../app/profile";

/**
 * Generated class for the AddskillPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
	selector: 'page-others',
	templateUrl: 'others.html',
})
export class OthersPage {
	jason = profile;
	others;
	constructor(public navCtrl: NavController, private nativePageTransitions: NativePageTransitions) {
  	this.others = this.jason.userAffiliation;
	}

	goBack() {
		this.nativePageTransitions.slide({direction: 'right'});
		this.navCtrl.pop();
	}

	goNext(index) {
		this.nativePageTransitions.fade({});
		this.navCtrl.push('EditotherPage', index);
	}
}
