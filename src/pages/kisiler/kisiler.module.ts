import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KisilerPage } from './kisiler';

@NgModule({
  declarations: [
    KisilerPage,
  ],
  imports: [
    IonicPageModule.forChild(KisilerPage),
  ],
})
export class KisilerPageModule {}
