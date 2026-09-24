import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Page3Sub01Page } from './page3-sub01';

@NgModule({
  declarations: [
    Page3Sub01Page,
  ],
  imports: [
    IonicPageModule.forChild(Page3Sub01Page),
  ],
  exports: [
    Page3Sub01Page
  ]
})
export class Page3Sub01PageModule {}
