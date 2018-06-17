
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {Storage} from '@ionic/storage';
import * as $ from "jquery";
import { SignupPage } from '../signup/signup';
import { LoginPage } from './../login/login';

/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  constructor(public navCtrl: NavController, 
	private nativePageTransitions: NativePageTransitions,
	private storage: Storage) {}

  ionViewDidLoad() {
  	var height = window.innerHeight;
    $('.img_logo').css({
  		'height': height * 0.13,
  		'margin-top': height * 0.187
  	});
  	$('.label_sen').css({
  		'font-size': height * 0.04,
  		'color': 'white'
  	});
  	$('.label_achi').css({
  		'font-size': height * 0.02,
  		'color': 'white'
  	});
  	$('.btn_join').css({
  		'height': height * 0.07,
  		'margin-top': height * 0.292,
  		'font-size': height * 0.024
  	});
  	$('.btn_signin').css({
  		'height': height * 0.07,
  		'font-size': height * 0.024
  	});

  }

  goToLoginPage() {
    this.nativePageTransitions.fade({});
    this.navCtrl.push(LoginPage);
	}
	
	goToSignupPage()
	{
    this.nativePageTransitions.fade({});
    this.navCtrl.push(SignupPage);
	}
}
