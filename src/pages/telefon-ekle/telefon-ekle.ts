import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the TelefonEklePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-telefon-ekle',
  templateUrl: 'telefon-ekle.html',
})
export class TelefonEklePage {
  public form: FormGroup;
  Tip: any = [];
  FirmaId: any;

  link2 = "http://demo2.veribiscrm.com/api/web/listgroup";

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl: AlertController,
    private http: Http,private _FB: FormBuilder) {
    this.form = _FB.group({
      'PhoneGroup': ['', Validators.required],
      'PhoneNumber': [''],
      'Internal': ['']
    });
    this.FirmaId = this.navParams.get("FirmaId");
    console.log("Gelen F_ID:", this.FirmaId);
  }
  SaveChanges(val: any) {
    console.log("value=", val);
  }
  ionViewDidLoad() {
    this.GetTip();
    console.log('ionViewDidLoad TelefonEklePage');
  }
  logla(val: any) {
    console.log(val);
  }
  KayitBasarili() {
    let alert = this.alertCtrl.create({
      title: 'Kayıt',
      subTitle: 'Kayıt Başarılı...',
      buttons: ['Tamam']
    });
    alert.present();
  }
  async FirmaTelefonKaydet() {
    let lnkKayit = "http://demo2.veribiscrm.com/api/web/updatedata";
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let body = {
      "ApiKey": "TESTDEMO",
      "Table": "CompanyPhones",
      "Data": {
        "PhoneGroup": this.form.controls["PhoneGroup"].value,
        "PhoneNumber": this.form.controls["PhoneNumber"].value,
        "Internal": this.form.controls["Internal"].value,
        "CompanyId": this.FirmaId

      }
    };
    await this.http.post(lnkKayit, body, options)
      .map(res => res.json())
      .subscribe(data => {
        //  this.Ilce = data.Data;
        console.log("Kayıt Response: " + data.Data);
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
  async GetTip() {

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = {
      "ApiKey": "TESTDEMO",
      "Id": 1193
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
        //  this.loading.dismiss();
      }, err => {
        console.log("Bağlantı hatası! İnternet bağlantınızı kontrol edin.")
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      });
    }
}
