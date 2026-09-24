import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';
import { Principle_40Provider } from "../../providers/principle-40/principle-40";

//import { Page5Sub01Page } from "./page5-sub01/page5-sub01"

/**
 * Generated class for the Page5Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-page5',
	templateUrl: 'page5.html',
})
export class Page5Page {
	public data40list: object;
	public platformType2: string = "";

	constructor(public navCtrl: NavController, public navParams: NavParams,
				public data40: Principle_40Provider, private _sanitizer: DomSanitizer, 
				public platform: Platform) {
		
		this.data40.loadAll().then(result => {

			this.data40list = result;
		});

		if (this.platform.is('ios')) {
			this.platformType2 = "ios";
		}
	}

	getImage(imageUrl) {
		return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad Page5Page');
	}

	goSubPage(pageNum) {
		/*
		this.navCtrl.push(page5_sub01, {
            "pageNum": pageNum
        });
		*/
		
		this.navCtrl.push("Page5Sub01Page", {
            "objData": this.data40list[pageNum]
        });
	}
}
