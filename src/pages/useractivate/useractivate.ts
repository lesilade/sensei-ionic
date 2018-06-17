import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../providers/auth-service';
import {UserModel} from '../../models/user.model';
import { RegisterPage } from '../register/register'
import {SigninPage} from '../signin/signin';
import * as $ from "jquery";
import { WelcomePage } from '../welcome/welcome';

/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-useractivate',
  templateUrl: 'useractivate.html',
})
export class UserActivatePage {
 
  private keyData: FormGroup;
  public user: UserModel;

  constructor(
    public navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public storage: Storage,
    public formBuilder: FormBuilder,
    public authService: AuthService) {

    this.keyData = this.formBuilder.group({
      key: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
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

  // 	  ionViewCanEnter() {

  //   this.storage.get('id_token').then(id_token => {
  //     if (id_token === null) {
  //       this.navCtrl.setRoot(RegisterPage);
  //       return false;
  //     }
  //   });

  //   return true;
  // }	

  goBack() {
    //this.nativePageTransitions.slide({direction: 'right'});
    this.navCtrl.pop();
  }


   activate() {
       this.authService.activate(this.keyData.value)
       this.navCtrl.setRoot(WelcomePage);
     
  }

}
