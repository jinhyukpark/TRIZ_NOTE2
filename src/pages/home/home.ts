
import { Component } from '@angular/core';
import { NavController,Loading, Platform } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
// SQLITE
import {  SqliteProvider } from '../../providers/sqlite/sqlite';
// Orientation
import { ScreenOrientation } from '@ionic-native/screen-orientation';

class doClass {
    constructor (public adsCompany : string, public adsTitle : string, 
                public adsDesc : string, public adsImg : string,
                public fromDate : string, public toDate : string) {

    }
}

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public slides : Object[] = [];

    constructor(public navCtrl: NavController, 
                public _sanitizer: DomSanitizer,
                public sqlProvider : SqliteProvider,
                public platform : Platform,
                private screenOrientation: ScreenOrientation
                ) {
        
        console.log(this.screenOrientation.type); 
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        // insert 
        /*
        let data = {
            adsCompany : "aaaa" , 
            adsDesc  : "bbb", 
            adsImg : "cccc",
            adsUrl : "dddd", 
            fromDate : "eeee", 
            toDate : "ggggg"
        }

        this.sqlProvider.insert(data)
                .then(response => {
                    console.log("insert 성공");
                })
                .catch(error => {
                    console.error(error);
                })
        */

    }
    
    ionViewDidLoad() {
        //device 라면 
        if ( ( this.platform.is('ios') || this.platform.is('android') ) && this.sqlProvider.isAvailableSQL ) {
            console.log("DB home 에서 사용 가능!!!!");
            this.getAllAds();
        
        // 일반 웹 이라면
        } else {
            this.getSampleSlide();
        }
	}

    getSampleSlide() {
        this.slides = [];
        this.slides.push({
            adsCompany    : "Solving Mill",
            adsImg      : "assets/img/ads/solvingmill_bg.jpg",
            adsUrl      : "http://www.solving-mill.com/",
            adsDesc     : "문제상황 분석부터 해결방안의 효율성 점검까지<br>특수한 기술문제 해결의 지원을 위한<br> 편리하고 유용한 소프트웨어를 만듭니다.",
        });
        this.slides.push({
            //adsCompany    : "BnTree",
           adsCompany    : "BnTree",
            adsImg      : "assets/img/ads/bntree_bg.jpg",
            adsUrl      : "http://www.bntree.com/",
            adsDesc     : "교육, 컨퍼런스, 세미나 등 비즈니스 이벤트를<br>기획, 운영하는 회사로 휴먼 네트워킹과 지식<br>유통 서비스를 제공합니다.",
        });
        this.slides.push({
            //adsCompany    : "Invention-Drill",
            adsCompany    : "Invention-Drill",
            adsImg      : "assets/img/ads/targetinvention_bg.jpg",
            adsUrl      : "http://www.bntree.com/",
            adsDesc     : "4차산업의 기폭제 TRIZ !!! <br> 창의적 문제 해결 전문 솔루션 기업으로 <br>다양한 문제해결 솔루션을 제공합니다.",
        });
    }

    getAllAds() {
		return this.sqlProvider.getAll()
			.then(result => {
                // DB 에 아무 값도 없다면 로컬 이미지를 보여준다.
                if (result.length == 0 ) {
                    this.getSampleSlide();
                // DB 에 값이 있다면 그값으로 slide 를 채운다.
                } else {
                    this.slides = [];
                    this.slides = result;
                    console.log("home, this.slides==>",this.slides);
                }
			}).catch(e => console.log("Open DB Error :", e));
	}

  
    ionViewCanEnter() {
       //console.log("ionViewCanEnter");
    }

    getImage(imageUrl) {
		return this._sanitizer.bypassSecurityTrustUrl(imageUrl);
	}

    goToIndex() {
        this.navCtrl.push("IndexPage");
    }

    goToURL(openUrl) {
        window.open(openUrl);
    }
}
