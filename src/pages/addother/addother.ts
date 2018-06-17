import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';

/**
 * Generated class for the AddskillPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-addother',
  templateUrl: 'addother.html',
})
export class AddotherPage {
  constructor(public navCtrl: NavController, private nativePageTransitions: NativePageTransitions) {}

  goBack() {
  	this.nativePageTransitions.slide({direction: 'right'});
  	this.navCtrl.pop();
  }

  goNext() {
  	this.nativePageTransitions.fade({});
  	this.navCtrl.push('OthersPage');
  }
}
