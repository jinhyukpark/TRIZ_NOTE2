
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the AdsFirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AdsFirebaseProvider {

    public GlobalTest : string = "globaltest";
    public fireData : Object[] = [];

	constructor(public http: Http, public afd: AngularFireDatabase) {
		//console.log('Hello AdsFirebaseProvider Provider');
	}


	getADSItems() {
		//console.log( "=====>",this.afd.database.ref('/ads01/') );
		return this.afd.list('/');
	}

}
