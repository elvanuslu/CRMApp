import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { Dialogs } from '@ionic-native/dialogs';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

import { Calendar } from '@ionic-native/calendar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AktivitelistePage } from '../pages/aktiviteliste/aktiviteliste';
import { ActivitePage } from '../pages/activite/activite';
import { KisilerPage } from '../pages/kisiler/kisiler';
import { FirmalarPage } from '../pages/firmalar/firmalar';
import { RaporlarPage } from '../pages/raporlar/raporlar';
import { AyarlarPage } from '../pages/ayarlar/ayarlar';
import { FirmalarPopPage } from '../pages/firmalar-pop/firmalar-pop';
import { AktiviteMenuPage } from '../pages/aktivite-menu/aktivite-menu';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { HttpProvider } from '../providers/http/http';
import { RestProvider } from '../providers/rest/rest';
import { FirmalistesiPage } from '../pages/firmalistesi/firmalistesi';
import { TelefonEklePage } from '../pages/telefon-ekle/telefon-ekle';
import { AdresEklePage } from '../pages/adres-ekle/adres-ekle';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AktivitelistePage,
    ActivitePage,
    KisilerPage,
    FirmalarPage,
    RaporlarPage,
    AyarlarPage,
    FirmalarPopPage,
    AktiviteMenuPage,
    FirmalistesiPage,
    TelefonEklePage,
    AdresEklePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AktivitelistePage,
    ActivitePage,
    KisilerPage,
    FirmalarPage,
    RaporlarPage,
    AyarlarPage,
    FirmalarPopPage,
    AktiviteMenuPage,
    FirmalistesiPage,
    TelefonEklePage,
    AdresEklePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    Dialogs,
    BarcodeScanner,
    Camera,
    Calendar,
    LocationTrackerProvider,
    Geolocation,
    BackgroundGeolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    RestProvider,
    
  ]
})
export class AppModule {
}
