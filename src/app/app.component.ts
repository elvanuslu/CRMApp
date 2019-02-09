import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AktivitelistePage } from '../pages/aktiviteliste/aktiviteliste';
import { KisilerPage } from '../pages/kisiler/kisiler';
import { FirmalarPage } from '../pages/firmalar/firmalar';
import { RaporlarPage } from '../pages/raporlar/raporlar';
import { AyarlarPage } from '../pages/ayarlar/ayarlar';
import { FirmalistesiPage } from '../pages/firmalistesi/firmalistesi';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    statusBar.styleLightContent();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Ana Sayfa', component: HomePage },
      { title: 'Aktiviteler', component: AktivitelistePage},
      { title: 'Kişiler', component: KisilerPage },
      { title: 'Firmalar', component: FirmalarPage },
      { title: 'Raporlar', component: RaporlarPage },
      { title: 'Ayarlar', component: AyarlarPage },
      { title: 'Firmalar Listesi', component:FirmalistesiPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(page.component);
    this.nav.setRoot(page.component);
  }
  openKisiler(){
    this.nav.push(KisilerPage);
  }
  openAktivitelistePage() {
    this.nav.push(AktivitelistePage);
  }
  openHomePage() {
    this.nav.push(HomePage);
  }
  openFirmalarPage() {
   // this.nav.push(FirmalarPage);
   this.nav.push(FirmalistesiPage);
  }
  openRaporlarPage() {
    this.nav.push(RaporlarPage);
  }
  openAyarlarPage() {
    this.nav.push(AyarlarPage);
  }
}
