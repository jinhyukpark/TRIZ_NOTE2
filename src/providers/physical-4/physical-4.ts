import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Physical_4Provider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Physical_4Provider {
	phyData: Object;


	constructor(public http: Http) {
		console.log('Hello Physical_4Provider Provider');
		this.phyData = [
			{
				"index" 	: "1",
				"shortKo" 	: "시간의 분리",
                "shortEng"  : "Time",
				"longKo"	: "",
				"longEng"	: "",
				"frtImg"	: "http://placehold.it/50x50",
                "content"   : [
                    {
                        "title" : "구성요소의 속성이 시간에 따라 다른 특성을 가질수있는 경우에 적용",
                        "subTitle" : [""]
                    }
                    
                ],
                "expTitle"  : "전투기 날개",
                "expImg"	: "트리즈41.jpg",
                "expExp"    : "전투기의 날개는 이착륙 시 넓게 펴지만, 비행 중에는 고속 비행을 위해 날개를 접어 좁게 만든다."
			},
			{
				"index" 	: "2",
				"shortKo" 	: "공간의 분리",
                "shortEng"  : "Space",
				"longKo"	: "",
				"longEng"	: "",
				"frtImg"	: "http://placehold.it/50x50",
                "content"   : [
                    {
                        "title" : "구성요소의 속성이 공간에 따라 다른 특성을 가질수있는 경우에 적용",
                        "subTitle" : [""]
                    }
                    
                ],
                "expTitle"  : "이중 초점 안경",
                "expImg"	: "트리즈42.jpg",
                "expExp"    : "오목렌즈와 볼록렌즈가 공존함"
			},
			{
				"index" 	: "3",
				"shortKo" 	: "전체와 부분의 분리",
                "shortEng"  : "All & Part",
				"longKo"	: "",
				"longEng"	: "",
				"frtImg"	: "http://placehold.it/50x50",
                "content"   : [
                    {
                        "title" : "구성요소의 속성이 전체와 부분에 따라 다른 특성을 가질 수 있는 경우에 적용",
                        "subTitle" : [""]
                    }
                    
                ],
                "expTitle"  : "자전거 체인",
                "expImg"	: "트리즈43.jpg",
                "expExp"    : "자전거 체인은 전체적으로 유연하지만, 부분적으로 단단하다"
			},
			{
				"index" 	: "4",
				"shortKo" 	: "조건에 의한 분리",
                "shortEng"  : "Condition",
				"longKo"	: "",
				"longEng"	: "",
				"frtImg"	: "http://placehold.it/50x50",
                "content"   : [
                    {
                        "title" : "구성요소의 속성이 조건에 따라 다른 특성을 가질 수 있는 경우에 적용",
                        "subTitle" : [""]
                    }
                    
                ],
                "expTitle"  : "체",
                "expImg"	: "트리즈44.jpg",
                "expExp"    : "체는 통과하는 대상의 크기에 따라 통과 대상이 체의 눈보다 큰 조건에서는 막고(콩), 통과 대상이 체의 눈보다 작은 조건에서는 통과시킨다(좁쌀)."
			}
		]
	}

	loadAll() {
		return Promise.resolve(this.phyData);
	}
}
