import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

/**
 * Generated class for the Page3Sub01Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

interface IstrClass {
    ko_title? : string;
    class? :  string;
}


@IonicPage()
@Component({
	selector: 'page-page3-sub01',
	templateUrl: 'page3-sub01.html',
})
export class Page3Sub01Page {

	newItem: string = "";
	objData: Object;
    strClass : IstrClass;

	constructor(public navCtrl: NavController, public navParams: NavParams,
				private _sanitizer: DomSanitizer, private view : ViewController) {

        this.objData = this.navParams.get("objData");    
        this.strClass = this.objData;
                    
        if (this.strClass.ko_title.indexOf("1-") == 0 ) {
            this.strClass.class = "Class1";
        } else if (this.strClass.ko_title.indexOf("2-") == 0 ) {
            this.strClass.class = "Class2";
        }else if (this.strClass.ko_title.indexOf("3-") == 0 ) {
            this.strClass.class = "Class3";
        } else if (this.strClass.ko_title.indexOf("4-") == 0 ) {
            this.strClass.class = "Class4";
        } else if (this.strClass.ko_title.indexOf("5-") == 0 ) {
            this.strClass.class = "Class5";
        }
       
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad Page3Sub01Page');
	}

	closeModal() {
		this.view.dismiss();
	}

}
