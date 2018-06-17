import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import * as $ from "jquery";

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  constructor(public navCtrl: NavController, private nativePageTransitions: NativePageTransitions) {}

  ionViewDidLoad() {
    var height = window.innerHeight;
    $('.img_logo').css({
      'height': height * 0.13,
      'margin-top': height * 0.187
    });
    $('.label_sen').css({
      'font-size': height * 0.04
    });
    $('.label_achi').css({
      'font-size': height * 0.02
    });
    $('.btn_facebook').css({
      'height': height * 0.07,
      'margin-top': height * 0.2
    });
    $('.btn_linked').css({
      'height': height * 0.07,
      'margin-top': height * 0.02
    });
    $('.btn_email').css({
      'height': height * 0.07,
      'margin-top': height * 0.02
    });
    $('.auth_btn span').css({
      'font-size': height * 0.024
    });
    $('.auth_btn ion-icon').css({
      'font-size': height * 0.03
    });
  }

  goBack(goBack) {
    this.nativePageTransitions.slide({direction: 'right'});
    this.navCtrl.pop();
  }

  goNext() {
    this.nativePageTransitions.fade({});
    this.navCtrl.push('RegisterPage');
  }
}
