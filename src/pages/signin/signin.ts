import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {JwtHelper} from 'angular2-jwt';
import {AuthService} from '../../providers/auth-service';
import {NewsFeedService} from '../../providers/newsfeed-service';
import {UserModel} from '../../models/user.model';
import { WelcomePage } from '../welcome/welcome';
import { Home1Page } from '../home1/home1';

import * as $ from "jquery";

/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
 
  private loginData: FormGroup;
  jwtHelper = new JwtHelper();
  userEmail : string;
  id_token : string;
 // public user: UserModel;
 private loading : any;
  constructor(
    public navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public storage: Storage,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private newsFeedService: NewsFeedService,
    private _loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

    this.loginData = this.formBuilder.group({
      password: ['', Validators.required],
      rememberMe: [''],
      email: ['', Validators.required]
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
    this.navCtrl.pop();
  }

   login() 
   {

    this.loading = this._loadingCtrl.create({
         content: 'Authenticating...'
       });
      this.loading.present();

      this.authService.login(this.loginData.value)
      .subscribe(
        data => this.handleSuccess(data.id_token),
        err => this.handleLoginError(err)
      );
      
      console.log("going to next page");

   }
   
   handleLoginError(error: any)
   {
     console.log("err", error.headers.get('date'));
     this.storage.set("register_error", "Error : " + error._body + " and Status: " + error.status)
     this.loading.dismiss();

     let errorMessage = error.headers.get("x-senseiapp-error");
     console.log(errorMessage);
     this.presentAlert(errorMessage);
   }

   presentAlert(message: any) {
		let alert = this.alertCtrl.create({
			title: 'Error',
			message: message,
			buttons: [
			  {
				text: 'OK',
				handler: () => {
				  console.log('Error Message', message);
				}
			  }
			]
		  });
		  alert.present();
	  }

   handleSuccess(id_token: any) 
   {
   
     let userProfile = this.jwtHelper.decodeToken(id_token);
    
     this.userEmail = userProfile.email;
     this.storage.set("id_token", id_token);
     this.storage.set("email", this.userEmail);
     
     this.authService.userEmail = userProfile.email;

     this.loading.dismiss();
     this.navCtrl.setRoot(Home1Page);
    }


}
