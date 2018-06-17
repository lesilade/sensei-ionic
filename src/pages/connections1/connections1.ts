import { Home1Page } from './../home1/home1';
import { UserConnectionModel } from './../../models/userconnection.model';
import { CoachingService } from './../../providers/coaching-service';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {connections} from "../../app/profile";
import * as $ from "jquery";
import { PostNewsFeedPage, BeltPage,Dashboard1Page,
	CommentPage, MessagePage, ProfilePage, SearchPage, RequestPage} from '../pages';

/**
 * Generated class for the ConnectionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-connections1',
  templateUrl: 'connections1.html',
})
export class Connections1Page {
	connections = connections;
	coachingConnections;
	following;
	followers;
	indexPostion;
	pet;
	tooltip_str = '';
	  constructor(public navCtrl: NavController,
		 private nativePageTransitions: NativePageTransitions,
		 private coachingService: CoachingService) 
		 {
			
			//get user coahing connections
			this.coachingService.getCoachingConnections()
			.subscribe(
				data => this.handleCoachingConnectionsSuccess(data),
				err => console.log(err)
			);

			this.coachingService.getUserConnectionFollowing()
			.subscribe(
				data => this.handleFollowingSuccess(data),
				err => console.log(err)
			);


			 this.coachingService.getUserConnectionFollowers()
			 .subscribe(
			 	data => this.handleFollowersSuccess(data),
			 	err => console.log(err)
			 );
		 }

	handleFollowersSuccess(data: any)
	{
		console.log("followers connection data: ", data);
		this.followers = data;
	}

	handleFollowingSuccess(data: any)
	{
		console.log("following connection data: ", data);
		this.following = data;
	}

	handleCoachingConnectionsSuccess(data: any)
	{
		console.log("coaching connection data: ", data);
		this.coachingConnections = data;
	}

	unfollow()
	{
		console.log(this.indexPostion);

		let user = new UserConnectionModel();
		user.connectionUsername = this.following[this.indexPostion].email;
		
		this.coachingService.unfollowUserConnection(user)
		.subscribe(
			data => this.handleUnfollowSuccess(data),
			err => console.log(err)
		);
	}

	handleUnfollowSuccess(data: any)
	{
		console.log("unfollow data", data)
		this.following.splice(this.indexPostion, 1);
		this.hideToolTiop();
	}

	handleBlockSuccess(data: any)
	{
		console.log("block data", data)
		this.followers.splice(this.indexPostion, 1);
		this.hideToolTiop();
	}

	block(data: any)
	{
		console.log(this.indexPostion);

		let user = new UserConnectionModel();
		user.connectionUsername = this.followers[this.indexPostion].email;
		
		this.coachingService.blockUserConnection(user)
		.subscribe(
			data => this.handleBlockSuccess(data),
			err => console.log(err)
		);
	}

  	ionViewWillEnter() {
	    $('.tooltip').hide();
	}

  	ionViewDidEnter() {
		this.pet = "connections";
	}
	
	ionViewDidLoad()
	{
		console.log("ionViewDidLoad");
		this.coachingService.postUserConnection(this.getUserConnectionDummyData())
		.subscribe(
		   data => console.log(data),
		   err => console.log(err)
	   );
	}

     getUserConnectionDummyData()
	 {
		 let obj = new UserConnectionModel();

		 obj.connectionUsername = 'surrytt@gmail.com';

		 return obj;
	 }

	showTooltip(index) {
		this.indexPostion = index;
		console.log(index , "and ", this.indexPostion)
		var str = this.pet + index;
		if(str == this.tooltip_str) {
			this.tooltip_str = '';
			$('.tooltip').hide();
		} else {
			this.tooltip_str = str;
			$('.tooltip_' + this.pet).show();
			$('.tooltip_' + this.pet).css({
				'top': $('.div' + index + ':last').position().top + 35
			});
		}
	}
	hideToolTiop()
	{
		$('.tooltip').hide();
		this.tooltip_str = '';
	}

	segmentChanged() {
		this.hideToolTiop();
	}

	// goNext(next) {
	// 	this.hideToolTiop();
	// 	this.nativePageTransitions.fade({});
	// 	this.navCtrl.push(next, 0);
	// }

	goToProfile() {
		this.hideToolTiop();
		this.nativePageTransitions.fade({});
		this.navCtrl.push(ProfilePage);
	}

	goToMessage()
	{
		this.hideToolTiop();
		this.nativePageTransitions.fade({});
		this.navCtrl.push(MessagePage);
	}

	goToSearch()
	{
		this.hideToolTiop();
		this.nativePageTransitions.fade({});
		this.navCtrl.push(SearchPage);
	}

	goToRequest()
	{
		this.hideToolTiop();
		this.nativePageTransitions.fade({});
		this.navCtrl.push(RequestPage); 
	}

	goToDashboard()
	{
		this.hideToolTiop();
		this.nativePageTransitions.fade({});
		this.navCtrl.push(Dashboard1Page); 
	}

	goHome()
	{
		this.hideToolTiop();
		this.nativePageTransitions.fade({});
		this.navCtrl.push(Home1Page); 
	}
}
