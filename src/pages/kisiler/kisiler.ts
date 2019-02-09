import { Component } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';


/**
 * Generated class for the KisilerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kisiler',
  templateUrl: 'kisiler.html',
})
export class KisilerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, private dialogs: Dialogs) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KisilerPage');
  }
 phoneCall(num){
 /*  var call ="tel:"+num;
   alert('Aranıyor...'+num);
   document.location.href =call;
   */
  console.log(num);
   this.callNumber.callNumber(num, true)
     .then(() => console.log(num))
     .catch(() => console.log('Error launching dialer'));
 }
 Tamam(mesaj)
 {
   this.dialogs.confirm(
     'Please enter your name',  // message              
     'Registration',            // title
     ['Tamam', 'Çıkış']            // buttonLabels
   );
 }
}
