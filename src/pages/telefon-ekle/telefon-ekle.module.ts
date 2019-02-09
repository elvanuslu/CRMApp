import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TelefonEklePage } from './telefon-ekle';

@NgModule({
  declarations: [
    TelefonEklePage,
  ],
  imports: [
    IonicPageModule.forChild(TelefonEklePage),
  ],
})
export class TelefonEklePageModule {}
