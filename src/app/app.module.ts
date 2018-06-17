import { AddotherPage } from './../pages/addother/addother';
import { EducationPageModule } from './../pages/educations/education-module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {WelcomePage} from "../pages/welcome/welcome";
import {UserActivatePage} from "../pages/useractivate/useractivate";
import {AuthHttp, AuthConfig, JwtHelper} from 'angular2-jwt';
import {Storage} from '@ionic/storage';
import {HttpModule, Http, RequestOptions, XHRBackend} from '@angular/http';
import {AuthService} from '../providers/auth-service';
import {NewsFeedService} from '../providers/newsfeed-service';
import {CoachingService} from '../providers/coaching-service';
import {UserService} from '../providers/user-service';
import {HttpInterceptor} from '../providers/http.interceptor';
import { SignupPage } from './../pages/signup/signup';
import { SpleshPage } from './../pages/splesh/splesh';
import { EditotherPage } from './../pages/editother/editother';
import {Home1Page, SigninPage,EditexperiencePage,EditeducationPage,
  Connections1Page, ProfilePage, SettingsPage, CommentPage,SkillsPage,Dashboard1Page,
  AddskillPage, AddexperiencePage, AddeducationPage, OthersPage, RequestPage, SearchPage,LoginPage,
  MessagePage,BeltPage, SenseiPage, PostNewsFeedPage, ExperiencesPage,RegisterPage} from "../pages/pages";


let storage = new Storage({});

export function httpInterceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, storage: Storage) {
  return new HttpInterceptor(xhrBackend, requestOptions, storage);
}

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    UserActivatePage,
    Home1Page,
    SigninPage,AddotherPage,
    Connections1Page,EditeducationPage,Dashboard1Page,
    SettingsPage,EditexperiencePage,EditotherPage,SpleshPage,
    CommentPage,SkillsPage,SearchPage,MessagePage,BeltPage,ExperiencesPage,
    AddskillPage, AddexperiencePage, AddeducationPage, OthersPage,LoginPage,SignupPage,
    RequestPage, ProfilePage, SenseiPage, RegisterPage, PostNewsFeedPage, ExperiencesPage
   ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpModule,
     EducationPageModule,
    IonicModule.forRoot(MyApp, {
      mode: "md",
      pageTransition: "md-transition"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    UserActivatePage,
    Home1Page,
    SigninPage,AddotherPage,
    Connections1Page,EditeducationPage,Dashboard1Page,SpleshPage,
    SettingsPage,SignupPage,EditexperiencePage,EditotherPage,
    CommentPage,SkillsPage,SearchPage,MessagePage,BeltPage, LoginPage,ExperiencesPage,
    AddskillPage, AddexperiencePage, AddeducationPage, OthersPage,
    RequestPage, ProfilePage, Dashboard1Page, SenseiPage, RegisterPage, PostNewsFeedPage, ExperiencesPage
   ],
  providers: [
    StatusBar,
    SplashScreen,
    NativePageTransitions,
   {provide: ErrorHandler, useClass: IonicErrorHandler},
   JwtHelper,
   {
    provide: Http,
    useFactory: httpInterceptorFactory,
    deps: [XHRBackend, RequestOptions, Storage]
  },
    AuthService,
    NewsFeedService,
    CoachingService,
    UserService
  ]
})
export class AppModule {}
