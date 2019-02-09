import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ActivitePage } from '../activite/activite';
import { RestProvider } from '../../providers/rest/rest';
//import { HTTP } from '@ionic-native/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';



/**
 * Generated class for the AktivitelistePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aktiviteliste',
  templateUrl: 'aktiviteliste.html',

})

  @Injectable()
export class AktivitelistePage {
  users:any=[];
  urlstr:any=[];
  x1:number;
  loading:Loading;
  link = 'http://crmtransfer.veribiscrm.com/api/list';


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    private statusBar: StatusBar,
    private http: Http,
  public httpclient: HttpClient,
    public loadingCtrl: LoadingController) {
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleLightContent();// .backgroundColorByHexString('#ffffff');
   
    this.presentLoadingDefault();
   this.getList();
  // this.getListe();
  //this.getPost();
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
  goToOtherPage() {
    this.navCtrl.push(ActivitePage);
  }
  
 
  getList(){
    try{
    
      let data:Observable<any>;
    let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', 'http://crmtransfer.veribiscrm.com/api/list');
      headers.append('Access-Control-Allow-Origin', 'http://localhost:8100');
      headers.append('Content-Type', 'application/json'); //'application/x-www-form-urlencoded');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers});
    let body = {
      ApiKey: "305ba54428e94cf0a50eeb27abac81c9",
      Api: "Company",
      TransferID: null,
      Page: 0
    };
    
   this.http.post(this.link,JSON.stringify(body),options)
   .map(res=>res.json())
     .subscribe(data => {
     //this.users = JSON.stringify(data.Items);
    this.users = data.Items;
    //console.log(this.users[1].Name);
    // console.log(this.users);

     //alert(data.Items);
     this.loading.dismiss();
   });
  }
  catch(ex){
    console.log(ex);
    alert(ex);
  }
  }
  private logResponse(res: Response){
    console.log(res);
  }
  private extractData(res: Response){
    return res.json();
  }

  private getPost(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
        'Access-Control-Allow-Origin': 'http://crmtransfer.veribiscrm.com/api/list'
      })
    };
    let body = {
      ApiKey: "305ba54428e94cf0a50eeb27abac81c9",
      Api: "Company",
      TransferID: null,
      Page: 0
    };
    return this.httpclient.post(this.link, JSON.stringify(body), httpOptions)
      .map(res=>res)
      .subscribe(data=>{
        let Liste = JSON.stringify(data);
        console.log(JSON.stringify(data));
      });
  }
}
