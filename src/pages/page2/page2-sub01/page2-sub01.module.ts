import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Page2Sub01Page } from './page2-sub01';

@NgModule({
  declarations: [
    Page2Sub01Page,
  ],
  imports: [
    IonicPageModule.forChild(Page2Sub01Page),
  ],
  exports: [
    Page2Sub01Page
  ]
})
export class Page2Sub01PageModule {}
