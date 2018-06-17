import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {messages} from "../../app/profile";
import { Dashboard1Page, Home1Page, SearchPage, RequestPage, Connections1Page} from '../pages';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
	jason = messages;
  	constructor(public navCtrl: NavController, private nativePageTransitions: NativePageTransitions) {}

	goToSearch()
	{
		this.nativePageTransitions.fade({});
		this.navCtrl.push(SearchPage);
	}

	goHome()
	{
	  this.nativePageTransitions.fade({});
		this.navCtrl.push(Home1Page); 
	}

	goToRequest()
	{
		this.nativePageTransitions.fade({});
		this.navCtrl.push(RequestPage); 
	}

	goToDashboard()
	{
		this.nativePageTransitions.fade({});
		this.navCtrl.push(Dashboard1Page); 
	}

	goToConnection()
	{
	  this.nativePageTransitions.fade({});
		this.navCtrl.push(Connections1Page); 
	}
}
