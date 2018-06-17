import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {NewsFeedService} from '../../providers/newsfeed-service';
import {UserModel} from '../../models/user.model';
import { WelcomePage } from '../welcome/welcome';
import { Home1Page } from '../home1/home1';

/**
 * Generated class for the RequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-postnewsfeed',
  templateUrl: 'postnewsfeed.html',
})
export class PostNewsFeedPage {
	 
	 private postData: FormGroup;
   private newsFeeds : any;
   private newFeed: any;

  	constructor(public navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public storage: Storage,
    public formBuilder: FormBuilder,
    public newsFeedService: NewsFeedService) {

	  this.postData = this.formBuilder.group({
      content: ['', Validators.required]
     });
	}

  goBack() 
  {
    this.nativePageTransitions.slide({direction: 'right'});
    this.navCtrl.pop();
   }

  	post() 
	  {
  		this.nativePageTransitions.fade({});
		  let responseNewsFeedData = this.newsFeedService.postFeed(this.postData.value)
      responseNewsFeedData.subscribe( 
        data => 	this.passData(data),
        err => console.log("post newsfeed_error ", err)
      );

  	}

    passData(data: any)
    {
      let response = { newsFeed: data };
      this.navCtrl.push(Home1Page, response);
    }
}
