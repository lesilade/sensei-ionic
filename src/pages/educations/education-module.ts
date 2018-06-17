import { EducationsPage } from './educations';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    EducationsPage,
  ],
  imports: [
    IonicPageModule.forChild(EducationsPage),
  ],
  exports: [
    EducationsPage
  ]
})
export class EducationPageModule {}
