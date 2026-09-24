import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Principle_40Provider } from "../../providers/principle-40/principle-40";
import { Physical_4Provider } from "../../providers/physical-4/physical-4";
import { TechEvolutionProvider } from "../../providers/tech-evolution/tech-evolution";

// 시스템 진화
//import {Page4Sub01Page} from '../page4/page4-sub01/page4-sub01';
// 40 가지 발명 원리
//import {Page5Sub01Page} from '../page5/page5-sub01/page5-sub01';

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
interface IdataObject {
	index? : string;
	title? : string;
}

@IonicPage()
@Component({
	selector: 'page-search',
	templateUrl: 'search.html',
})


export class SearchPage {

	public prp40ArrResult: Object;
    public phy4ArrResult: Object;
    public techArrResult: Object;

	public arrayObjSample_01: object[] = [];
    public arrayObjSample_02: object[] = [];
    public arrayObjSample_03: object[] = [];


	public arrayObj_01: object[] = [];
    public arrayObj_02: object[] = [];
    public arrayObj_03: object[] = [];

	constructor(public navCtrl: NavController, public navParams: NavParams,
				public principle_40PV: Principle_40Provider, 
                public physical_4PV: Physical_4Provider,
                public tech_evolu: TechEvolutionProvider) {
		
        //40 가지 발명 원리 
        this.principle_40PV.loadAll().then(result => {
            this.prp40ArrResult = result;
            //40
            let count = Object.keys(this.prp40ArrResult).length;
            for (let i = 0 ; i < count ;i++) {
                
				let dataObj = {index : this.prp40ArrResult[i].index, title : this.prp40ArrResult[i].shortKo};
				this.arrayObj_01.push(dataObj);
				this.arrayObjSample_01.push(dataObj);
				 
            }
        });

        // 물리적 모순
        this.physical_4PV.loadAll().then(result => {
            this.phy4ArrResult = result;
            let count = Object.keys(this.phy4ArrResult).length;
    
            for (let i = 0 ; i < count ;i++) {
                let dataObj = {index : this.phy4ArrResult[i].index, title : this.phy4ArrResult[i].shortKo};
                
                this.arrayObj_02.push(dataObj);
                this.arrayObjSample_02.push(dataObj);
            }
        });

        // 시스템 진화
        this.tech_evolu.loadAll().then(result => {
            this.techArrResult = result;
        
            // 1 그룹 
            let count01 = Object.keys(this.techArrResult[0].content).length;
            for (let i = 0 ; i < count01 ;i++) {
                let dataObj = {index : this.techArrResult[0].content[i].index, title : this.techArrResult[0].content[i].ko_title};
                
                this.arrayObj_03.push(dataObj);
                this.arrayObjSample_03.push(dataObj);
            }

            // 2그룹
            let count02 = Object.keys(this.techArrResult[1].content).length;
            for (let i = 0 ; i < count02 ;i++) {
                let dataObj = {index : this.techArrResult[1].content[i].index, title : this.techArrResult[1].content[i].ko_title};
                
                this.arrayObj_03.push(dataObj);
                this.arrayObjSample_03.push(dataObj);
            }
            
        });


        //console.log("ddddddd");
        //this.initializeItems();

	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad SearchPage');
	}

	initializeItems() {
       //console.log("this.arrayObjSample_01->",this.arrayObjSample_01);
       //console.log("this.arrayObjSample_02->",this.arrayObjSample_02);
       this.arrayObj_01 = this.arrayObjSample_01;
       this.arrayObj_02 = this.arrayObjSample_02;
       this.arrayObj_03 = this.arrayObjSample_03;
    }

    getItems(ev: any) {
        // 처음 리스팅을 만들어주고 아래 필터링을 진행한다.
        this.initializeItems();

        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {

            this.arrayObj_01 = this.arrayObj_01.filter((item:IdataObject) => {
                  let str = item.index+". "+item.title;
                  return (str.toLowerCase().indexOf(val.toLowerCase()) > -1);
             })

            this.arrayObj_02 = this.arrayObj_02.filter((item:IdataObject) => {
                let str = item.index+". "+item.title;
                return (str.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })

            this.arrayObj_03 = this.arrayObj_03.filter((item:IdataObject) => {
                let str = item.index+". "+item.title;
                return (str.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }  
    }

    go40Page(pageNum){
        console.log(this.prp40ArrResult);
        this.navCtrl.push("Page5Sub01Page", {
            "objData": this.prp40ArrResult[pageNum]
        });
    }

    goPhyPage(pageNum) {
        this.navCtrl.push("Page2Sub01Page", {
             "objData": this.phy4ArrResult[pageNum]
        });
    }

    goEvoluPage(pageNum) {
        let groupNum = 0;
        
        if (pageNum == "0" || pageNum == "1" || pageNum == "2") {
            groupNum = 0;
        } else {
            groupNum = 1;
            pageNum = pageNum -3;
        }
    
        this.navCtrl.push("Page4Sub01Page", {
            "objData": this.techArrResult[groupNum].content[pageNum]
        });
    }
}
