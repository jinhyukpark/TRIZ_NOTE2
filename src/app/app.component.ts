
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
// 이미지 로더 
//import { ImageLoaderConfig } from 'ionic-image-loader';
// 이미지 캐싱
import { ImgcacheService } from '../global/services';
// FireBase
import { AdsFirebaseProvider } from '../providers/ads-firebase/ads-firebase';
import { FirebaseListObservable } from 'angularfire2/database';
// SQLITE
import {  SqliteProvider } from '../providers/sqlite/sqlite';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild('nav') nav: Nav;
	//rootPage: any = HomePage;
    rootPage: any = null;

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
		//imageLoaderConfig: ImageLoaderConfig,
        public adsFirebase : AdsFirebaseProvider,
        public imgcacheService: ImgcacheService,
        public sqlProvider : SqliteProvider ) {
        
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			
            if ( platform.is('ios') || platform.is('android') ) {
				this.sqlProvider.openDatabase()
				.then((value : void) =>this.sqlProvider.createTable())
				.then((value : void) => {
                    this.rootPage = HomePage;
                    splashScreen.hide();   

                    // 이미지 캐시 라이브러리 초기화 하고 루트 지정
                    imgcacheService.initImgCache().then(() => {
                        this.nav.setRoot(this.rootPage);
                    });
                    sqlProvider.isAvailableSQL = true;
				}).catch(e => {
                    // SQLite 연결 문제시 바로 index 페이지로 연결
                    //this.rootPage = "IndexPage"
                    this.rootPage = HomePage; 
                    splashScreen.hide(); 
                    // 이미지 캐시 라이브러리 초기화 하고 루트 지정
                    imgcacheService.initImgCache().then(() => {
                        this.nav.setRoot(this.rootPage);
                    });
                    
                    sqlProvider.isAvailableSQL = false;
                });
			}else {
				console.log("Browser !!!");
                this.rootPage = HomePage;
                splashScreen.hide(); 
				

                // 이미지 캐시 라이브러리 초기화 하고 루트 지정
                imgcacheService.initImgCache().then(() => {
                    this.nav.setRoot(this.rootPage);
                });
			}
		});

       /*
		// 이미지 로더 디버그 모드로 실행 : 콘솔로 각종 에러 출력
		imageLoaderConfig.enableDebugMode();
		// 해당 URL 에 대한 이미지가 없을때 fallback 이미지.
		// imageLoaderConfig.setFallbackUrl('assets/fallback.png');
		// base64
		imageLoaderConfig.setImageReturnType('base64');
		// 동시 연결 커넥션 
		imageLoaderConfig.setConcurrency(5);

        imageLoaderConfig.enableSpinner(true);
		imageLoaderConfig.setSpinnerColor('secondary');
		imageLoaderConfig.setSpinnerName('bubbles');
		imageLoaderConfig.maxCacheSize = 5 * 1024 * 1024; 	// 3 MB
		//imageLoaderConfig.maxCacheAge = 60 * 60 * 1000; 	// 1 hour
		imageLoaderConfig.maxCacheAge = 60  * 60 * 12 * 1000; 	// 12 hour
        */
	}
}

