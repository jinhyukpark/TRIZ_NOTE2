import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Principle_40Provider} from "../../../providers/principle-40/principle-40";

/**
 * Generated class for the Page5Sub01Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-page5-sub01',
	templateUrl: 'page5-sub01.html',
})
export class Page5Sub01Page {
	public prp40Obj : object;

	constructor(public navCtrl: NavController, public navParams: NavParams, 
				public data40: Principle_40Provider, private _sanitizer: DomSanitizer) {
		
		let objData = this.navParams.get("objData");
        
		//console.log(objData);
		/*
		this.data40.loadAll().then(result => {
			this.prp40Obj = result[pageNum];
		});
		*/
		this.prp40Obj = objData;
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad Page5Sub01Page');
	}

	getImage(imageUrl) {
		return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
	}

}
