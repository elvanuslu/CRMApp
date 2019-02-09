import { Component, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import { PopoverController, AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ViewChild, ElementRef } from '@angular/core';
import { FirmalarPopPage } from '../firmalar-pop/firmalar-pop';
import { FirmalarPageModule } from './firmalar.module';
import { FirmalistesiPage } from '../firmalistesi/firmalistesi';
import { StatusBar } from '@ionic-native/status-bar';
import {NgForm,FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms';
import { Country } from '../../form/form.model';
import { PhoneValidator } from '../../Validators/phone.validator';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TelefonEklePage } from '../telefon-ekle/telefon-ekle';
import { AdresEklePageModule } from '../adres-ekle/adres-ekle.module';
import { AdresEklePage } from '../adres-ekle/adres-ekle';


@IonicPage()
@Component({
  template: `
    <ion-list radio-group [(ngModel)]="fontFamily" (ionChange)="changeFontFamily()" class="popover-page">
      <ion-row>
        <ion-col>
          <button (click)="changeFontSize('smaller')" ion-item detail-none class="text-button text-smaller">A</button>
        </ion-col>
        <ion-col>
          <button (click)="changeFontSize('larger')" ion-item detail-none class="text-button text-larger">A</button>
        </ion-col>
      </ion-row>
      <ion-row class="row-dots">
        <ion-col>
          <button ion-button="dot" (click)="changeBackground('white')" class="dot-white" [class.selected]="background == 'white'"></button>
        </ion-col>
        <ion-col>
          <button ion-button="dot" (click)="changeBackground('tan')" class="dot-tan" [class.selected]="background == 'tan'"></button>
        </ion-col>
        <ion-col>
          <button ion-button="dot" (click)="changeBackground('grey')" class="dot-grey" [class.selected]="background == 'grey'"></button>
        </ion-col>
        <ion-col>
          <button ion-button="dot" (click)="changeBackground('black')" class="dot-black" [class.selected]="background == 'black'"></button>
        </ion-col>
      </ion-row>
      <ion-item class="text-athelas">
        <ion-label>Athelas</ion-label>
        <ion-radio value="Athelas"></ion-radio>
      </ion-item>
      <ion-item class="text-charter">
        <ion-label>Charter</ion-label>
        <ion-radio value="Charter"></ion-radio>
      </ion-item>
      <ion-item class="text-iowan">
        <ion-label>Iowan</ion-label>
        <ion-radio value="Iowan"></ion-radio>
      </ion-item>
      <ion-item class="text-palatino">
        <ion-label>Palatino</ion-label>
        <ion-radio value="Palatino"></ion-radio>
      </ion-item>
      <ion-item class="text-san-francisco">
        <ion-label>San Francisco</ion-label>
        <ion-radio value="San Francisco"></ion-radio>
      </ion-item>
      <ion-item class="text-seravek">
        <ion-label>Seravek</ion-label>
        <ion-radio value="Seravek"></ion-radio>
      </ion-item>
      <ion-item class="text-times-new-roman">
        <ion-label>Times New Roman</ion-label>
        <ion-radio value="Times New Roman"></ion-radio>
      </ion-item>
    </ion-list>
  `
})
export class PopoverPage {
  background: string;
  contentEle: any;
  textEle: any;
  fontFamily;

  colors = {
    'white': {
      'bg': 'rgb(255, 255, 255)',
      'fg': 'rgb(0, 0, 0)'
    },
    'tan': {
      'bg': 'rgb(249, 241, 228)',
      'fg': 'rgb(0, 0, 0)'
    },
    'grey': {
      'bg': 'rgb(76, 75, 80)',
      'fg': 'rgb(255, 255, 255)'
    },
    'black': {
      'bg': 'rgb(0, 0, 0)',
      'fg': 'rgb(255, 255, 255)'
    },
  };

  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.textEle = this.navParams.data.textEle;

      this.background = this.getColorName(this.contentEle.style.backgroundColor);
      this.setFontFamily();
    }
  }

  getColorName(background) {
    let colorName = 'white';

    if (!background) return 'white';

    for (var key in this.colors) {
      if (this.colors[key].bg == background) {
        colorName = key;
      }
    }

    return colorName;
  }

  setFontFamily() {
    if (this.textEle.style.fontFamily) {
      this.fontFamily = this.textEle.style.fontFamily.replace(/'/g, "");
    }
  }

  changeBackground(color) {
    this.background = color;
    this.contentEle.style.backgroundColor = this.colors[color].bg;
    this.textEle.style.color = this.colors[color].fg;
  }

  changeFontSize(direction) {
    this.textEle.style.fontSize = direction;
  }

  changeFontFamily() {
    if (this.fontFamily) this.textEle.style.fontFamily = this.fontFamily;
  }
}


@Component({
  selector: 'page-firmalar',
  templateUrl: 'firmalar.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      ion-tabs {
        margin-bottom: 20px;
      }
    `,
    `
      ion-tabs,
      ion-tabs .tabbar {
        position: relative;
        top: auto;
        height: auto;
        visibility: visible;
        opacity: 1;
      }
    `
  ]
})

export class FirmalarPage {
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;
  root = FirmalistesiPage;

  adresim:any;
  public form: FormGroup;
  FirmaAdi:any;
  VergiDairesi:any;
  VergiNo:any;
  TelNo:any;
  countries: Array<Country>;
  loading: Loading;
  users: any = [];
  durumu: any=[];
  sektor:any=[];
  rFirma:any=[];
  Tipi:any;
  Tip:any=[];
  region:any=[];
  Ulke: any=[];
  Il: any = [];
  Ilce: any = [];
  link = 'http://demo2.veribiscrm.com/api/web/updatedata';
  link2 ="http://demo2.veribiscrm.com/api/web/listgroup";
  lnkUlke ="http://demo2.veribiscrm.com/api/web/listreport";

  constructor(private popoverCtrl: PopoverController, private nav: NavController, private statusBar: StatusBar, private _FB: FormBuilder,
    private http: Http, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.statusBar.styleLightContent();
    this.form = _FB.group({
      'FirmaAdi': ['', Validators.required],
      'VergiDairesi': [''],
      'VergiNo' :[''],
      'Web': [''],
      'Eposta': [''],
      'Tipi':[''],
      'durumu':[''],
      'sektor':[''],
      'rFirma':[''],
      'region':['']
    });
    this.countries = [
      new Country('TR', 'Turkey'),
      new Country('US', 'United States'),
      new Country('AR', 'Argentina')
    ];
    let country = new FormControl(this.countries[0], Validators.required);
    let phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    //Tip alanını dolduruyoruz...
    this.GetTip();
    this.GetDurumu();
    this.GetSektor();
    this.GetRelatedCompany();
    this.GetRegion();
  }
  SaveChanges(val:any)
  {
    console.log("value=",val);
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

  presentPopover(ev) {
/*
    let popover = this.popoverCtrl.create(PopoverPage, {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement
    });
*/
    let popover = this.popoverCtrl.create(FirmalarPopPage);
    popover.present({
      ev: ev
    });
  }
  mesaj(){
    alert("button Çalıştı");
  }
 
  KayitBasarili() {
    let alert = this.alertCtrl.create({
      title: 'Kayıt',
      subTitle: 'Kayıt Başarılı...',
      buttons: ['Tamam']
    });
    alert.present();
  }
  FirmalarListe(){
     this.nav.push(FirmalistesiPage);
  }
  TelefonEkle() {
    this.nav.push(TelefonEklePage, { FirmaId: this.users.Id });
  }
  AdresEkle()
  {
    console.log("giderken Firma Id=", this.users.Id);
    this.nav.push(AdresEklePage, {FirmaId : this.users.Id});
  }
  Kaydet() {
    console.log(this.form.controls["FirmaAdi"].value, " VD:",
      this.form.controls["VergiDairesi"].value, " VNO:",
      this.form.controls["VergiNo"].value, " Web:",
      //  this.form.controls["TelNo"].value," Fax:",
      //  this.form.controls["Fax"].value," Web:",
      this.form.controls["Web"].value, " EPosta:",
      this.form.controls["Eposta"].value, " Tipi:",
      this.form.controls["Tipi"].value, " Durumu:",
      this.form.controls["durumu"].value, " Sektörü:",
      this.form.controls["sektor"].value, " rFirma:",
      this.form.controls["rFirma"].value, " Region:",
      this.form.controls["region"].value
    );

    this.getList();
  }
  public Mesaj(baslik:any,mesaj:any)
  {
    let alert = this.alertCtrl.create({
      title: baslik,
      subTitle: mesaj,
      buttons: ['Tamam']
    });
    alert.present();
  }
  public getList() {

    try {
   this.presentLoadingDefault();
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      //headers.append('Content-Type', 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });


      let body = {
        "ApiKey": "TESTDEMO",
        "Table": "Company",
        "Id":0,
        "Data":{
          "Name": this.form.controls["FirmaAdi"].value,
          "TaxNo": this.form.controls["VergiNo"].value,
          "Web": this.form.controls["Web"].value,
          "TaxDepartment": this.form.controls["VergiDairesi"].value,
          "Mail": this.form.controls["Eposta"].value,
          "Type": this.form.controls["Tipi"].value,
          "Status": this.form.controls["durumu"].value,
          "Sector": this.form.controls["sektor"].value,
          "RelatedCompany": this.form.controls["rFirma"].value,
          "Region": this.form.controls["region"].value,
          "ListNo":0,
          "RevisionNo":0
        }
      };
      this.http.post(this.link, body, options)
        .map(res => res.json())
        .subscribe(data => {
          this.users = data.Data;
          console.log("Firma=", this.users);
          if (data.Status===0){
          this.KayitBasarili();
          }
          else
          {
            let alert = this.alertCtrl.create({
              title: 'Kayıt Hatası',
              subTitle: data.Message+ '...',
              buttons: ['Tamam']
            });
            alert.present();
          }
          this.loading.dismiss();
        }, err => {
          this.Mesaj("Bağlantı Hatası","İnternet bağlantınızı kontrol edin!");
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });

    }
    catch (ex) {
      console.log(ex);
      alert(ex);
    }
  }

  // Tip Alanlarını Çekiyoruz...
  async GetTip()
  {

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
        console.log("Tipi=",data.Data);
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
        console.log("Communication Error - Please verify connection and try again")
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      });
  }

  //Durum Bilgilerini Çekiyoruz....
  async GetDurumu() {

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = {
      "ApiKey": "TESTDEMO",
      "Id": 71
    }
    await this.http.post(this.link2, body, options)
      .map(res => res.json())
      .subscribe(data => {
        //this.users = JSON.stringify(data.Items);
        this.durumu = data.Data;
        console.log("Durumu=",data.Data);
      /*  console.log(data.Message);
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
  async GetSektor() {

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = {
      "ApiKey": "TESTDEMO",
      "Id": 34
    }
    await this.http.post(this.link2, body, options)
      .map(res => res.json())
      .subscribe(data => {
        //this.users = JSON.stringify(data.Items);
        this.sektor = data.Data;
        console.log("Sektör=",this.sektor);
      /*  console.log(data.Data);
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
        console.log("Bağlantı Hatası! ")
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      });
  }
  // Related Company alanını dolduruyoruz....
  async GetRelatedCompany() {

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = {
      "ApiKey": "TESTDEMO",
      "SqlId": 144
    }
    await this.http.post(this.lnkUlke, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.rFirma = data.Data;
        console.log("Related Company=", this.rFirma);
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
        console.log("Communication Error - Please verify connection and try again")
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      });
  }
  async GetRegion() {

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = {
      "ApiKey": "TESTDEMO",
      "Id": 72
    }
    await this.http.post(this.link2, body, options)
      .map(res => res.json())
      .subscribe(data => {
        this.region = data.Data;
        console.log("Region=", this.region);
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
        console.log("Communication Error - Please verify connection and try again")
        console.log('Error: ' + err.error);
        console.log('Name: ' + err.name);
        console.log('Message: ' + err.message);
        console.log('Status: ' + err.status);
      });
  }
  logla(val:any)
  {
    console.log(val);
  }

 

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 12000);
  }

  YeniAdresGir(addr:any) {
    let prompt = this.alertCtrl.create({
      title: 'Yeni Adres Girişi',
      message: "Yeni Adres Giriniz.",
      inputs: [
        {
          name: 'adresim',
          placeholder: 'Adres...'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.adresim = data;
            console.log("Adres=",data);
            console.log("Adres=", this.adresim);
          }
        }
      ]
    });
    prompt.present();
  }
  getTarih()
  {
    var myDate = new Date().toLocaleString();
    console.log("Tarih=",myDate);
  }

}

