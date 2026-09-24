import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { TechEvolutionProvider } from "../../../providers/tech-evolution/tech-evolution";



/**
 * Generated class for the Page4Sub01Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-page4-sub01',
	templateUrl: 'page4-sub01.html',
})
export class Page4Sub01Page {

	public prpTechEvolu : object;


	constructor(public navCtrl: NavController, public navParams: NavParams,
				public techEvolu: TechEvolutionProvider, private _sanitizer: DomSanitizer) {
		
		let objData = this.navParams.get("objData");
		this.prpTechEvolu = objData;	 
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad Page4Sub01Page');
	}

	getImage(imageUrl) {
		return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
	}


}
