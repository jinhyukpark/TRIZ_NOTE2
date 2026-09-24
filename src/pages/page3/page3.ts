import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Standard_76Provider } from "../../providers/standard-76/standard-76";

/**
 * Generated class for the Page3Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-page3',
	templateUrl: 'page3.html',
})
export class Page3Page {
	data76list : object;

	constructor(public navCtrl: NavController, public navParams: NavParams,
		public data76: Standard_76Provider, public modalCtrl: ModalController) {

		this.data76.loadAll().then(result => {
			this.data76list = result;
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Page3Page');
	}

	toggleSection(i) {
		this.data76list[i].open = !this.data76list[i].open;
	}

	toggleItem(i, j) {
		this.data76list[i].content[j].open = !this.data76list[i].content[j].open; 
	}

	go76Detail(objData,strChild) {
       
        objData.parent = strChild;
        let modal = this.modalCtrl.create("Page3Sub01Page", {objData : objData});
        modal.present();
    }

}
