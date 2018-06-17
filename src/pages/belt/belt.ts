import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {belts} from "../../app/profile";
import { Home1Page } from '../home1/home1';

/**
 * Generated class for the BeltPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  	selector: 'page-belt',
  	templateUrl: 'belt.html',
})
export class BeltPage {
	belts = belts;
	constructor(public navCtrl: NavController, private nativePageTransitions: NativePageTransitions) {}

	goBack() {
		this.nativePageTransitions.slide({direction: 'right'});
		this.navCtrl.push(Home1Page);
	}
}
