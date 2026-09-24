import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
/**
 * Generated class for the Page2Sub01Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-page2-sub01',
	templateUrl: 'page2-sub01.html',
})
export class Page2Sub01Page {
	public phyObj: object;

	constructor(public navCtrl: NavController, public navParams: NavParams, private _sanitizer: DomSanitizer) {

		let objData = this.navParams.get("objData");
		this.phyObj = objData;
	}

	getImage(imageUrl) {
		return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad Page2Sub01Page');
	}

}
