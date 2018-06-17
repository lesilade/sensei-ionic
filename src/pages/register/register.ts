import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {Storage} from '@ionic/storage';
import {AuthService} from '../../providers/auth-service';
import { WelcomePage } from '../welcome/welcome';
import {UserActivatePage} from '../useractivate/useractivate';


import * as $ from "jquery";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  
  private regData: FormGroup;

  constructor(
    public navCtrl: NavController, 
    private nativePageTransitions: NativePageTransitions,
     public storage: Storage,
    public formBuilder: FormBuilder,
    public authService: AuthService
    ) {
      this.regData = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    }

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
    $('.btn_signin').css({
      'height': height * 0.07,
      'margin-top': height * 0.06,
      'font-size': height * 0.024
    });
    $('.grid_signin').css({
      'margin-top': height * 0.116
    });
  }

  goBack() {
    this.nativePageTransitions.slide({direction: 'right'});
     this.navCtrl.setRoot(WelcomePage);
  }

    register() {
       this.authService.register(this.regData.value);
       this.navCtrl.push(UserActivatePage);
    }

}
