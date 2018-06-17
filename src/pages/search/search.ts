import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  	constructor(public navCtrl: NavController, private nativePageTransitions: NativePageTransitions) {}

  	goNext(next) {
  		this.nativePageTransitions.fade({});
		this.navCtrl.push(next, 0);
	}
}
