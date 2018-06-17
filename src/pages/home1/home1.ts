import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {newsfeeds} from "../../app/profile";
import {ProtectedPage} from '../protected-page/protected-page';
import {Storage} from '@ionic/storage';
import { SigninPage } from '../signin/signin';
import { Events } from 'ionic-angular';
import {NewsFeedService} from '../../providers/newsfeed-service';
import {LikeModel} from '../../models/like.model';
import { Connections1Page, PostNewsFeedPage, BeltPage,Dashboard1Page,
	CommentPage, MessagePage, ProfilePage, SearchPage, RequestPage} from '../pages';


@Component({
  selector: 'page-home1',
  templateUrl: 'home1.html',
})
export class Home1Page {
	jason = newsfeeds;
	allfeeds : any = {};
	newsFeeds : any[];
	newsFeed : any;
	comment: any;
	userEmail: any;
	newsFeedId: Number;
	private loading : any;
	constructor(
		public navCtrl: NavController, 
		private nativePageTransitions: NativePageTransitions,
  	    public navParams: NavParams,
		private newsFeedService: NewsFeedService,
		private _loadingCtrl: LoadingController,
		private storage : Storage
		)
		{

			this.storage.get('email').then(email => {
				if (email === null) {
				  return console.log("email is null");
				}
				else{
				  this.userEmail = email;
				}
			  })
			  .catch(
				err => console.log(err)
			  );
     
		}

		ionViewDidLoad() {
			
			this.newsFeedService.getNewsFeeds()
			.subscribe(
				data => this.newsFeeds = data,
				err => console.log("error getting all newsfeed", err)
			  );

		}

		ionViewWillEnter()
		{ 

			console.log("calling ionViewWillEnter")

			 this.comment = this.navParams.get('commentData');
			 if(this.comment)
			 {
			 	console.log('comment content', this.comment);
			 }

		}

		ionViewCanEnter() {

			   console.log("calling ionViewCanEnter")
			   this.storage.get('id_token').then(id_token => {
				if (id_token === null) {
				  return false;
				}
				else{
					 
				  return true;
				}
			  })
			  .catch(
				err => console.log(err)
			  );
			 
			  }
	
	goToNewsFeed()
	{
		this.navCtrl.push(PostNewsFeedPage);
	}

	saveComment(data)
	{
    this.newsFeedId = data.response.id;	  
		this.navCtrl.push(CommentPage, {newsfeedId: this.newsFeedId});
	}

	saveLike(data)
	{

		console.log("get newsfeed data ", data);
		   this.newsFeedId = data.response.id;
		   console.log("get data.response ", data.response);
		let likeModel = new LikeModel(this.userEmail, data.response.id);
				
		this.newsFeedService.postFeedLike(likeModel)
		.subscribe( 
		 		data => this.reloadThePage(data),
                err => console.log("get like error ", err)
			  );
		  
	}

	reloadThePage(likeData: any)
	{
			//get the currently active page component
			var component = this.navCtrl.getActive().instance;
			//re-run the view load function if the page has one declared
			if (component.ionViewDidLoad) {
				let temp = this.newsFeeds[likeData.newsfeedId].response;
				temp.likes = {count: likeData.count};
				this.newsFeeds[likeData.newsfeedId].response = temp;
		     	component.ionViewDidLoad();
			}
	}

	goToProfile() {
		this.nativePageTransitions.fade({});
		this.navCtrl.push(ProfilePage);
	}
	
	goToMessage()
	{
		this.nativePageTransitions.fade({});
		this.navCtrl.push(MessagePage);
	}

	goToSearch()
	{
		this.nativePageTransitions.fade({});
		this.navCtrl.push(SearchPage);
	}

	goToConnection()
	{
	  this.nativePageTransitions.fade({});
		this.navCtrl.push(Connections1Page); 
	}

	goToRequest()
	{
		this.nativePageTransitions.fade({});
		this.navCtrl.push(RequestPage); 
	}

	goBelt()
	{
		this.nativePageTransitions.fade({});
		this.navCtrl.push(BeltPage); 
	}
	goToDashboard()
	{
		this.nativePageTransitions.fade({});
		this.navCtrl.push(Dashboard1Page); 
	}
}
