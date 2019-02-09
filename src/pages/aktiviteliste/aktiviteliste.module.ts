import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AktivitelistePage } from './aktiviteliste';


@NgModule({
  declarations: [
    AktivitelistePage,
  ],
  imports: [
    IonicPageModule.forChild(AktivitelistePage),
  ],
})
export class AktivitelistePageModule {}
