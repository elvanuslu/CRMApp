import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivitePage } from './activite';

@NgModule({
  declarations: [
    ActivitePage,
  ],
  imports: [
    IonicPageModule.forChild(ActivitePage),
  ],
})
export class ActivitePageModule {}
