import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';



/*
  Generated class for the SqliteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

const DATABASE_FILE_NAME:string = "TRIZNOTE_DB.db";

@Injectable()
export class SqliteProvider {

    // chrome 웹인지 아니면 디바이스인지 구분자.
    public isAvailableSQL : boolean;

    public sqlite: SQLite = null;
    public sqlObject: SQLiteObject = null;

    constructor(/*public http: Http*/) {
        //console.log('Hello SqliteProvider Provider');
        this.sqlite = new SQLite();
    }

    openDatabase() {
		console.log("openDatabase 수행 ");
		return this.sqlite.create({
			name: DATABASE_FILE_NAME,
			location: 'default' // the location field is required
		}).then((sqlObject: SQLiteObject) => {
			console.log("open DB !!!!");
			// 지역 변수에 저장. (계속활용해야하므로)
			this.sqlObject = sqlObject;
			
		}).catch(e => console.log("Open DB Error :", e));
	}
    
    createTable() {
		return this.sqlObject.executeSql('CREATE TABLE IF NOT EXISTS TRIZ_ADS(adsCompany TEXT, adsDesc TEXT, adsImg TEXT, adsUrl TEXT, fromDate TEXT, toDate TEXT)', {} )
		.then(()	=>console.log("createTable !!!!") )
		.catch(e 	=> console.log(e) );
	}
    
    deleteAll() {
        let sql = 'delete  FROM TRIZ_ADS';
		return this.sqlObject.executeSql(sql, {})
		.then(resp => {
			return Promise.resolve("success");
		})
		.catch(e => console.log("Execute delete error : ", e));

    }

    getAll(): Promise<any[]>{
		let sql = 'SELECT * FROM TRIZ_ADS';
		return this.sqlObject.executeSql(sql, {})
		.then(resp => {
			let result = [];
			for (let i = 0; i < resp.rows.length; i++) {
				result.push(resp.rows.item(i));
			}
			return Promise.resolve(result);
		})
		.catch(e => console.log("Execute select error : ", e));
	}

    insert(dataObj : any) {
        let sql = 'INSERT INTO TRIZ_ADS(adsCompany , adsDesc , adsImg , adsUrl , fromDate , toDate ) VALUES(?,?,?,?,?,?)';

		return this.sqlite.create({
			name: 'TRIZNOTE_DB.db',
			location: 'default' // the location field is required
		}).then((sqlObject: SQLiteObject) => {
			sqlObject.executeSql(sql, [ dataObj.adsCompany , dataObj.adsDesc, dataObj.adsImg, dataObj.adsUrl, dataObj.fromDate, dataObj.toDate ])
				.catch(e => console.log("Execute create error : ", e));
		}).catch(e => console.log("Create Error :", e));
    }
}
