import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { RequestOptions } from '@angular/http';
import 'rxjs/Rx';


/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
 // apiUrl = 'http://crmtransfer.veribiscrm.com/list';

  constructor(public http: HttpClient) {
    //console.log('Hello RestServiceProvider Provider');
  }
aktiviteList(urlstr:string){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  headers.append('Accept', 'application/json');
  
  //let options = new RequestOptions({headers:headers, withCredentials: true });
  let body = {
    ApiKey: '305ba54428e94cf0a50eeb27abac81c9',
    Api: 'Company',
    TransferID: null,
    Page: 0
  };
  this.http.post(urlstr , JSON.stringify(body), {
    headers: new HttpHeaders()
    .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
      .append('Accept', 'application/json')
    //.set('Content-Type', 'application/json'),
  })
    .subscribe(data => {
      console.log(JSON.stringify(data));
    }, error => {
      console.log(JSON.stringify(error));
    });
}
  activiteListe() {
    console.log("Aliste");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = {
      "ApiKey": "305ba54428e94cf0a50eeb27abac81c9",
      "Api": "Company",
      "TransferID": null,
      "Page": 0
    };
    var link = 'http://crmtransfer.veribiscrm.com/api/list';
    this.http.post(link, JSON.stringify(body), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
      .map(res => res)
      .subscribe(data => { console.log(data) });
  }
}
