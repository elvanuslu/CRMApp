import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AktiviteMenuPage } from './aktivite-menu';

@NgModule({
  declarations: [
    AktiviteMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(AktiviteMenuPage),
  ],
})
export class AktiviteMenuPageModule {}
