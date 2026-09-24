import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Page4Sub01Page } from './page4-sub01';

@NgModule({
  declarations: [
    Page4Sub01Page,
  ],
  imports: [
    IonicPageModule.forChild(Page4Sub01Page),
  ],
  exports: [
    Page4Sub01Page
  ]
})
export class Page4Sub01PageModule {}
