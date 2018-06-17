import { Experience } from './../../models/experience.model';
import { Response } from '@angular/http';
import { UserService } from './../../providers/user-service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { ExperiencesPage } from './../experiences/experiences';


/**
 * Generated class for the AddskillPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-addexperience',
  templateUrl: 'addexperience.html',
})
export class AddexperiencePage {

  private formData: FormGroup;
  private experience: Experience;

  constructor(public navCtrl: NavController, 
              private nativePageTransitions: NativePageTransitions,
              public formBuilder: FormBuilder,
              public userService: UserService) {

                this.formData = this.formBuilder.group({
                  title: [''],
                  organization: [''],
                  city: [''],
                  state: [''],
                  startdate: [''],
                  enddate: [''],
                  content: [''],
                  iscurrent: ['false']
                })
              }

  goBack() 
  {
  	this.nativePageTransitions.slide({direction: 'right'});
  	this.navCtrl.pop();
  }

  handleSubmit()
  {
    this.userService.addExperience(this.formData.value)
        .subscribe((data: Experience) => this.experience = data);
    
    this.nativePageTransitions.fade({});
  	this.navCtrl.push(ExperiencesPage, {experience: this.experience});
  }
}
