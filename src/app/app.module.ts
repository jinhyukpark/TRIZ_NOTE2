import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { HttpModule } from '@angular/http'
import { Physical_4Provider } from '../providers/physical-4/physical-4';
import { Principle_40Provider } from '../providers/principle-40/principle-40';
import { Standard_76Provider } from '../providers/standard-76/standard-76';
import { TechTableProvider } from '../providers/tech-table/tech-table';

import { IndexPage } from './../pages/index/index';
import { HelpPage } from './../pages/help/help';
import { Page1Page } from '../pages/page1/page1';
import { Page2Page } from '../pages/page2/page2';
import { Page3Page } from '../pages/page3/page3';
import { Page4Page } from '../pages/page4/page4';
import { Page5Page } from '../pages/page5/page5';
import { Page6Page } from '../pages/page6/page6';

import {Page2Sub01Page} from '../pages/page2/page2-sub01/page2-sub01';
import {Page4Sub01Page} from '../pages/page4/page4-sub01/page4-sub01';
import {Page5Sub01Page} from '../pages/page5/page5-sub01/page5-sub01';
import { TechEvolutionProvider } from '../providers/tech-evolution/tech-evolution';
import { AdsFirebaseProvider } from '../providers/ads-firebase/ads-firebase';

// firebase 추가해준것
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
// image loader 추가 
//import { IonicImageLoader } from 'ionic-image-loader';
// image csche  추가 
import { LazyImgComponent }   from '../global/components/';
import { LazyLoadDirective }   from '../global/directives/';
import { ImgcacheService }    from '../global/services/';
// 로커 스토리지.
//import { IonicStorageModule } from '@ionic/storage';
import { SqliteProvider } from '../providers/sqlite/sqlite';
// 네트워크 추가
import { Network } from '@ionic-native/network'
// orientation 추가
import { ScreenOrientation } from '@ionic-native/screen-orientation'


// firebaseConfigu
const firebaseConfig = {
	apiKey: "AIzaSyDwhy7TRwXg4xnT4bUDL34CeOlZ1xQRVrk",
	authDomain: "triznote.firebaseapp.com",
	databaseURL: "https://triznote.firebaseio.com",
	projectId: "triznote",
	storageBucket: "triznote.appspot.com",
	messagingSenderId: "272878428012"
};

@NgModule({
	declarations: [
		MyApp,
		HomePage,
        //Page5Sub01Page,
        //Page4Sub01Page,
    
        LazyImgComponent,
        LazyLoadDirective

	],
	imports: [
		BrowserModule,
		HttpModule,

		//firebase 추가
		AngularFireDatabaseModule,
		AngularFireModule.initializeApp(firebaseConfig),
		//이미지 로더 추가
		//IonicImageLoader.forRoot(),
        //IonicStorageModule.forRoot(),
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
        HomePage,
        //Page5Sub01Page,
        //Page4Sub01Page,
        
		
        LazyImgComponent
		
	],
	providers: [
		StatusBar,
		SplashScreen,
        
        ImgcacheService,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		Physical_4Provider,
		Principle_40Provider,
		Standard_76Provider,
		TechTableProvider,
    	TechEvolutionProvider,
    	AdsFirebaseProvider,
        SqliteProvider,
        Network, 
        ScreenOrientation,
        
	]
})
export class AppModule { }
