import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';


import { DomSanitizer } from '@angular/platform-browser';
import { TechEvolutionProvider } from "../../providers/tech-evolution/tech-evolution";
//import { Page4Sub01Page } from "./page4-sub01/page4-sub01"

/**
 * Generated class for the Page4Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-page4',
	templateUrl: 'page4.html',
})
export class Page4Page {
	public techEvlouList: object;
	public platformType2: string = "";

	constructor(public navCtrl: NavController, public navParams: NavParams,
				public techEvolu: TechEvolutionProvider, private _sanitizer: DomSanitizer, 
				public platform: Platform) {

		this.techEvolu.loadAll().then(result => {
			this.techEvlouList = result;
			//console.log("==>", this.techEvlouList[0]);
		});

		if (this.platform.is('ios')) {
			this.platformType2 = "ios";
		}
	}

	getImage(imageUrl) {
		return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Page4Page');
	}

	goSubPage(groupIndex, pageNum) {
		this.navCtrl.push("Page4Sub01Page", {
            "objData": this.techEvlouList[groupIndex].content[pageNum]
        });
    }
    
    toggleSection(i) {
		this.techEvlouList[i].open = !this.techEvlouList[i].open;
	}

   

}

