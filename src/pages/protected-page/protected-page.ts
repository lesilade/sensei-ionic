import {NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { WelcomePage } from '../welcome/welcome'
import { SigninPage } from '../signin/signin'

export class ProtectedPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage) {
  }

  ionViewCanEnter() {

    this.storage.get('id_token').then(id_token => {
      if (id_token === null) {
        this.navCtrl.setRoot(SigninPage);
        return false;
      }
    });

    return true;
  }

}
