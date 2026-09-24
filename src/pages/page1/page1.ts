import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { TechTableProvider } from "../../providers/tech-table/tech-table";
import { Principle_40Provider } from "../../providers/principle-40/principle-40";
//import {Page5Sub01Page} from '../page5/page5-sub01/page5-sub01';

/**
 * Generated class for the Page1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-page1',
	templateUrl: 'page1.html',
})
export class Page1Page {

	public techDatalist: Object;
    public tehcArrResult : string[][];
    public prp40ArrResult :Object;

    impoveFactor : number = 0;
    deterioFactor : number = 0;
    retArrData : string[] = [];

	constructor(public navCtrl: NavController, public navParams: NavParams,
		public techDataPV: TechTableProvider,
		public principle_40PV: Principle_40Provider,
		public toastCtrl: ToastController) {

		this.navCtrl = navCtrl;
		this.techDataPV.loadTechDataAll().then(result => {
			this.techDatalist = result;
		});

		this.techDataPV.loadArrResultAll().then(result => {
			this.tehcArrResult = result;
		});

		this.principle_40PV.loadAll().then(result => {
			this.prp40ArrResult = result;
		});

		this.impoveFactor = 0;
		this.deterioFactor = 0;
		this.retArrData = [];

	}

	

	ionViewDidLoad() {
		//console.log('ionViewDidLoad Page1Page');
	}

	goBack() {
		this.navCtrl.pop();
	}

    go40Page(pageNum) {
        this.navCtrl.push("Page5Sub01Page", {
            "objData": this.prp40ArrResult[pageNum]
        });
    }

    onSelectChange(selectedValue : any) {
        this.retArrData = []
    }

    execute() {
        if(this.impoveFactor ==0 ) {
           let toast = this.toastCtrl.create({
                message: '개선 인자를 선택해주세요',
                duration: 2000,
                position: 'bottom'
            });
            toast.present();

        } else if (this.deterioFactor ==  0) {
            let toast = this.toastCtrl.create({
                message: '악화 인자를 선택해주세요',
                duration: 2000,
                position: 'bottom'
            });
            toast.present();
        } else {
            let retData : string = "";
            retData =  this.tehcArrResult[this.impoveFactor-1][this.deterioFactor-1];
            console.log("retArrData==>",retData);
            this.retArrData = retData.split(",");

        }

    }

}
