import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, Platform } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
//import { FirmalarPage } from '../firmalar/firmalar';

import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { Timestamp } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-adres-ekle',
  templateUrl: 'adres-ekle.html',
})

  @Injectable()
export class AdresEklePage {
  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  public form: FormGroup;
  Ulke: any = [];
  Il: any = [];
  Ilce: any = [];
  Tip: any = [];
  UlkeSec:any;
  IlSec:any;
  IlceSec:any;
  loading: Loading;
  AdresKayitResponse:any=[];
  FirmaId:any;
  Type:any;
  Country:any;
  County:any;
  County1:any;
  Address1:any;
  Address2:any;
  Address3:any;
  Mevki:any;
  Location:any;
  PostCode:any;
  CompanyId:any;
  lnkUlke = "http://demo2.veribiscrm.com/api/web/listreport";
  link2 = "http://demo2.veribiscrm.com/api/web/listgroup";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public backgroundGeolocation:BackgroundGeolocation,
    public zone: NgZone,
    public geolocation:Geolocation,
  private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    platform: Platform,
    private http: Http, private _FB: FormBuilder) {
    this.FirmaId = this.navParams.get("FirmaId");
    console.log("Gelen F_ID:",this.FirmaId);
    this.HataUyarısı();
    this.form = _FB.group({
      'Address1': ['', Validators.required],
      'Address2': [''],
      'Address3': [''],
      'Mevki': [''],
      'Location': [''],
     // 'Type':[''],
      'Country':[''],
      'County': [''],
      'County1': ['']
    }); 
   this.getLocation();
    //this.stopTracking();
    this.startTracking();
  }
  
  startTracking()
  {
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };
    
    
    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
   this.Location = location.latitude+', '+location.longitude;
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });

    }, (err) => {

      console.log(err);

    });
    

    // Turn ON the background-geolocation system.
    //this.backgroundGeolocation.start();


    // Foreground Tracking

    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

      console.log("Pos=",position);
      this.Location = position.coords.latitude+' , '+position.coords.longitude;
      this.form.controls["Location"].setValue(this.Location) ;
      // Run update inside of Angular's zone
    /*  this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      }*);*/

    });
    console.log("def=", this.form.controls["Location"].value);
    if(this.form.controls["Location"].value!==undefined)
      this.stopTracking();
  }
  
  stopTracking() {

    console.log('stopTracking');
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }
  ionViewDidLoad() {

    console.log("Adres Ekle");
    this.GetTip();
    this.GetUlke();
    this.getIller(213);
    this.getIlceler(2213);
   // this.getLocation();
    this.startTracking();
  }
  HataUyarısı() {
    console.log("HataUyarı",this.FirmaId);
    if(this.FirmaId == undefined)
    {
    let alert = this.alertCtrl.create({
      title: 'Firma Kaydı!',
      subTitle: 'Firma Kaydını Yapmadınız, lütfen Geri dönüp önce Firma kaydını tamamlayınz!..',
      buttons: ['Tamam']
    });
      alert.present();
  }
}
  public getLocation() {
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options).then((res) => {
      // resp.coords.latitude
      // resp.coords.longitude
      //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
      console.log(res);
      this.Location = 'lat ' + res.coords.latitude + ', lang ' + res.coords.longitude;
     // this.form.controls['Location'].setValue(this.Location);
     
      }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  SaveChanges(val: any) {
    console.log("value=", val);
  }
  KayitBasarili() {
    let alert = this.alertCtrl.create({
      title: 'Kayıt',
      subTitle: 'Kayıt Başarılı...',
      buttons: ['Tamam']
    });
    alert.present();
  }
  async FirmaAdresKaydet()
  {
   let lnkKayit ="http://demo2.veribiscrm.com/api/web/updatedata";
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let body = {
      "ApiKey": "TESTDEMO",
      "Table": "CompanyAddresses",
      "Data": {
       // "Type": this.form.controls["Type"].value,
        "Country": this.form.controls["Country"].value,
        "County": this.form.controls["County"].value,
        "County1": this.form.controls["County1"].value,
        "Address1": this.form.controls["Address1"].value,
        "Address2": this.form.controls["Address2"].value,
        "Address3": this.form.controls["Address3"].value,
        "Mevki": this.form.controls["Mevki"].value,
        "Location": this.form.controls["Location"].value,
        "PostCode":0,
        "CompanyId": this.FirmaId

      }
    };
    await this.http.post(lnkKayit, body, options)
      .map(res => res.json())
      .subscribe(data => {
      //  this.Ilce = data.Data;
        console.log("Kayıt Response: " +data.Data);
        if (data.Status === 0) {
           this.KayitBasarili();
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Bağlantı Hatası',
            subTitle: data.Message + '...',
            buttons: ['Tamam']
          });
          alert.present();
        }
        //  this.loading.dismiss();
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Bağlantı Hatası',
          subTitle: 'İnternet bağlantınızı kontrol edin..',
          buttons: ['Tamam']
        });
        alert.present();
        console.log("Communication Error - Please verify connection and try again")
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      });
  }
 
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Yükleniyor...'
    });
    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);
  }

  
  logla(val: any) {
    console.log("Val=",val);
  }
  public getIllerim(Sehir:any)
  {
    console.log("Şehir Seçilen=",Sehir);
    //this.presentLoadingDefault();
    console.log("IlSeçilen=", this.UlkeSec);
    this.getIller(Sehir);
  }
  IlSecim(val:any)
  {
   
    console.log("Ilçe=",val);
  this.getIlceler(val);
  }
  Goster()
  {
    console.log(this.UlkeSec);
  }


  //İlçeler Getiriliyor
  async getIlceler(val:any) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = {
      "ApiKey": "TESTDEMO",
      "SqlId": 2876,
      "Sort": { "Field": "Ilce", "Dir": "asc" },
      "Filter": { "Field": "CountyId", "Op": "eq", "Val1": val }

    }
    await this.http.post(this.lnkUlke, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.Ilce = data.Data;
        console.log("Ilçe" + this.Ilce);
        //console.log(data.Data);
        /* console.log(data.Message);
         console.log(data.Status);
         */
        if (data.Status === 0) {

        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Bağlantı Hatası',
            subTitle: data.Message + '...',
            buttons: ['Tamam']
          });
          alert.present();
        }
      //  this.loading.dismiss();
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Bağlantı Hatası',
          subTitle: 'İnternet bağlantınızı kontrol edin..',
          buttons: ['Tamam']
        });
        alert.present();
        console.log("Communication Error - Please verify connection and try again")
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      });
  }

  //İller Getiriliyor
  async getIller(val:any) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = {
      "ApiKey": "TESTDEMO",
      "SqlId": 2875,
      "Sort": { "Field": "Il", "Dir": "asc" },
      "Filter": { "Field": "County", "Op": "eq", "Val1": val }

    }
    await this.http.post(this.lnkUlke, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.Il = data.Data;
       // console.log("Il=" + this.Il);
       // console.log(data.Data);
        /* console.log(data.Message);
         console.log(data.Status);
         */
        if (data.Status === 0) {

        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Bağlantı Hatası',
            subTitle: data.Message + '...',
            buttons: ['Tamam']
          });
          alert.present();
        }
        // this.loading.dismiss();
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Bağlantı Hatası',
          subTitle: 'İnternet bağlantınızı kontrol edin..',
          buttons: ['Tamam']
        });
        alert.present();
        console.log("Communication Error - Please verify connection and try again")
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      });
  }
  //Ulkeri Yüklüyoruz...
  async GetUlke() {

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = {
      "ApiKey": "TESTDEMO",
      "SqlId": 201,
      "Sort": { "Field": "Ulke", "Dir": "asc" }
    }
    await this.http.post(this.lnkUlke, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.Ulke = data.Data;
      //  console.log("Ulke" + this.Ulke);
        /* console.log(data.Data);
         console.log(data.Message);
         console.log(data.Status);
         */
        if (data.Status === 0) {

        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Bağlantı Hatası',
            subTitle: data.Message + '...',
            buttons: ['Tamam']
          });
          alert.present();
        }
      // this.loading.dismiss();
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Bağlantı Hatası',
          subTitle: 'İnternet bağlantınızı kontrol edin..',
          buttons: ['Tamam']
        });
        alert.present();
        console.log("Communication Error - Please verify connection and try again")
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      });
  }

  // Tip Alanlarını Çekiyoruz...
  async GetTip() {

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = {
      "ApiKey": "TESTDEMO",
      "Id": 70
    }
    await this.http.post(this.link2, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.Tip = data.Data;
        console.log("Tipi=", data.Data);
        /*   console.log(data.Message);
           console.log(data.Status);
           */
        if (data.Status === 0) {

        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Bağlantı Hatası',
            subTitle: data.Message + '...',
            buttons: ['Tamam']
          });
          alert.present();
        }
        // this.loading.dismiss();
      }, err => {
        console.log("Communication Error - Please verify connection and try again")
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      });
  }

}
