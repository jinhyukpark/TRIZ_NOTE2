import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Principle_40Provider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Principle_40Provider {
	data40: Object;
	
	constructor(public http: Http) {
		//console.log('Hello Principle_40Provider Provider');
		this.data40 = [
			{
				"index": "1",
				"shortKo": "분할",
				"shortEng": "Segmentation",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "대상을 독립적인 여러 부분으로 나눈다.",
						"subTitle": ["메인 프레임 컴퓨터를 개인용 컴퓨터로 나눈다.", "큰 트럭을 여러대의 작은 트럭으로 나눈다."]
					},
					{
						"title": "대상을 분해/조립이 쉽도록 설계한다",
						"subTitle": ["조립가구, 모듈화 된 컴퓨터 부품, 접는 나무자", "작은 길이로 나누어진 정원용 호수는 필요한 길이만큼 조립하여 사용한다"]
					},
					{
						"title": "대상을 가능한 많은 부분으로 나눈다.",
						"subTitle": ["용접봉 대신 금속 분말을 사용한다.", "커튼을 블라인드로 바꾼다."]
					}
				],
				"expTitle": "물 분사 방식",
				"expImg": "트리즈01.jpg",
				"expExp": "식물의 물을 직접 분사하면 식물이 손상된다. 이를 방지 하기 위해 물 분사 방식을 단일분사에서 안개분사로 바꾼다."
			},


			{
				"index": "2",
				"shortKo": "추출",
				"shortEng": "Extraction",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "대상으로부터 원치 않는 부분이나 물성을 추출한다.",
						"subTitle": ["룸 에어컨의 실외기는 건물 밖에 설치한다"]
					},
					{
						"title": "대상으로부터 필요한 부분이나 물성만 추출한다",
						"subTitle": ["공항에서 새를 쫓기 위해 새가 무서워하는 소리를 녹음하여 틀어놓는다", "광산 구조장비의 냉각장치를 등에 메지 않고, 필요한 냉기만 지상에서 호스로 공급한다"]
					}
				],
				"expTitle": "헤드라이트 배터리 추출",
				"expImg": "트리즈02.jpg",
				"expExp": "헤드라이트의 무게를 줄이기 위해 가장 무거운 배터리를 머리부분에서 추출하여 별도로 연결함"
			},
			{
				"index": "3",
				"shortKo": "국부적 품질",
				"shortEng": "Local Quality",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "대상의 구조나 외부 환경을 균질에서 비균질로 바꾼다.",
						"subTitle": ["대상의 구조 : 균질 밀도/형상 → 비균질 밀도/형상", "외부 환경 : 일정온도/압력 → 가변온도/압력"]
					},
					{
						"title": "다른 부분에 대해서는 다른 기능을 설정한다",
						"subTitle": ["식판은 각기 다른 음식을 담도록 여러가지 형태를 갖춘다"]
					},
					{
						"title": "대상의 각 부분은 최상의 작동 조건이 되는 곳에 위치해야 한다",
						"subTitle": ["지우개 달린 연필, 못을 뽑을 수 있는 망치, 맥가이버 칼"]
					}
				],
				"expTitle": "휴대용 손 선풍기",
				"expImg": "트리즈03.jpg",
				"expExp": "몸 전체를 다 시원하게 하기보다 햇볕에 노출된 머리 부분만 식히기 위해 휴대용 손 선풍기를 개발함"
			},
			{
				"index": "4",
				"shortKo": "대칭성 변경",
				"shortEng": "Symmetry Change",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "대칭형에서 비대칭형으로 바꾼다.",
						"subTitle": ["밀가루 반죽용 비대칭 반죽 날(큰날/작은날)"]
					},
					{
						"title": "대상이 이미 비대칭이라면, 비대칭 정도를 증가시킨다",
						"subTitle": ["21단 기어 (앞기어 3단 × 뒷기어 7단) → 27단 기어 (앞기어 3단 × 뒷기어 9단)"]
					}
				],
				"expTitle": "비대칭을 활용한 인체공학적 마우스",
				"expImg": "트리즈04.jpg",
				"expExp": "손으로 잡기 편하게 마우스 형태를 손 모양에 맞추어 좌우 양쪽을 비대칭으로 함"
			},
			{
				"index": "5",
				"shortKo": "통합",
				"shortEng": "Merging",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "인접하여 작동하는 대상의 동일한 부분은 공간적으로 하나로 통합한다",
						"subTitle": ["개인용 컴퓨터를 네트워크로 연결한다", "병렬처리 컴퓨터 내 여러 개의 마이크로 프로세서"]
					},
					{
						"title": "동일한 작동이나 인접한(관련된) 작동은 시간적으로 동시에 수행되도록 통합한다",
						"subTitle": ["다양한 혈액검사를 동시에 할 수 있는 의료진단 기기"]
					}
				],
				"expTitle": "여행용 멀티 어댑터",
				"expImg": "트리즈05.jpg",
				"expExp": "전 세계 13종류의 어댑터를 하나로 통합함"
			},
			{
				"index": "6",
				"shortKo": "다기능/다용도",
				"shortEng": "Multi-Functionality",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "한 대상이 몇 가지 다른 기능들을 수행할 수 있다 따라서, 다른 대상은 제거될 수 있다.",
						"subTitle": ["칫솔 손잡이에 치약이 들어 있다"]
					}
				],
				"expTitle": "노트북/마우스 거치대 + 노트북 가방",
				"expImg": "트리즈06.jpg",
				"expExp": "사용자의 편의성을 향상시키기 위해 가방이 노트북과 마우스 거치대의 기능을 함"
			},
			{
				"index": "7",
				"shortKo": "중첩",
				"shortEng": "Nesting",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "물체를 다른 물체 속에 넣는다. 그 물체는 또 다른 물체 속에 넣는다. 이런 패턴을 반복한다.",
						"subTitle": ["종이컵, 여행용 코펠"]
					},
					{
						"title": "대상이 빈공간을 지나 다른 대상 안으로 들어가게 한다.",
						"subTitle": ["망원경, 접는 라디어 안테나, 접는 지시봉"]
					}
				],
				"expTitle": "쇼핑 카트",
				"expImg": "트리즈07.jpg",
				"expExp": "좁은 공간 내 많은 Cart를 보관하기 위하여 포개지는 쇼핑 Cart가 개발됨"
			},
			{
				"index": "8",
				"shortKo": "균형추/무게보상",
				"shortEng": "Weight Compensation",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "대상을 부력/상승력을 갖는 다른 물체에 결합하여 지지한다.",
						"subTitle": ["헬륨가스가 든 풍선에 광고물을 매단다."]
					},
					{
						"title": "대상을 상승력을 갖는 환경(공기, 물)과 상호작용시켜 지지한다",
						"subTitle": ["비행기 날개 형상은 바람에 대해 양력을 갖는다"]
					}
				],
				"expTitle": "물에 뜨는 국자",
				"expImg": "트리즈08.jpg",
				"expExp": "국자의 손잡이가 국 속으로 들어가는 것을 방지하기 위해 손잡이에 부력을 갖는 부분을 추가하여 만듦"
			},
			{
				"index": "9",
				"shortKo": "사전 반대조치",
				"shortEng": "Anti-action in Advance",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "초과 또는 원하지 않는 작용을 보상하기 위하여 미리 반대로 조치해 둔다",
						"subTitle": ["자동차 차체 지지를 위해 사용하는 판 스프링은 하중을 지지하기 위하여 U자 형태로 휘어서 만듦"]
					}
				],
				"expTitle": "자동차의 판 스프링",
				"expImg": "트리즈09.jpg",
				"expExp": "차량용 판 스프링은 차체에 가해질 충격에 대비하여 U자 형태로 휘어 미리 반대방향의 응력을 걸어줌"
			},
			{
				"index": "10",
				"shortKo": "사전 조치",
				"shortEng": "Action in Advance",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "대상의 요구되는 변화를 미리 일부 또는 전부를 조치한다.",
						"subTitle": ["미리 풀칠한 벽지, 수술도구를 미리 소독한다."]
					},
					{
						"title": "바로 편하게 사용할 수 있도록 최상의 위치에 대상을 미리 조치해 둔다",
						"subTitle": ["공장에서 JIT(Just In Time) 방식에 의해 생산자재를 적기에 라인에 투입한다."]
					}
				],
				"expTitle": "풀이 칠해진 우표/스티커 우표",
				"expImg": "트리즈10.jpg",
				"expExp": "우표 뒷면에 미리 접착물질을 발라둠"
			},
			{
				"index": "11",
				"shortKo": "사전 대비",
				"shortEng": "Cushion in Advance",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "안전, 보안, 위급상황과 관련하여 대상의 낮은 신뢰성을 보완 및 보상하기 위해 미리 대비한다.",
						"subTitle": ["차 에어백, 구명보트를 갖춘 배, 보조 낙하산"]
					}
				],
				"expTitle": "휴대용 범퍼 케이스",
				"expImg": "트리즈11.jpg",
				"expExp": "충격에 의한 휴대폰 파손을 방지하기 위해 범퍼 케이스를 휴대폰에 씌움"
			},
			{
				"index": "12",
				"shortKo": "높이 맞추기",
				"shortEng": "Equipotentiality",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "물체를 올리지도 내리지도 않는다.",
						"subTitle": ["자동차 엔진오일을 교환할 때 차를 지면과 같은 높이로 맞춘 상태에서 작업자가 땅속으로 파진 홈 안에서 작업"]
					}
				],
				"expTitle": "차량용 팔레트 상/하차 장치",
				"expImg": "트리즈12.jpg",
				"expExp": "트럭과 지면의 단차를 자동으로 맞추어 주는 상/하차 장치"
			},
			{
				"index": "13",
				"shortKo": "거꾸로 하기",
				"shortEng": "Do It in Reverse",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "요구되는 작용을 거꾸로 한다",
						"subTitle": ["포개진 금속 컵 분리 시 바깥을 가열하지 않고 내부를 냉각시킨다."]
					},
					{
						"title": "대상 또는 외부환경 요소를 움직이는 부분으로 고정하고, 정지부분은 움직이게 하라.",
						"subTitle": ["사람은 서게 하고 보도를 움직이게 한다.(Moving Walk)"]
					},
					{
						"title": "대상을 뒤집어라.",
						"subTitle": ["제품 하단에 스크류 작업을 할 때 제품을 뒤집는다", "컨테이너의 곡물을 비울 때 컨테이너를 뒤집어서 비운다."]
					},
				],
				"expTitle": "러닝머신 (Treadmill)",
				"expImg": "트리즈13.jpg",
				"expExp": "공간 활용도를 높이기 위해 사람 대신 바닥이 움직이게 함"
			},
			{
				"index": "14",
				"shortKo": "곡률 증가",
				"shortEng": "Curvature Increase",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "직선 → 곡선, 평면 → 구면, 입방체 → 구형으로 바꾼다.",
						"subTitle": ["직선톱을 회전형 둥근 톱으로 만든다."]
					},
					{
						"title": "롤러, 볼, 나선형을 사용한다.",
						"subTitle": ["잉크가 잘 나오게 볼펜 끝에 볼을 사용한다."]
					},
					{
						"title": "직선 운동을 회전운동으로 바꾸어 원심력을 활용하라.",
						"subTitle": ["원심력으로 세척/탈수를 하는 회전식 물걸레 청소기"]
					},
				],
				"expTitle": "회전식 물걸레 청소기",
				"expImg": "트리즈14.jpg",
				"expExp": "물걸레 청소를 용이하게 하기 위하여 손잡이를 상하로 누르면 원형 물걸레가 회전하면서 세척/탈수가 됨"
			},
			{
				"index": "15",
				"shortKo": "동적 구조",
				"shortEng": "Dynamic Parts",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "대상이나 외부환경의 특성을 각 동작 단계마다 최상이 되도록 변화시킨다.",
						"subTitle": ["자동차 전동거울, 의자, 핸들 조정장치"]
					},
					{
						"title": "만약 대상이 고정상태라면 움직일 수 있게 하라. 대상을 교체 가능 할 수 있게 하라.",
						"subTitle": ["위장 검진을 위한 유연한 내시경"]
					},
					{
						"title": "서로 상대적으로 위치를 변경할 수 있는 구성요소로 대상을 나눠라.",
						"subTitle": ["컴퓨터 키보드가 펼쳐진다. "]
					},
				],
				"expTitle": "속도에 따라 모양이 변하는 자동차",
				"expImg": "트리즈15.jpg",
				"expExp": "자동차의 속도(정지/저속/고속)에 따라 모양이 바뀜"
			},
			{
				"index": "16",
				"shortKo": "부족/과동작",
				"shortEng": "Partial or Excessive Action",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "원하는 결과를 100% 달성이 어렵다면, '조금 덜' 또는 '조금 더' 하는 방법으로 해결한다.",
						"subTitle": ["페인트로 도장할 때 초과해서 칠하고 여분은 제거한다."]
					}
				],
				"expTitle": "곡식의 양을 측정하는 되질",
				"expImg": "트리즈16.jpg",
				"expExp": "정확한 곡식의 양을 측정하기 위해 많이 담은 뒤 여분을 제거함"
			},
			{
				"index": "17",
				"shortKo": "차원 변경",
				"shortEng": "Transition into a New Dimension",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "대상의 배치/운동을 1차원→2차원→3차원으로 바꾼다",
						"subTitle": ["자이로 마우스는 평면 대신에 공간에서 움직인다."]
					},
					{
						"title": "대상을 다층으로 구성하여 활용한다",
						"subTitle": ["CD를 여러 층으로 넣고 재생 가능한 CD 플레이어"]
					},
					{
						"title": "대상을 기울이거나 옆 방향으로 둔다.",
						"subTitle": ["덤프 트럭"]
					},
					{
						"title": "주어진 표면의 반대쪽을 활용하라.",
						"subTitle": ["기판집적도 향상을 위해 양면 PCB를 사용한다."]
					},
					{
						"title": "빛(광선)을 대상의 인접 영역 또는 반대편에 투사하라.",
						"subTitle": ["스크린의 뒷면에서 빛을 투사하는 그림자 인형극"]
					}

				],
				"expTitle": "공중 부양 자전거 거치대",
				"expImg": "트리즈17.jpg",
				"expExp": "공간 활용도를 높이기 위해 자전거를 공중에 매닮"
			},
			{
				"index": "18",
				"shortKo": "기계적 진동",
				"shortEng": "Mechanical Vibration",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "진동을 활용하라.",
						"subTitle": ["진동 날을 가진 전기 면도기"]
					},
					{
						"title": "진동이 있다면, 진동수를 초음파 대역으로 증가시킨다.",
						"subTitle": ["초음파 세척기"]
					},
					{
						"title": "공진 주파수를 이용한다.",
						"subTitle": ["초음파 진동으로 돌을 깬다."]
					},
					{
						"title": "물리적 진동을 피에조 진동으로 대체하라.",
						"subTitle": ["수정 발진기를 이용한 시계는 정확하다."]
					},
					{
						"title": "초음파 진동을 전자기장과 함께 사용하라.",
					}

				],
				"expTitle": "블루베리 채취방법 (손 → 기계적 진동)",
				"expImg": "트리즈18.jpg",
				"expExp": "블루베리의 줄기에 진동선을 달아 열매가 자동으로 떨어지게 함"
			},
			{
				"index": "19",
				"shortKo": "주기적 작용",
				"shortEng": "Periodic Action",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "지속적 작용을 주기적 작용으로 대체하라.",
						"subTitle": ["ABS브레이크는 바퀴를 주기적으로 잡아서 잠김 현상을 막아준다."]
					},
					{
						"title": "작용이 이미 주기적이면 주파수를 바꾼다.",
						"subTitle": ["FM라디오는 주기적인 파형의 주파수를 변조한다."]
					},
					{
						"title": "주기적 작용 사이의 쉬는 시간에 다른 부가적인 작용을 한다",
						"subTitle": ["교통 신호등의 녹색과 적색신호 사이에 황색 신호를 넣어서 신호 변경을 미리 알려준다."]
					}

				],
				"expTitle": "콘크리트 착압기 (공압 드릴)",
				"expImg": "트리즈19.jpg",
				"expExp": "주기적인 충격/진동을 통해 콘크리트를 파쇄함"
			},
			{
				"index": "20",
				"shortKo": "유익작용지속",
				"shortEng": "Continuity of Useful Action",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "휴식없이 동작이 지속되어야 하며, 모든 부분은 최대의 용량으로 지속적으로 동작해야 한다.",
						"subTitle": ["드릴 날은 회전방향이 바뀌어도 절삭기능을 갖는다."]
					},
					{
						"title": "동작 정지상태나 중간 동작을 제거한다.",
						"subTitle": ["프린터는 인쇄 후 돌아올 때도 인쇄를 한다. (도트, 잉크젯 프린터)"]
					},
					{
						"title": "전진-후진 동작을 회전동작으로 바꾼다.",
						"subTitle": ["중화요리 전문점의 회전식탁"]
					}

				],
				"expTitle": "뫼비우스의 띠를 활용한 연마 벨트",
				"expImg": "트리즈20.jpg",
				"expExp": "연마 벨트의 내/외부를 모두 사용하여 수명을 두 배이상 향상함"
			},
			{
				"index": "21",
				"shortKo": "신속/고속",
				"shortEng": "Rushing Through",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "유해한 작용을 매우 빠른 속도로 처리한다.",
						"subTitle": ["치과용 드릴은 연마 시 온도상승 방지를 위해 고속 회전한다.", "플라스틱을 자를 때 열전도로 인한 변형을 방지하기 위해 빨리 자른다."]
					}

				],
				"expTitle": "플라스틱 절단",
				"expImg": "트리즈21.jpg",
				"expExp": "플라스틱을 절단할 때 변형을 피하기 위하여 열이 플라스틱에 퍼지기 전에 빠르게 절단한다."
			},
			{
				"index": "22",
				"shortKo": "해로움 활용",
				"shortEng": "Convert Harm into Benefit",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "유용한 결과를 얻기 위해 유해한 요소를 이용한다.",
						"subTitle": ["쓰레기의 메탄가스를 이용하여 온수를 만든다.", "가공 후 부스러기(스크랩)는 재활용 한다."]
					},
					{
						"title": "서로 다른 유해 요소들을 결합하여 유해요소를 제거한다.",
						"subTitle": ["잠수용 산소통은 산소중독과 질소마취 부작용 때문에 산소-질소 혼합물을 사용한다."]
					},
					{
						"title": "유해작용의 정도를 유해성이 멈출 때 까지 증가시켜라.",
						"subTitle": ["산불을 막기 위해 맞불을 지른다."]
					}

				],
				"expTitle": "뱀의 독을 활용한 의약품",
				"expImg": "트리즈22.jpg",
				"expExp": "사용처 : 류머티즘, 버거씨병, 건선, 아토피, 대상포진, 암, 척추질환 등을 치료함"
			},
			{
				"index": "23",
				"shortKo": "피드백",
				"shortEng": "Feedback",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "피드백을 도입한다.",
						"subTitle": ["히터 온도를 일정하게 유지하기 위해 온도 센서를 통해 히터의 온도를 측정하여 인가 전류를 조절한다."]
					},
					{
						"title": "이미 피드백이 있으면, 피드백을 변경한다.",
						"subTitle": ["공항반경 5마일 이내에서는 비행기 자동항법장치의 감도를 높인다.", "온도 센서의 감도를 가열과 냉각을 다르게 한다."]
					}

				],
				"expTitle": "스마트 타이어",
				"expImg": "트리즈23.jpg",
				"expExp": "타이어의 공기압을 계기판에 피드백 함"
			},
			{
				"index": "24",
				"shortKo": "매개물 이용",
				"shortEng": "Mediator",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "작용을 전달하거나 수행하는 매개체를 도입한다.",
						"subTitle": ["못을 잘 박기 위해 망치와 못 사이에 보조 기구를 사용한다."]
					},
					{
						"title": "대상을 손쉽게 제거할 수 있는 물체와 임시로 결합한다.",
						"subTitle": ["뜨거운 냄비를 운반하기 위해 냄비장갑을 사용한다."]
					}

				],
				"expTitle": "항아리를 이용한 문어잡이",
				"expImg": "트리즈24.jpg",
				"expExp": "문어를 잡기 위해 먹이를 넣은 항아리를 이용함"
			},
			{
				"index": "25",
				"shortKo": "셀프 서비스",
				"shortEng": "Self-Service",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "대상 스스로 동작을 하고, 부가적인 작용도 수행하며, 유지보수 할 수 있게 한다.",
						"subTitle": ["자가 복구 콘크리트는 균열 발생 시 액상 레진이 터지면서 응고제와 반응하여 스스로 복구된다."]
					},
					{
						"title": "대상 주위에 있는 버려지는 물질 또는 에너지를 이용한다.",
						"subTitle": ["동물의 배설물을 비료로 이용한다."]
					}

				],
				"expTitle": " 스스로 수리되는 타이어",
				"expImg": "트리즈25.jpg",
				"expExp": "펑크를 대비하여 공기와 접촉 시 굳는 액상 물질을 타이어 안에 두어 펑크 시 스스로 수리 되도록 함"
			},
			{
				"index": "26",
				"shortKo": "복사",
				"shortEng": "Copying",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "이용하기 불편하고, 깨지기 쉬운 원제품 대신 간단하고 값싼 복제품을 이용한다.",
						"subTitle": ["차량 충돌 시험에 더미(Dummy)를 활용한다."]
					},
					{
						"title": "광학적 복제품을 이용한다면, 적외선 또는 자외선을 활용한 복제품으로 바꾼다.",
						"subTitle": ["열을 감지하거나 보안시스템에 침입자를 감지하기 위해 적외선 촬영을 한다."]
					},
					{
						"title": "대상을 광학적 이미지로 대체하라. 이미지는 확대/축소될 수 있다.",
						"subTitle": ["사진으로 실물의 크기를 측정한다."]
					}

				],
				"expTitle": "더미를 활용한 차량 충돌 시험",
				"expImg": "트리즈26.jpg",
				"expExp": "차량충돌 테스트 시 사람 대신 ‘더미(Dummy)’를 활용하여 충격량을 측정 함"
			},
			{
				"index": "27",
				"shortKo": "일회용품",
				"shortEng": "Dispose",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "비싼 대상을 일부 특성을 저하시키더라도 값싼 것으로 대체한다.",
						"subTitle": ["일회용 주사기, 일회용 카메라, 종이컵, 일회용 기저귀"]
					}

				],
				"expTitle": "냉해 방지",
				"expImg": "트리즈27.jpg",
				"expExp": "겨울철 화분의 냉해 방지를 위해 스티로폼을 감싸고 그 위에 물을 뿌려 얼음 막을 입힌다."
			},
			{
				"index": "28",
				"shortKo": "기계장의 대체",
				"shortEng": "Replacement of Mechanical System",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "기계적 장치를 광학,음향, 열, 후각 장치로 바꾼다.",
						"subTitle": ["가스 누출을 알기 위해 방향물질을 가스에 첨가한다."]
					},
					{
						"title": "대상과 상호작용 하기 위해 전기, 자기 및 전자기장을 이용한다.",
						"subTitle": ["두 개의 분말을 섞을 때 양전하와 음전하를 가한다."]
					},
					{
						"title": "고정장을 유동장으로, 정적인 장을 가변장으로, 비구조장을 구조장으로 바꾼다.",
						"subTitle": ["발전기는 정적인 자기장을 동적인 자기장으로 변경하여 전기를 발생시킨다."]
					},
					{
						"title": "강자성 물질과 함께 장을 사용한다.",
						"subTitle": ["초고주파 흡수 가열 물질은 큐리 온도 이상에서 가열되지 않는다."]
					}

				],
				"expTitle": "소리나는 방범창",
				"expImg": "트리즈28.jpg",
				"expExp": "기계적인 움직임을 소리로 알려주는 방범창"
			},
			{
				"index": "29",
				"shortKo": "공압/유압",
				"shortEng": "Pneumatics or Hydraulic",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "대상의 고체 부품을 가스 또는 액체 부품으로 대체한다. 이러한 부품은 부풀림을 위해 공기나 물을 사용하거나 공압이나 유압 쿠션을 사용한다.",
						"subTitle": ["기체나 액체로 채워진 쿠션", "‘젤’ 물질로 채워진 신발 깔창", "자동차 감속 시 에너지를 유체시스템에 저장하고 가속 시 사용한다."]
					}

				],
				"expTitle": "로봇 팔의 유연성",
				"expImg": "트리즈29.jpg",
				"expExp": "로봇 팔은 부풀릴 수 있는 독립된 셀(Cell)들로 구성되어있다. 셀들은 유연한 막으로 격벽을 이루어 셀이 부풀어지면 로봇 팔이 펴진다. 로봇팔은 셀들 간의 압력차 때문에 어떤 방향으로든 움직일 수 있다."
			},
			{
				"index": "30",
				"shortKo": "유연한 막/필름",
				"shortEng": "Flexible Shells/Thin Films",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "통상의 구조물 대신에 유연한 막/얇은 필름을 사용한다.",
						"subTitle": ["테니스 코트 보온커버용으로 부푸는 구조물을 사용한다."]
					},
					{
						"title": "유연한 막 및 얇은 필름을 사용하여 외부 환경으로부터 대상을 격리시킨다.",
						"subTitle": ["창문에 자외선 차단 필름을 부착하여 자외선으로부터 피부를 보호한다.", "코팅 처리된 부품은 부식에 강하다."]
					}

				],
				"expTitle": "분말형 화물의 표면 보호와 화물 고정",
				"expImg": "트리즈30.jpg",
				"expExp": "화물 표면에 얇은 막을 씌우고 진공 펌프로 내부 공기를 뽑아내면 외부 공기압에 의해 화물칸 내의 분말형 화물이 고정된다."
			},
			{
				"index": "31",
				"shortKo": "다공성 물질",
				"shortEng": "Porous Materials",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "대상의 전체나 일부를 다공성으로 만든다.",
						"subTitle": ["구조물의 무게 감소를 위해 구멍을 뚫는다."]
					},
					{
						"title": "이미 대상이 다공성이라면, 사전에 어떤 물질로 구멍을 채워라.",
						"subTitle": ["용광로에 첨가제를 섞을 때 미리 첨가제가 포함되어 구워진 다공성 벽돌을 투입할 수 있다."]
					}

				],
				"expTitle": "다공성 특수 파이프",
				"expImg": "트리즈31.jpg",
				"expExp": "파이프 내벽 막힘을 개선하기 위해 내벽을 다공질 재료로 만들고 외부에서 특수 물질을 주입하여 제거함"
			},
			{
				"index": "32",
				"shortKo": "색 변화",
				"shortEng": "Changing the Color",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "대상 또는 환경의 색을 바꾼다.",
						"subTitle": ["사진현상 암실에서 안전등을 사용한다."]
					},
					{
						"title": "대상 또는 환경의 투명도를 바꾼다.",
						"subTitle": ["자외선의 세기에 따라 색이 변하는 가변 색상 선글라스"]
					},
					{
						"title": "관측이 어려운 공정이나 대상을 관측할 수 있도록 색 첨가제를 사용한다",
						"subTitle": ["고온의 쇳물 관찰 시 눈부심 방지를 위해 색상 첨가제가 포함된 물 커튼을 사용함"]
					},
					{
						"title": "이미 색 첨가제가 사용되었다면, 형광물질 또는 추적할 수 있는 물질을 넣는다.",
						
					}

				],
				"expTitle": "색이 변하는 안경",
				"expImg": "트리즈32.jpg",
				"expExp": "자외선 강도에 따라 색이 변하는 안경"
			},
			{
				"index": "33",
				"shortKo": "동종/균질",
				"shortEng": "Homogeneity",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "대상과 상호작용하는 물체는 동일한 재질 또는 유사한 물성을 갖는 물질로 만든다.",
						"subTitle": ["열변형을 방지하기 위해 물질을 열팽창률이 같은 재질로 만든다.", "화학반응을 억제하기 위해 용기의 재질을 동일하게 만든다.", "다이아몬드를 자르기 위해 다이아몬드를 사용한다."]
					}

				],
				"expTitle": "Cu 보관용 Cu 용기",
				"expImg": "트리즈33.jpg",
				"expExp": "Cu를 일반 용기에 보관 시 화학반응으로 성질이 변함 → Cu 보관을 위해 용기를 Cu로 만들어 화학반응 방지"
			},
			{
				"index": "34",
				"shortKo": "폐기/복원",
				"shortEng": "Rejecting & Restoring Parts",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "기능을 수행한 후 쓸모 없어진 대상의 구성요소를 버린다. (제거, 용해, 증발 등의 방식)",
						"subTitle": ["약의 캡슐을 녹는 물질로 만든다.", "총을 쏜 후 탄피는 버린다."]
					},
					{
						"title": "다 써버린 대상의 구성요소는 동작 시 복원되게 함.",
						"subTitle": ["샤프 펜슬, 자동 소총"]
					}

				],
				"expTitle": "우주 왕복선 연료 탱크",
				"expImg": "트리즈34.jpg",
				"expExp": "우주왕복선 발사 시 소모된 연료탱크는 분리하여 버림"
			},
			{
				"index": "35",
				"shortKo": "속성 변화",
				"shortEng": "Parameter Change",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "대상의 물리적 상태(Physical State)를 바꾼다.",
						"subTitle": ["산소, 질소 가스 등을 운반 시 부피를 줄이기 위해 액화 시킨다."]
					},
					{
						"title": "대상의 농도 또는 밀도를 바꾼다.",
						"subTitle": ["비누를 고체에서 액체 상태로 만들어 사용하면 편리하고 위생적이다."]
					},
					{
						"title": "대상의 유연성 정도를 바꾼다.",
						"subTitle": ["고무의 유연성과 내구성 향상을 위해 황을 추가한다."]
					},
					{
						"title": "대상의 온도나 부피를 바꾼다",
						"subTitle": ["기구는 풍선 내부의 공기온도를 조절하여 상승/하강한다."]
					}

				],
				"expTitle": "광물 건조",
				"expImg": "트리즈35.jpg",
				"expExp": "건조를 시킬 때 광물의 내부가 잘 안 마르는 경우 회전날로 고루 섞으면서 건조 시킨다."
			},
			{
				"index": "36",
				"shortKo": "상변화",
				"shortEng": "Phase Transition",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "상변화와 관련된 현상을 이용한다.(밀도 및 부피변화, 흡열, 발열)",
						"subTitle": ["물이 얼 때, 팽창하는 것을 이용해 바위를 깬다.", "냉장고는 냉매의 기화와 액화현상을 이용한다."]
					}


				],
				"expTitle": "똑딱이 손 난로",
				"expImg": "트리즈36.jpg",
				"expExp": "과포화 된 아세트산 나트륨 용액이 충격에 의해 고체로 바뀌면서 방출되는 열(응고열)을 이용함"
			},

			{
				"index": "37",
				"shortKo": "열팽창",
				"shortEng": "Thermal Expansion",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "물질의 온도를 변화시켜 그 물질의 열팽창 또는 열수축을 이용한다.",
						"subTitle": ["비슷한 직경의 파이프 결합 시 한쪽은 차갑게 하여 수축시키고, 다른 쪽은 뜨겁게 하여 팽창시켜 결합하면 상온 상태에서 꽉 끼어 분리되지 않는다"]
					},
					{
						"title": "서로 다른 열팽창 계수를 갖는 다양한 물질을 활용한다.",
						"subTitle": ["바이메탈 원리를 이용한 자동 온도 조절기"]
					}

				],
				"expTitle": "치열 교정용 와이어",
				"expImg": "트리즈37.jpg",
				"expExp": "치열교정용 와이어는 체온에 의해 원래의 형상으로 돌아가는 형상기억합금으로 만듦(복원력에 의하여 치아가 원하는 형태로 고정됨)"
			},
			{
				"index": "38",
				"shortKo": "강력한 산화",
				"shortEng": "Strong Oxidants",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "일반 공기를 산소가 풍부한 공기로 바꾼다.",
						"subTitle": ["잠수용 산소통"]
					},
					{
						"title": "일반 공기를 순수 산소로 바꾼다.",
						"subTitle": ["박테리아를 죽이기 위해 환자를 고압 산소 환경에서 치료한다."]
					},
					{
						"title": "이온화된 산소를 이용한다.",
						"subTitle": ["공기 청정기는 먼지를 모으기 위해 공기를 이온화한다."]
					},
					{
						"title": "산소를 오존으로 바꾼다.",
						"subTitle": ["오존을 활용하여 산화 반응을 가속화한다."]
					}

				],
				"expTitle": "칫솔용 오존 살균기",
				"expImg": "트리즈38.jpg",
				"expExp": "강력한 오존을 이용하여 칫솔모의 세균을 살균함"
			},
			{
				"index": "39",
				"shortKo": "불활성 환경",
				"shortEng": "Inert Atmosphere",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "현재의 환경을 불활성 환경으로 바꾼다.",
						"subTitle": ["전구의 필라멘트 보호를 위해 아르곤 가스를 주입한다."]
					},
					{
						"title": "대상에 중성 물질 또는 첨가제를 도입한다.",
						
					},
					{
						"title": "프로세스를 진공 상태에서 수행한다.",
						
					}

				],
				"expTitle": "질소/진공 포장",
				"expImg": "트리즈39.jpg",
				"expExp": ""
			},
			{
				"index": "40",
				"shortKo": "복합재료",
				"shortEng": "Composite Materials",
				"longKo": "",
				"longEng": "",
				"frtImg": "http://placehold.it/50x50",
				"content": [
					{
						"title": "단일 재질을 복합 재질로 바꾼다.",
						"subTitle": ["탄소 섬유 골프채는 금속보다 더 가볍고 강하다.", "유리 섬유 서핑보드는 나무재질보다 가공성이 좋아 다양한 모양을 만들기쉽다."]
					}

				],
				"expTitle": "신형 방탄복(Dragon Skin)",
				"expImg": "트리즈40.jpg",
				"expExp": "기존 방탄 섬유에 세라믹 복합 재료를 비늘 모양으로 넣어 만듦(수류탄까지 방어 가능한 방탄 성능 구현)"
			},
		];
	}

	loadAll() {
		return Promise.resolve(this.data40);
	}

}
