import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Physical_4Provider } from "../../providers/physical-4/physical-4";
/**
 * Generated class for the Page2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-page2',
	templateUrl: 'page2.html',
})
export class Page2Page {

	public phyDatalist: object;
	public platformType: string = "";

	constructor(public navCtrl: NavController, public navParams: NavParams,
				public phyData: Physical_4Provider, public platform : Platform) {

		this.phyData.loadAll().then(result => {
			this.phyDatalist = result;
		});

		
		if (this.platform.is('ios')) {
			console.log("ios");
			this.platformType = "ios";
		} 
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad Page2Page');
	}

	goSubPage(pageNum) {
		this.navCtrl.push("Page2Sub01Page", {
             "objData": this.phyDatalist[pageNum]
        });
	}

}
