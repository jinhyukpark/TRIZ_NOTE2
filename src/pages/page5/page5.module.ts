import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Page5Page } from './page5';

@NgModule({
  declarations: [
    Page5Page,
  ],
  imports: [
    IonicPageModule.forChild(Page5Page),
  ],
  exports: [
    Page5Page
  ]
})
export class Page5PageModule {}
