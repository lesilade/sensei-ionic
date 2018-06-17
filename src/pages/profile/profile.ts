import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {profile} from "../../app/profile";
import {Home1Page, SettingsPage, AddskillPage, 
  AddexperiencePage, AddeducationPage, OthersPage, SkillsPage, EducationsPage, ExperiencesPage } from '../pages';
import {Storage} from '@ionic/storage';
import {UserService} from  '../../providers/user-service';
import * as $ from "jquery";

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  jason = profile;
  user;
  userSkills;
  userExperience;
  userEducation;
  userAffiliation;

  constructor(
    public navCtrl: NavController, 
    private nativePageTransitions: NativePageTransitions,
    public storage: Storage,
    public navParams: NavParams,
    public userService: UserService
    ) {
         
    this.user = this.jason.user;
    //this.userSkills = this.jason.userSkills;
    //this.userExperience = this.jason.userExperience;
   // this.userEducation = this.jason.userEducation;
   // this.userAffiliation = this.jason.userAffiliation;

                  this.userService.getUserProfile()
                  .subscribe(
                    data => this.handleSuccess(data),
                    err => console.log("error getting profile", err)
                    );
      
  }

  handleSuccess(data: any)
  {
    this.userSkills = data.userSkills;
    this.userExperience = data.userExperience;
    this.userEducation = data.userEducation;
    this.userAffiliation = data.userAffiliation;
    this.user = data.user;
  }

 
  ionViewDidLoad() {
    var width = window.innerWidth;
    $('.profile_img').css({
      'height': width * 0.2,
      'width': width * 0.2
    });
    $('.first_card').css({
      'margin-top': width * -0.1
    });
    $('.first_row').css({
      'margin-bottom': width * 0.1 - 33
    });
  }

  ionViewWillEnter()
  { 
  }

  goBack()
  {
    this.nativePageTransitions.fade({});
    this.navCtrl.push(Home1Page);
  }

  goNext(next) {
    this.nativePageTransitions.fade({});
    this.navCtrl.push(next);
  }

  goToAddSkill()
  {
    this.nativePageTransitions.fade({});
    this.navCtrl.push(SkillsPage);
  }
  goToAddExperience()
  {
    this.nativePageTransitions.fade({});
    this.navCtrl.push(ExperiencesPage, {experiences: this.userExperience});
  }
  goToAddeducationPage()
  {
    this.nativePageTransitions.fade({});
    console.log("calling the education page");
   // this.navCtrl.push(ExperiencesPage, {experience: this.userExperience});
    this.navCtrl.push(EducationsPage);
  }
  goToAddotherPage()
  {
    this.nativePageTransitions.fade({});
    this.navCtrl.push(OthersPage);
  }

  goToSettings()
  {
    this.nativePageTransitions.fade({});
    this.navCtrl.push(SettingsPage);
  }
}
