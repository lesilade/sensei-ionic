import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import * as $ from "jquery";

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-splesh',
  templateUrl: 'splesh.html',
})
export class SpleshPage {
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
  	$('.img_arrow').css({
  		'height': height * 0.55,
  		'margin-top': height * 0.058,
  		'width': '100%'
  	});
  	$('.label_spinner').css({
  		'top': height * 0.843
  	});

  	setTimeout(() => {
      this.navCtrl.push('WelcomePage');
    }, 3000);
  }

  ionViewWillLeave() {
    let options: NativeTransitionOptions = {
      duration: 1000
    };
    this.nativePageTransitions.fade(options);
  }
}
