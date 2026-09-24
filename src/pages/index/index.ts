// SQLITE
import {  SqliteProvider } from '../../providers/sqlite/sqlite';

import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
// firebase 추가
import { AdsFirebaseProvider } from './../../providers/ads-firebase/ads-firebase';
import { FirebaseListObservable } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
// Orientation
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/**
 * Generated class for the IndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-index',
    templateUrl: 'index.html',
})
export class IndexPage {
    //fireData : any[] = [];

    //TextWithHtmlTags : string;
    adsFireList : FirebaseListObservable<any[]>;
    adsFireArray : any[] = [];

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams,
                public adsFirebase : AdsFirebaseProvider,
                public afd: AngularFireDatabase,
                public sqlProvider : SqliteProvider,
                private screenOrientation: ScreenOrientation) {
        
        // firebase 값을 sqlite 에 저장
        this.getFire();

        // allow user rotate
        this.screenOrientation.unlock();
    }

    ionViewDidLoad() {
       // console.log('ionViewDidLoad IndexPage');
       // index 페이지로 들오온 시점에 firebase 와 sqlite 를 동기화 시킨다.
       
    }

    getFire() {
       
        return this.adsFirebase.getADSItems().subscribe( 
            (result)=> {
                if (result) {
                    this.adsFirebase.fireData = [];
                    
                    for (let i = 0 ; i < result.length ; i++) {
                        this.adsFireArray.push({
                            adsCompany   : result[i].adsCompany,
                            adsDesc     : result[i].adsDesc,
                            adsImg      : result[i].adsImg,
                            adsUrl      : result[i].adsUrl,
                            fromDate    : result[i].fromDate,
                            toDate      : result[i].toDate
                        });
                    }
                    console.log("this.adsFireArray===>",this.adsFireArray.length);
                    if (this.adsFireArray.length > 0) {
                        this.insertSQLite(this.adsFireArray);
                    }                     
                } 
            },
            (err)=> {
                console.log("getFire Data 오류 :", err);
            }
        );
    }

    // SQLite 에 입력
    insertSQLite(data) {
    
        if (this.sqlProvider.isAvailableSQL) {
            this.sqlProvider.deleteAll()
                .then(result => {
                    if (result == "success" ){
                        console.log("delete 성공 !!!!");
                        for (let i = 0 ; i < data.length ; i++) {
                            this.sqlProvider.insert(data[i]);
                        }

                    }
                }).catch(e => console.log("Delete DB Error : ", e));
        }
    }


    goToPage1() {
        this.navCtrl.push("Page1Page");
    }
    goToPage2() {
        this.navCtrl.push("Page2Page");
    }
    goToPage3() {
        this.navCtrl.push("Page3Page");
    }
    goToPage4() {
        this.navCtrl.push("Page4Page");
    }
    goToPage5() {
        this.navCtrl.push("Page5Page");
    }
    goToPage6() {
        this.navCtrl.push("Page6Page");
    }

    goCompany() {
        this.navCtrl.push("CompanyPage", {}, {animate:true, direction:'back'});
    }

    goSearch() {
        this.navCtrl.push("SearchPage");
    }

    goHelp() {
        let modal = this.modalCtrl.create("HelpPage");
        modal.present();
    }
}
