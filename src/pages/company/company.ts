import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CompanyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-company',
    templateUrl: 'company.html',
})
export class CompanyPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CompanyPage');
    }

    goToURL(openUrl) {
        window.open(openUrl);
    }

    goBack() { 
        this.navCtrl.pop({animate: true, direction: 'forward'}) 
    }
}
