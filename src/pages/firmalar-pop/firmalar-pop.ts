import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FirmalarPopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firmalar-pop',
  templateUrl: 'firmalar-pop.html',
})
export class FirmalarPopPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirmalarPopPage');
  }
  mesaj(){
    alert("pop butonu çalıştı..");
  }
}
