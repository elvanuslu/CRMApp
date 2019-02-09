import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController} from 'ionic-angular';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StatusBar } from '@ionic-native/status-bar';
import { Injectable } from '@angular/core';
import { FirmalarPage } from '../firmalar/firmalar';
import { HTTP } from '@ionic-native/http';

@IonicPage()
@Component({
  selector: 'page-firmalistesi',
  templateUrl: 'firmalistesi.html',
})
  @Injectable()

export class FirmalistesiPage {
  page = 1;
  totalPage = 0;
  index:number=1;
  toplamKayit:any;
  loading: Loading;
  c = {};
  users: any = [];
  link = 'http://demo2.veribiscrm.com/api/web/listreport';
  public DataListe:Array<any>;
  public loadedDataList:Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController,
    private http: Http,
    private statusBar: StatusBar,
    public loadingCtrl: LoadingController) {
    this.statusBar.overlaysWebView(true); 
    this.statusBar.styleDefault();
    this.presentLoadingDefault();
    //this.doRefresh(0);
    this.getList(this.page);
  }
  doRefresh(refresher) {
    console.log("Refresher=",this.toplamKayit);
    console.log("Refresher Index=", this.index);
    
    if (refresher != 0){
      refresher.complete();
  }
    if(this.index===this.toplamKayit)
    {
      refresher.complete();
      this.index = this.toplamKayit;
    }
    else{
      this.index++;
    this.getList(this.index);
   
    }
    /*
    if(this.index !==this.toplamKayit)
    {
    this.index++;
    this.getList(this.index);
    if (refresher != 1)
      refresher.complete();
    }
    else {
      this.index = this.toplamKayit;
      refresher.complete();
    }
    */
  }
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Yükleniyor...'
    });
    this.loading.present();
   /* setTimeout(() => {
      this.loading.dismiss();
    }, 5000);
    */
  }
  public Mesaj(baslik: any, mesaj: any) {
    let alert = this.alertCtrl.create({
      title: baslik,
      subTitle: mesaj,
      buttons: ['Tamam']
    });
    alert.present();
  }
 public getList(val:any) {
   
    try {
     
      let data: Observable<any>;
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers});
      /*
      let body = {
        "ApiKey": "TEST",
        "Table": "Company",
        "Fields": ["Name", "Mail", "TaxNo", "TaxDepartment", "Web", "Type", "SpecialCode1", 
        "SpecialCode2", "SpecialCode3", "SpecialCode4", "CommercialCode", "Address1", "Address2", 
        "CreatedUserId", "CreatedDate", "ModifiedUserId", "ModifiedDate", "Sector", "Status", "Reference", 
        "RelatedCompany", "Region", "ListNo", "CompanyBillableAddress","Id"],
        "Page": 1,
        "PageSize": 25,
        "Sort": { "Field": "Name", "Dir": "asc" },
        "Filter": { "Field": "Type", "Op": "eq", "Val1": 56 }
      }
      */
      let body ={
        "ApiKey": "TESTDEMO",
          "SqlId": 144,
            "Page": val,
              "PageSize": 10,
              "Sort": { "Field": "FirmaAdi", "Dir": "asc" }

      }

      this.http.post(this.link, JSON.stringify(body), options)
        .map(res => res.json())
        .subscribe(data => {
          if(data.Status!==0)
          { this.Mesaj("Hata Oluştu!",data.Message)}
         // console.log(data);
          this.toplamKayit = Math.round(data.Total /10);
          this.totalPage = this.toplamKayit;
          console.log("Toplam Sayfa = ", this.toplamKayit);
        
          //this.users = JSON.stringify(data.Items);
          this.users =  data.Data;
         // this.c['this.users']=
          this.loading.dismiss();
        }, err => {
          this.Mesaj("Hata Oluştu!",err.message);
          console.log("Communication Error - Please verify connection and try again")
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
  FirmaCagir()
  {
    this.navCtrl.push(FirmalarPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FirmalistesiPage');
  //  this.getList();
  }
  doInfinite(infiniteScroll) {
    console.log("Page=",this.page, " Total Page=",this.totalPage);
    
    try {
      this.page = this.page + 1;
      let data: Observable<any>;
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
     console.log("Sayfa=",this.page);
      let body = {
        "ApiKey": "TESTDEMO",
        "SqlId": 144,
        "Page": this.page,
        "PageSize": 10,
        "Sort": { "Field": "FirmaAdi", "Dir": "asc" }

      }

      this.http.post(this.link, JSON.stringify(body), options)
        .map(res => res.json())
        .subscribe(data => {
          if (data.Status !== 0) { this.Mesaj("Hata Oluştu!", data.Message) }
          console.log(data);
          this.toplamKayit = Math.ceil(data.Total / 10);
          this.totalPage = this.toplamKayit;
          console.log("Toplam Kayıt = ", this.toplamKayit);
          //this.users = JSON.stringify(data.Items);
          for (let i = 0; i < data.Data.length; i++) {
            this.users.push(data.Data[i]);
          }
          //this.users = data.Data;
          this.loading.dismiss();
          infiniteScroll.complete();
        }, err => {
          this.Mesaj("Hata Oluştu!", err.message);
          console.log("Communication Error - Please verify connection and try again")
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
    
/*
    setTimeout(() => {
     this.getList(this.page);
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 3000);
    */
  }
  public Birlestir()
  {
    this.users.on('value',dt=>{
      let datalar=[];
     dt.array.forEach(element => {
       datalar.push(element.val());
       return false;
     });
      this.DataListe = datalar;
      this.loadedDataList = datalar;
    } );
    
  }
  initializeItems(): void {
    this.DataListe = this.users;
  }
  getItems(searchBar)
  {
    this.initializeItems();
    var q = searchBar.srcElement.value;
    if(!q)
      return;
    this.DataListe = this.DataListe.filter((v)=>{
      if(v.name && q){
        if(v.name.toLowerCase().indexOf(q.toLowerCase())>-1){
          return true;
        }
        return false;
      }
    });
    console.log(q," -- ",this.DataListe.length);
  }
  filterItems(ev: any) {
  //  this.initializeItems();
    let val = ev.target.value;
    console.log(val, " ", this.users.FirmaAdi);
    if (val && val.trim() !== '') {
      this.users = this.users.filter(function (item) {
        return item.FirmaAdi.toLowerCase().indexOf(val.toLowerCase());
      });
    }
  }
  filterItem(searchTerm:any) {

    return this.users.filter((item) => {
      return item.FirmaAdi.toLowerCase().includes(searchTerm.toLowerCase()) > -1;
    });

  }
}
