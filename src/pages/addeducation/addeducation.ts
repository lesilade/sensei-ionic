import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {EducationsPage, ProfilePage} from '../pages';
import {EducationModel} from '../../models/education.model';
import {UserService} from '../../providers/user-service';

/**
 * Generated class for the AddskillPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-addeducation',
  templateUrl: 'addeducation.html',
})
export class AddeducationPage {
  isCurrent: boolean = false;
  private educationData: FormGroup;
  constructor(
    public navCtrl: NavController, 
    private nativePageTransitions: NativePageTransitions,
    public formBuilder: FormBuilder,
    public userService: UserService
  ) 
  {
    this.educationData = this.formBuilder.group({
      school: ['', Validators.required],
      degree: ['', Validators.required],
      majorAreaOfStudy: ['', Validators.required],
      minorAreaOfStudy: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      current: ['false']
     });
  }


  goBack()
  {
  	this.nativePageTransitions.slide({direction: 'right'});
  	this.navCtrl.pop();
  }

  AddEducation() {

    this.userService.addEducation(this.prepareRequest())
    .subscribe(
      data => this.handleSuccess(data),
      err => this.handleError(err)
    );
 
  }

  prepareRequest()
  {
    let education = new EducationModel();
    education.school = this.educationData.value.school;
    education.degree = this.educationData.value.degree;
    education.majorareaofstudy = this.educationData.value.majorAreaOfStudy;
    education.minorareaofstudy = this.educationData.value.minorAreaOfStudy;
    education.startdate = this.educationData.value.startdate;
    education.enddate = this.educationData.value.enddate;
    education.iscurrent = this.educationData.value.current;
    
    return education;
  }

  handleSuccess(data: any)
  {
    console.log("this.educationData: ", data)
    this.nativePageTransitions.fade({});
    this.navCtrl.push(ProfilePage);
  }

  handleError(error: any)
  {
    console.log("this.educationData: ", error)
  }

}
