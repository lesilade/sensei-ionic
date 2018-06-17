import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {Storage} from '@ionic/storage';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {NewsFeedService} from '../../../providers/newsfeed-service';
import {UserModel} from '../../../models/user.model';
import { WelcomePage } from '../../welcome/welcome';
import { Home1Page } from '../../home1/home1';

/**
 * Generated class for the RequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
	 
	 private commentData: FormGroup;
   private newsfeedId : any;
   private newsFeed: any;

  	constructor(public navCtrl: NavController,
    private nativePageTransitions: NativePageTransitions,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public storage: Storage,
    public formBuilder: FormBuilder,
    public newsFeedService: NewsFeedService) {

	    this.newsfeedId = navParams.get('newsfeedId');
			if(this.newsfeedId)
			{
				console.log('newsfeedId ', this.newsfeedId);
			}
    
     this.commentData = this.formBuilder.group({
      content: ['', Validators.required]
     });

	}

	goBack() {
    this.nativePageTransitions.slide({direction: 'right'});
        this.navCtrl.pop();
   }

  	postComment() 
	  {
    
  		this.nativePageTransitions.fade({});
		  let responseCommentData = this.newsFeedService.postFeedComment(this.commentData.value, this.newsfeedId)
      responseCommentData.subscribe( 
        data => 	this.postedData(data),
        err => console.log("post comment_error ", err)
      );

  	}

    postedData(responseData: any)
    {
      let commentResponse = {commentData: responseData };
      console.log("commentResponse: ", commentResponse)
      this.navCtrl.push(Home1Page, commentResponse);
    }
}
