import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {Storage} from '@ionic/storage';
import { WelcomePage } from '../welcome/welcome';
import {AuthService} from '../../providers/auth-service';

/**
 * Generated class for the AddskillPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {
	items1;
	items2;
	constructor(
		private authService: AuthService,
		public navCtrl: NavController, 
		private nativePageTransitions: NativePageTransitions,
		private storage: Storage) {
		this.items1 = [{title: 'Email Address', sub_title: 'Add or remove email addresses on your account', link: ''},
					{title: 'Change password', sub_title: 'Choose a unique password to protect your account', link: ''},
					{title: 'Sync contact', sub_title: 'Automatically find people you know', link: ''},
					{title: 'Social Network', sub_title: 'Social network synced to the app', link: ''},
					{title: 'Alerts and Notification', sub_title: 'Who can see your profile and activities', link: ''},
					{title: 'Feed preference', sub_title: 'Manage what is displayed on your feed', link: ''}];
		this.items2 = [{title: 'Email Address', sub_title: 'Add or remove email addresses on your account', link: ''},
					{title: 'Help Center', link: ''},
					{title: 'Privacy Policy', link: ''},
					{title: 'Send Feedback', link: ''},
					{title: 'End User License Agreement', link: ''},
					{title: 'Sign Out', link: 'WelcomePage'}];
	}

	goBack() {
		this.nativePageTransitions.slide({direction: 'right'});
	  	this.navCtrl.pop();
	}

	goNext(next) {
	
		this.nativePageTransitions.fade({});
		
		if(next.title === 'Sign Out')
		{
			this.authService.logout();
		}
		this.navCtrl.setRoot(WelcomePage);
	}
}
