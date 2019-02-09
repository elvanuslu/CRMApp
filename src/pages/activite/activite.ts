import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AktiviteMenuPage } from '../aktivite-menu/aktivite-menu';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


/**
 * Generated class for the ActivitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activite',
  templateUrl: 'activite.html',
})
export class ActivitePage {
  public base64Image: string;
  data={FirmaKisi:"", Konu:"",YapacakKisi:"",AktiviteTipi:"",NeZaman:"",Sure:"",Baslangic:"",
Bitis:"",Proje:"",Sonuc:"",Nerede:"",YoldaGecenSure:""};

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private popoverCtrl: PopoverController,
    private barcodeScanner: BarcodeScanner,
    private camera: Camera, 
    public http: Http) {


  }

  activiteListe(){
    let headers = new Headers();
     headers.append('Content-Type', 'application/json');
    let body = {
      "ApiKey": "305ba54428e94cf0a50eeb27abac81c9",
      "Api": "Company",
      "TransferID": null,
      "Page": 0
    };
    var link = 'http://crmtransfer.veribiscrm.com/api/list';
    this.http.post(link,JSON.stringify(body),{headers:headers})
    .map(res=>res.json())
    .subscribe(data=>{console.log(data)});    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivitePage');
  }
  clickKaydet() {
    console.log('Clicked Kaydet Menü');
  }
  
  presentPopover(ev) {
    let popover = this.popoverCtrl.create(AktiviteMenuPage);
    popover.present({
      ev: ev
    });
  }
  takePictures() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      console.log(barcodeData.text + " Format=" + barcodeData.format);
    }, (err) => {
      // An error occurred
    });
  }
  
}
