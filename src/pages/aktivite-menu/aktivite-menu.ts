import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the AktiviteMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aktivite-menu',
  templateUrl: 'aktivite-menu.html',
})
export class AktiviteMenuPage {
  public base64Image: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private camera: Camera,
    private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AktiviteMenuPage');
  }
  
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log(err);
    });
   
    /*
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
    */
  }
  barcodeScann() {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      alert(barcodeData.text+" Format="+barcodeData.format);
    }, (err) => {
      console.log(err);
    });
  }
}
