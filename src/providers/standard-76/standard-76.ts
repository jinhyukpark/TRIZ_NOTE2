import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Standard_76Provider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Standard_76Provider {
	data76: Object;

	constructor(public http: Http) {
		this.data76 = [
			{
				class		: "Class 1",
				ko_title 	: "물질-장 모델 구성 및 유해작용 제거",
                en_titile	: "",
                content     : [
                    {
                        ko_title : "1-1. 물질-장 모델의 구성",
						en_title : "",
						content  : [
							{
								ko_title : "1-1-1. 물질-장의 완성",
								en_title : "",
								content_li : [
									{
										txt : "새로운 물질이나 장을 추가할 수 있다면, 문제를 새로운 물질-장 모델로 구성하여 해결할 수 있다",
									
										txt_detail : [
											"물체를 장의 작용에 의해 원하는 대로 바뀌게 한다",
											"불완전 물질-장 모델을 완전한 물질-장 모델로 변경함으로써 시스템을 완성함"
										]
									}
								],
								content_li_img : "img_li_1-1-1.png",
								content_ex : [
									{
										txt: "공기(S2)에 포함된 가루물질(S1)을 분리하기 위하여 공기에 원심력(F<sub>Me</sub>)을 작용시키면, 공기가 가루물질을 밀어낸다."
									}
								],
								content_ex_img : "img_ex_1-1-1.png",						
							},
							{
								ko_title : "1-1-2. 내부에 새로운 물질을 도입",
								en_title : "",
								content_li : [
									{
										txt : "물질-장 모델의 기존물질(S1 또는 S2) 내부에 새로운 물질(S3)을 첨가함"
									}
								],
								content_li_img : "img_li_1-1-2.png",
								content_ex : [
									{
                                        txt: "일반적인 금고(S2)는 화염에 약하기 때문에 내용물(S1)을 충분히 보호하지 못함",
                                        txt_detail : [
											"금고(S2) 내부에 차가운 물(S3)을 채움으로써 금고가 화염에 견디도록 하여 내용물(S1)을 보호함.",
										]
									}
								],
								content_ex_img : "img_ex_1-1-2.png",		
							},
							{
								ko_title : "1-1-3. 외부에 새로운 물질을 도입",
								en_title : "",
								content_li : [
									{
										txt : "새로운 물질(S3)을 대상(S1) 또는 도구(S2)의 내부에 첨가하는 것이 어렵다면 대상 또는 도구의 외부에 새로운 물질(S3)을 첨가함"
									}
								],
								content_li_img : "img_li_1-1-3.png",
								content_ex : [
									{
										txt: "여러 명의 작업자(S2)가 철로(S1)를 굴려서 원하는 장소까지 이동시킨다. 이러한 작업은 작업자가 철로를 굴리는데 힘도 많이 들 뿐만 아니라 매우 위험하였다.",
										txt_detail : [
											"철로(S1) 외부에 원형의 물질(S3)을 추가하여 작업자가 철로(S1)을 쉽게 굴려서 이동시킴"
										]			 
									}
								],
								content_ex_img : "img_ex_1-1-3.png",	
								
							},
							{
								ko_title : "1-1-4. 외부환경요소를 도입",
								en_title : "",
								content_li : [
									{
										txt : "새로운 물질(S3)을 대상(S1) 또는 도구(S2)의 외부에 첨가하는 것이 어려운 경우",
										txt_detail : [
											"외부 환경요소(Se)를 대상(S1) 또는 도구(S2)의 외부에 첨가함",
											"외부 환경요소(Se)를 이용하기 위해 (S1’) 또는 도구(S2’)를 일부분 변경함"
										]			 
									}
								],
								content_li_img : "img_li_1-1-4.png",
								content_ex : [
									{
										txt: "풍차의 회전축(S1)에 무거운 추(S2)를 매달아서 풍차의 회전 속도를 조절한다. 바람의 속도가 강할 경우, 추(S2)는 회전축(S1)의 회전속도를 충분히 줄이지 못한다.",
										txt_detail : [
											"추(S2)를 비행기 날개 모양으로 변경(S2’)할 경우 공기(Se) 저항을 이용하여 회전속도를 줄일 수 있음"
										]	
									}
								],
								content_ex_img : "img_ex_1-1-4.png"		
							},
							{
								ko_title : "1-1-5. 외부 환경 요소 도입",
								en_title : "",
								content_li : [
									{
										txt : "새로운 물질(S3)을 대상(S1) 또는 도구(S2)의 외부에 첨가하기 어렵고, 외부 환경이 요구되는 물질을 가지고 있지 않을 경우",
										txt_detail : [
											"외부 환경을 다른 것으로 대체 또는 분해(Divided) 하거나, 환경에 첨가물질(Se, add)를 도입함"
										]
									}
								],
								content_li_img : "img_li_1-1-5.png",
								content_ex : [
									{
										txt: "점성을 가진 윤활물질(S2)는 실린더(S1)이 충분히 회전하지 못하게 한다. 실리던(S1) 내부에 환경물질을 추가하는 것은 불가능하다.",
										txt_detail : [
											"윤활유(S2)를 액체(S2’)와 기체(Se,add)로 분리시킴. 기체에 의해 윤활유의 점성은 낮아짐(Sliding Effect)"
										]
									}
								],
								content_ex_img : "img_ex_1-1-5.png"
							},
							{
								ko_title : "1-1-6. 작용의 최소모드",
								en_title : "",
								content_li : [
									{
										txt : "대상(S1)에 장이 최소한으로 요구되는 상황에서, 장(F)이 대상(S1)의 속성값을 불충분한 값(min)으로 변경시키는 경우",
										txt_detail : [
											"장(F)을 최대 모드(초과)로 인가하고 초과되는 결과를 제거함",
											"초과되는 장은 물질로 제거하고, 초과되는 물질은 장으로 제거함"
										]
									}
								],
								content_li_img : "img_li_1-1-6.png",
								content_ex : [
									{
										txt: "어떤 부품(S1)에 페인트(S2)를 바를 때, 페인트의 두께를 일정하고 최소한으로 바르기 어렵다",
										txt_detail : [
											"부품(S1)을 페인트 통(S2max)에 담그고, 초과되는 페인트(S2)는 원심력(F)를 인가하여 제거함"
										]
									}
								],
								content_ex_img : "img_ex_1-1-6.png"
							},
							{
								ko_title : "1-1-7. 작용의 최대모드",
								en_title : "",
								content_li : [
									{
										txt : "대상(S1)에 인가되는 장이 최대한으로 요구되지만, 최대 장(F<sub>max</sub>)을 인가하는 것이 어려운 경우",
										txt_detail : [
											"다른 물질(S2)에 장(F)을 최대 모드(초과)로 인가하고, 다른 물질(S2)이 대상(S1)에 작용하도록 함"
										]
									}
								],
								content_li_img : "img_li_1-1-7.png",
								content_ex : [
									{
										txt: "강화 콘크리트 제조 시, 철근을 잡아당긴 상태(인장)에서 콘크리트를 붓고 굳히면 더 강화된다. 인장을 위해 약 700℃ 정도로 가열해야 하지만, 값싼 철근(S1)은 400℃ 이상의 온도를 견딜 수 없다. 900℃ 이상을 견디는 철근(S2)는 가격이 비싸다",
										txt_detail : [
											"저가의 철근(S1)을 고가의 철근(S2)의 끝에 고정시키고, 고가의 철근(S2)을 가열 후 식힌다. 고가의 철근(S2)이 수축하는 힘으로 저가의 철근(S1)을 인장시킴"
										]
									}
								],
								content_ex_img : "img_ex_1-1-7.png"
							},
							{
								ko_title : "1-1-8-1. 선택적 최소 모드",
								en_title : "",
								content_li : [
									{
										txt : "대상(S1)에 최대장(F<sub>max</sub>)과 최소장(F<sub>min</sub>)이 동시에 요구되는 경우, 대상에 최대장(F<sub>max</sub>)을 적용하고, 최소장(F<sub>min</sub>)이 요구되는 장소에 보호물질(S2)을 도입함"
									}
								],
								content_li_img : "img_li_1-1-8-1.png",
								content_ex : [
									{
										txt: "주사액 유리 용기(앰플)을 밀봉할 때, 열(F)을 인가하여 앰플(S1)의 끝을 녹여 밀봉한다 앰플을 녹이기 위해 높은 열(F<sub>max</sub>)을 인가하면 앰플 속에 있는 약물이 변질되고, 낮은 열(F<sub>min</sub>)을 인가하면 앰플이 녹지 않는다.",
										txt_detail : [
											"높은 열이 요구되는 유리의 끝 부분에는 높은 열(F<sub>max</sub>)을 인가하고, 낮은 열(F<sub>min</sub>)이 요구되는 곳에 보호물질인 물(S2)을 도입한다."
										]
									}
								],
								content_ex_img : "img_ex_1-1-8-1.png"
								
							},
							{
								ko_title : "1-1-8-2. 선택적 최대 모드",
								en_title : "",
								content_li : [
									{
										txt : "하나의 대상(S1)에 최대장(F<sub>max</sub>)과 최소장(F<sub>min</sub>)이 동시에 요구되는 경우, 대상(S1)에 최소장(F<sub>min</sub>)을 적용하고 최대장(F<sub>max</sub>)이 요구되는 곳에 국부적으로 최대장(F<sub>max</sub>)을 생성시킬 수 있는 물질(S2)을 도입함"
									}
								],
								content_li_img : "img_li_1-1-8-2.png",
								content_ex : [
									{
										txt: "금속 부품을 용접할 때, 두 금속 사이에 금속 파우더(S1)을 놓아두고 토치로 가열해서 두 개의 금속을 붙인다. 토치의 열이 높으면 금속 파우더(S1)가 균일하게 녹지 않게, 토치의 열이 낮으면(F<sub>min</sub>) 금속 파우더(S1)가 잘 녹지 않는다",
										txt_detail : [
											"금속 파우더(S1) 아래에 낮은 토치의 열(F<sub>min</sub>)에도 높은 열을 내는 발열 물질(S2)을 넣어서 높은 열이 금속 파우더(S1)에게 전달되도록 함"
										]
									}
								],
								content_ex_img : "img_ex_1-1-8-2.png"
								
							},
						]
                    },
                    {
                        ko_title : "1-2 : 유해 작용 제거",
						en_title : "",
                        content : [
							{
								ko_title : "1-2-1. 제 3의 물질 도입을 통한 유해작용 차단",
								en_title : "",
								content_li : [
									{
										txt : "대상(S1)와 도구(S2) 사이에 원하는 작용과 유해한 작용이 동시에 존재하고, 대상(S1)과 도구(S2) 사이에 직접적인 접촉을 유지할 필요가 없을 경우",
										txt_detail : [
											"대상(S1)과 도구(S2) 사이에 비용이 거의 들지 않는 제 3의 물질(S3)을 도입함"
										]
									}
								],
								content_li_img : "img_li_1-2-1.png",
								content_ex : [
									{
										txt: "폭발물을 터트려 발생한 폭발 가스(S2)를 이용하여 지하터널 벽면(S1)을 견고하게 다지지만, 폭발 가스가 터널 벽면에 크랙을 유발하게 된다",
										txt_detail : [
											"점토(S3)로 폭발물을 덮는다. 폭발 시 점토(S3)가 벽면에 붙게 되고 폭발가스가 콘크리트에 닿지 않게 함"
										]
									}
								],
								content_ex_img : "img_ex_1-2-1.png"
							},
							{
								ko_title : "1-2-2. 기존 물질의 변형 물질 도입을 통한 유해 작용의 차단",
								en_title : "",
								content_li : [
									{
										txt : "대상(S1)와 도구(S2) 사이에 원하는 작용과 유해한 작용이 존재하고, 새로운 물질(S3)을 활용하는 것이 어려울 경우",
										txt_detail : [
											"시스템 내에 존재하는 대상/도구의 변형된 형태(S1’, S2’)를 도입함"
										]
									}
								],
								content_li_img : "img_li_1-2-2.png",
								content_ex : [
									{
										txt: " 빠르게 이동하는 수중익선의 수중익(S1)은 물(S2)와 마찰력에 의해 발생하는 진공충격(F, Cavitation)으로 인하여 마모된다.",
										txt_detail : [
											"수죽익(S1)의 표면을 냉각시켜 계속해서 얼려서 얼음 껍질(S2’)을 만들어 줌으로써 문제를 해결함"
										]
									}
								],
								content_ex_img : "img_ex_1-2-2.png"
							},
							{
								ko_title : "1-2-3. 유해 작용을 제거할 수 있는 다른 물질 도입",
								en_title : "",
								content_li : [
									{
										txt : "대상(S1)에 유입되는 해로운 장을 제거해야 하는 경우",
										txt_detail : [
											"해로운 장(F)을 자신에게로 유입될 수 있도록 하는 제 2의 물질(S2)을 도입함."
										]
									}
								],
								content_li_img : "img_li_1-2-3.png",
								content_ex : [
									{
										txt: "추운 겨울철에 땅이 얼어서 갈라질 때, 땅에 매설해 놓은 케이블(S1)이 파손될 수 있다.",
										txt_detail : [
											"케이블 주변으로 고랑(S2)을 만들어 크랙이 고랑을 향하게 함으로써 케이블을 보호할 수 있음"
										]
									}
								],
								content_ex_img : "img_ex_1-2-3.png"
							},
							{
								ko_title : "1-2-4. 유해 작용 완화 및 유익 작용 유지를 위한 이중 장 도입",
								en_title : "",
								content_li : [
									{
										txt : "대상(S1)과 도구(S2) 사이에 원하는 작용과 유해한 작용이 동시에 존재하고, 대상과 도구 사이에 직접적인 접촉을 유지해야 하는 경우",
										txt_detail : [
											"원하는 작용은 기존 장(F1)을 이용하여 유지하고, 새로운 장(F2)을 도입하여 유해한 작용을 제거함(MAThChEM 검토)"
										]
									}
								],
								content_li_img : "img_li_1-2-4.png",
								content_ex : [
									{
										txt: "꽃의 수분 작용을 돕기 위하여 공기역학(F1)에 의한 바람(S2)은 꽃의 꽃가루를 흩날릴 수 있으나, 꽃(S1)이 꽃가루를 보호하기 위하여 꽃봉오리는 닫게 한다.",
										txt_detail : [
											"꽃(S1)에 정전기 장을 유도하는 전기장(F<sub>E</sub>)을 인가함으로써 꽃을 개화함"
										]
									}
								],
								content_ex_img : "img_ex_1-2-4.png"
							},
							{
								ko_title : "1-2-5. 자성의 가역변화를 이용",
								en_title : "",
								content_li : [
									{
										txt : "물질(강자성체)에 유해한 자기장(F<sub>M</sub>)이 유입될 경우, 새로운 장(F2)을 도입(물리적인 효과)하여 강자성체의 특성을 변환시킴"

									}
								],
								content_li_img : "img_li_1-2-5.png",
								content_ex : [
									{
										txt: "아크 용접방식으로 금속 파우더(S1)를 용접할 경우, 형성된 자기장(F<sub>M</sub>)에 의해 금속 파우더(S1)가 용접 부위를 벗어나게 되어 불균일한 용접 표면이 만들어 진다",
										txt_detail : [
											"금속 파우더(S1)에 Curie Point 이상으로 열장(F<sub>th</sub>)을 인가하여 자성을 잃게 한 상태에서 아크 용접을 함"
										]
									}
								],
								content_ex_img : "img_ex_1-2-5.png"
							}
						]
                    }
                  
                ]
			},
			{
				class 		: "Class 2",
				ko_title 	: "물질-장 모델의 진화",
                en_titile 	: "",
                content   	: [
					{
                        ko_title  : "2-1. 복합 모델로 전이",
						en_title : "",
                        content : [
							{
								ko_title : "2-1-1. Chain 물질-장으로의 전이",
								en_title : "",
								content_li : [
									{
										txt : "불충분한 물질-장 모델의 효율을 향상시켜야 한다면, 물질-장 모델을 구성하는 일부분을 독립적으로 제어되는 물질-장 모델로 변경함 (체인구조 모델)"

									}
								],
								content_li_img : "img_li_2-1-1.png",
								content_ex : [
									{
										txt: "구조물(S1)에 쐐기(S2)를 박으면 구조물의 지지력(F1)으로 쐐기(S1)이 고정된다. 하지만 필요에 의해서 쐐기(S1)를 빼고자 할 경우, 쉽게 뺄 수가 없다",
										txt_detail : [
											"쐐기(S3)를 두 부분으로 형성시키고 한 부분은 낮은 열(F<sub>th</sub>)에 의해 쉽게 녹는 금속(S4)로 만듦"
										]
									}
								],
								content_ex_img : "img_ex_2-1-1.png"
							},
							{
								ko_title : "2-1-2. 이중 물질-장의 도입",
								en_title : "",
								content_li : [
									{
										txt : "불충분한 물질-장 모델의 효율을 향상시키 위하여, 제어가 용이한 제 2의 장(F2)를 도입함 (MAThChEM)"

									}
								],
								content_li_img : "img_li_2-1-2.png",
								content_ex : [
									{
										txt: "용과로(S2) 내에서 녹은 액체 금속(S1)은 중력(F1)에 의해 노즐을 통해 흘러 나온다 노즐을 통해 나오는 액체 금속의 속도가 높이에 따라 변하여 액체 금속을 일정하게 추출해 내기 어렵다",
										txt_detail : [
											"자기장(F<sub>M</sub>)으로 액체 금속(S2)를 회전시키고 회전속도를 조절하여 나오는 속도를 일정하게 조절함"
										]
									}
								],
								content_ex_img : "img_ex_2-1-2.png"
							}
						]
                    },
					{
                        ko_title : "2-2. 물질-장 모델 진화",
						en_title : "",
                        content: [
							{
								ko_title : "2-2-1. 제어성이 용이한 장 활용으로의 전이",
								en_title : "",
								content_li : [
									{
										txt : "물질-장 모델의 효율을 향상시키기 위하여 제어가 잘 되지 않는 장을 제어가 용이한 장(Fc, Controlled)으로 대체함",
										txt_detail : [
											"(진화방향)MAThChEM 검토",
											"도구(S2)는 제어가 용이한 장에 맞게 변경함"
										]

									}
								],
								content_li_img : "img_li_2-2-1.png",
								content_ex : [
									{
										txt: "다이아몬드 디스크(S2)를 회전시켜(F<sub>me</sub>) 콘크리트(S1)를 자르는 것 보다 연마재를 혼합한 뜨거운(F<sub>th</sub>) 워터젯(S2’)을 사용할 경우 자르는 속도가 증가한다"
										
									}
								],
								content_ex_img : "img_ex_2-2-1.png"
							},
							{
								ko_title : "2-2-2. 도구의 세분화",
								en_title : "",
								content_li : [
									{
										txt : "도구를 세분화(미시적 구조로 진화)시킴으로써 효율을 향상시킴",
										txt_detail : [
											"대상과 직접적으로 접촉하는 일부분 또는 도구 전체를 세분화함(진화방향) : 일체형 → 분할형 → 파우더 → 액체 → 기체 → 장"
										]

									}
								],
								content_li_img : "img_li_2-2-2.png",
								content_ex : [
									{
										txt: "하나의 파이프로 2가지 종류의 액체를 수송하고자 한다. 이때 2가지 액체(S1)가 서로 섞이지 않도록 중간에 피스톤(S2)으로 분리시킨다. 그러나 수송 도중에 피스톤에 의해 파이프가 마모되거나 막히는 문제가 생긴다",
										txt_detail : [
											"두 액체의 평균 밀도를 갖는 작은 알갱이 (0.3-0.5mm) 입자를 사용한다."
										]
										
									}
								],
								content_ex_img : "img_ex_2-2-2.png"
							},
							{
								ko_title : "2-2-3. 다공성 물질로의 전이",
								en_title : "",
								content_li : [
									{
										txt : "도구를 다공성 물질로 대체함으로써 효율을 향상시킴",
										txt_detail : [
											"(진화방향) 고체 → 하나의 동공(Cavity) → 여러 개의 동공 → 다공성 → 특별한 기공 구조를 가진 다공성 물질"
										]
									}
								],
								content_li_img : "img_li_2-2-3.png",
								content_ex : [
									{
										txt: "금속(S1)에 구멍을 뚫을 때 냉각수가 사용된다. 이때 냉각수는 드릴(S2)의 외부표면을 냉각시킬 뿐이다",
										txt_detail : [
											"모세관 구조를 가진 드릴을 사용할 경우, 모세관을 통하여 냉각수를 흘려 보낼 수 있어서 드릴을 보다 효과적으로 냉각시킬 수 있음다"
										]										
									}
								],
								content_ex_img : "img_ex_2-2-3.png"
							},
							{
								ko_title : "2-2-4. 역동성 증가",
								en_title : "",
								content_li : [
									{
										txt : "물질-장 모델의 동적 수준을 증가시킴으로써 효율을 향상시킴",
										txt_detail : [
											"유연하고 신속하게 변형 가능한 구조의 시스템",
										],
										txt_refer	: [
											"<span class='word'>진화방향</span> : 하나의 연결고리 → 여러 개의 연결고리 → 유연한 물질 → 일정한 장 → 펄스 장"
										]

									}
								],
								content_li_img : "img_li_2-2-4.png",
								content_ex : [
									{
										txt: "굴곡을 가진 부품(S1) 표면에 구멍을 뚫기 위해서 평판 가이드(S2)를 사용한다. 평판 가이드(S2)의 위치 또는 구멍의 패턴을 다시 조정하는데 시간이 많이 소요된다.",
										txt_detail : [
											"관절을 갖는 평판 가이드를 사용함 (평판 가이드에 탄성체 요소를 적용)"
										]										
									}
								],
								content_ex_img : "img_ex_2-2-4.png"
							},
							{
								ko_title : "2-2-5. 장의 구조화",
								en_title : "",
								content_li : [
									{
										txt : "균일한 장(대칭)은 불균일한 장(비대칭)으로 대체하고 비구조화된 장은 구조화된 장으로 대체함으로써 효율을 향상시킴",
										txt_detail : [
											
										],
										txt_refer	: [
											"구조화된 장 : 물질이 요구하는 구조와 일치하는 장"
										]
									}
								],
								content_li_img : "img_li_2-2-5.png",
								content_ex : [
									{
										txt: "균일한 적외선 램프(S2)를 사용하여 반도체 웨이퍼(S1)를 가열할 경우, 웨이퍼의 모서리 부분이 냉각되어 웨이퍼를 균일하게 가열하기 어렵다",
										txt_detail : [
											"적외선 램프의 열선을 비대칭(F#)으로 하여 모서리 부분이 냉각이 되는 것을 보상해 줌"
										]										
									}
								],
								content_ex_img : "img_ex_2-2-5.png"
                            },
                            {
								ko_title : "2-2-6. 도구의 구조화",
								en_title : "",
								content_li : [
									{
										txt : "균일한 물질(대칭)은 불균일한 물질(비대칭)로 변경 시키고 무질서한 물질은 <span class='word'>구조화된 물질</span>로 전이시킴",
										txt_detail : [
											
										],
										txt_refer	: [
											"구조화된 물질 : 시공간적으로 일정한 구조를 가진 물질"
										]
									}
								],
								content_li_img : "img_li_2-2-6.png",
								content_ex : [
									{
										txt: "금속 표면(S1)에 파우더(S2)를 올리고 금속을 가열(F<sub>th</sub>)하면 불균일 세라믹 코팅층이 만들어진다.",
										txt_detail : [
											"열에 쉽게 타서 없어지는 물질(Plasticizing Agent)에 파우더를 혼합한 반죽(S2#)을 만들어서 금속 표면에 바르고 열을 가하면, 쉽게 타는 물질은 증발하여 표면에 균일한 코팅층이 만들어진다."
										]										
									}
								],
								content_ex_img : "img_ex_2-2-6.png"
							}
						]
                    },
					{
                        ko_title : "2-3. 리듬조화의 진화",
						en_title : "",
                        content : [
							{
								ko_title : "2-3-1. 물질과 장 사이의 고유 진동수 일치",
								en_title : "",
								content_li : [
									{
										txt : "장(F)의 주파수를 대상(S1) 또는 도구(S2)와 일치시킴으로서 물질-장 모델의 효율을 향상시킴",
										txt_detail : [
											"공진 또는 반대로 일치시킴(상쇄)"
										]
									}
								],
								content_li_img : "img_li_2-3-1.png",
								content_ex : [
									{
										txt: "아크 전극(S2)으로 금속 부품(S1)을 용접할 경우, 펄스 형태의 자기장(Ffr)을 아크 전극(S1,fr)과 금속부품(S1, fr)의 고유 진동수와 일치(공진) 시킬 경우 작업효율이 올라감",
																
									}
								],
								content_ex_img : "img_ex_2-3-1.png"
							},
							{
								ko_title : "2-3-2. 장들의 주파수의 일치/불일치",
								en_title : "",
								content_li : [
									{
										txt : "장들(F1, F2)의 주파수를 서로 일치시킴 또는 반대로 일치시킴으로써 복합 물질-장 모델의 효율을 향상시킴",
									}
								],
								content_li_img : "img_li_2-3-2.png",
								content_ex : [
									{
										txt: "부품(S1)에 금속 파우더(S3)로 코팅할 때, 자기장(F<sub>M</sub>)으로 금속 파우더(S3)를 잡고 전기장(F<sub>E</sub>)을 인가한 펄스 형태의 전극(S2)으로 파우더를 녹여서 코팅한다. 자기장의 펄스(F<sub>M</sub>, fr)와 전기장(F<sub>E</sub>, fr)의 펄스를 일치시킬 경우, 높은 정밀도의 균일한 코팅층을 형성할 수 있다.",
																		
									}
								],
								content_ex_img : "img_ex_2-3-2.png"
							},
							{
								ko_title : "2-3-3. 작용 시간의 조화",
								en_title : "",
								content_li : [
									{
										txt : " 만일 두 가지 양립할 수 없는 작용이 있을 경우(예를 들어, 변경시키는 것과 측정하는 것), 하나의 작용이 일시 정지 되었을 때 다른 작용을 수행함",
										txt_detail : [
											"시간의 분리"
										]
									}
								],
								content_li_img : "img_li_2-3-3.png",
								content_ex : [
									{
										txt: "Spot 용접을 위해서는 부품들 간의 온도차로 인한 열전압값을 측정해야 한다. (S1 : 부품, S2 : 용접기, S3 : 열전압계). 용접 전극에서 인가한 전기장에 의해 발생한 자기장에 의해 정확한 열전압값을 측정하기 어렵다.",
										txt_detail : [
											"Spot 용접 후 펄스 전류가 잠시 정지한 동안 열전압 값을 정확하게 측정함"
										]								
									}
								],
								content_ex_img : "img_ex_2-3-3.png"
							}

						]
                    },
					{
                    	ko_title : "2-4. 강자성 모델로 전이",
						en_title : "",
                        content : [
							{
								ko_title : "2-4-1. 강자성 물질과 자기장의 활용",
								en_title : "",
								content_li : [
									{
										txt : "기존에 사용되던 장(F)은 자기장(F<sub>M</sub>)이나 구조화 된 자기장(F<sub>M</sub>#)으로 전이시키고, 물질은 강자성 물질(SF, Ferro-Substance)이나 세분화된 물질로 전이시킴으로써 물질-장 모델의 효율을 향상시킴",
										txt_detail : [
										]
									}
								],
								content_li_img : "img_li_2-4-1.png",
								content_ex : [
									{
										txt: "작업자(S2)가 금속 배수 파이프(S1)의 연결부를 정확하게 일치시키기 쉽지 않다. 연결부위를 자성 물질의 입자들(S2F)로 코팅할 경우, 연결 부위를 쉽게 일치시킬 수 있음",
										txt_detail : [
										
										]								
									}
								],
								content_ex_img : "img_ex_2-4-1.png"
							},
							{
								ko_title : "2-4-2. 물질의 강자성 입자로의 대체",
								en_title : "",
								content_li : [
									{
										txt : "물질 중 하나를 강자성 입자로 대체 또는 세분화된 강자성 입자를 첨가하고 자기장이나 전자기장을 인가함으로써 제어의 효율을 향상시킴",
										txt_detail : [
											
										],
										txt_refer	: [
											"물질의 진화 : 고체 → 알갱이 → 파우더 → 액체 강자성 입자 진화 : 작은 알갱이 → 분말 → 미세입자 → 자성유체"
										]
									}
								],
								content_li_img : "img_li_2-4-2.png",
								content_ex : [
									{
										txt: "기계적 Grip 장치를 사용하여 반도체 웨이퍼(S1)를 핸들링 할 경우, 웨이퍼에 종종 크랙이 발생한다.",
										txt_detail : [
											"웨이퍼 모서리와 중앙부에 강자성 입자들(S2F)을 붙이고 자기장(F<sub>M</sub>)을 도입하여 웨이퍼를 핸들링함"
										]								
									}
								],
								content_ex_img : "img_ex_2-4-2.png"
							},
							{
								ko_title : "2-4-3. 자성유체의 첨가",
								en_title : "",
								content_li : [
									{
										txt : "강자성 입자(S2)를 자성유체로 대체함으로써 강자성 물질-장 모델의 효율을 향상시킴",
										txt_detail : [
											"물질의 진화 : 고체 → 알갱이 → 파우더 → 액체 강자성 입자 진화 : 작은 알갱이 → 분말 → 미세입자 → 자성유체"
										]
									}
								],
								content_li_img : "img_li_2-4-3.png",
								content_ex : [
									{
										txt: "일반적인 회전 충격 흡수 장치는 회전하는 Blade 통로 사이의 유체(S2)의 저항에 의해 회전 Blade(S1)의 회전속도를 줄임으로써 충격이 흡수된다. 이런 구조는 유체 저항을 조절하기 어렵다.",
										txt_detail : [
											"자성유체(S2F)를 활용할 경우, 자기장의 세기로 자성유체의 점도를 조절함으로써 Blade 회전속도를 조절함"
										]								
									}
								],
								content_ex_img : "img_ex_2-4-3.png"
							},
							{
								ko_title : "2-4-4. 다공성 강자성 물질 활용",
								en_title : "",
								content_li : [
									{
										txt : "강자성 입자(S2)를 모세관/다공성 구조로 변경함으로써 강자성 물질-장 모델의 효율을 향상시킴",
										txt_detail : [
											
										]
									}
								],
								content_li_img : "img_li_2-4-4.png",
								content_ex : [
									{
										txt: "동시에 여러 개의 접점을 납땜하는 연속 납땜 장치의 인두는 내부에 공동을 갖는 강자성체로 인두를 만든다. 그것의 주요 목적은 초과되는 땜납을 제거하는 것이다",
										txt_detail : [
											"인두를 모세 다공성 구조(S2F, Porous)로 만들고 모세관의 끝은 펌퍼로 연결할 경우, 땜납을 효과적으로 제거함"
										]								
									}
								],
								content_ex_img : "img_ex_2-4-4.png"
							},
							{
								ko_title : "2-4-5. 물질의 내부/외부에 강자성 물질 첨가",
								en_title : "",
								content_li : [
									{
										txt : "대상(S1) 또는 도구(S2)을 강자성 입자(SF)로 대체하는 것이 어려울 경우, 대상(S1) 또는 도구(S2) 내부 또는 외부에 강자성 물질(SF)을 도입하고, 자기장(F<sub>M</sub>)을 인가함으로써 제어의 효율을 높일 수 있음",
										txt_detail : [
											
										]
									}
								],
								content_li_img : "img_li_2-4-5.png",
								content_ex : [
									{
										txt: "전자석(S2)을 이용하여 비자성체(S1) 또는 자성이 약한 물체(S1)를 옮기기 쉽지않다",
										txt_detail : [
											"자성입자들(SF)로 비자성체(S1) 주변을 감싸게 하면 전자석(S2)으로 쉽게 이동시킬 수 있다."
										]								
									}
								],
								content_ex_img : "img_ex_2-4-5.png"
							},
							{
								ko_title : "2-4-6. 외부 환경 강자성 물질/자기장 도입",
								en_title : "",
								content_li : [
									{
										txt : "대상(S1) 또는 도구(S2)를 강자성 입자(SF)로 대체하는 것이 어려울 경우, 외부 환경에 강자성 물질(SF)을 도입하고 자기장(F<sub>M</sub>)을 사용하여 외부환경 물성을 바꾸어 시스템의 제어 효율을 향상시킴",
										txt_detail : [
											
										]
									}
								],
								content_li_img : "img_li_2-4-6.png",
								content_ex : [
									{
										txt: "액체(S1)의 흐름을 원활하게 하기 위하여 점도가 낮은 액체(S2)로 파이프 내벽에 경계층을 만들게 한다. 하지만 액체(S1) 이동시, 점도가 낮은 액체(S2)가 같이 딸려가기 때문에 많은 양의 액체가 요구된다",
										txt_detail : [
											"파이프 내부에 자성입자(SF)를 넣고 자기장(F<sub>M</sub>)을 인가함. 자성입자들이 점도가 낮은 액체를 잡아 주게 함"
										]								
									}
								],
								content_ex_img : "img_ex_2-4-6.png"
							},
							{
								ko_title : "2-4-7. 물리적 현상 이용",
								en_title : "",
								content_li : [
									{
										txt : "물리적 효과/현상을 이용함으로써 강자성 물질-장 모델의 제어성을 향상시킴",
										txt_detail : [
											
										]
									}
								],
								content_li_img : "img_li_2-4-7.png",
								content_ex : [
									{
										txt: "자석(S2)을 이용하는 장치는 Curie Point 이상으로 온도가 올라가면 자성을 잃게 되어 제 기능을 하지 못한다. 장치가 Curie Point 이상 올라지지 않도록 홉킨슨 효과(Hopkinson Effect)를 이용한다.",
										txt_detail : [
											"홉킨슨 효과 : 자석이 Curie Point 근처에 접근할 때, 자기장을 인가하면 자성의 성질을 잃지 않음"
										]								
									}
								],
								content_ex_img : "img_ex_2-4-7.png"
							},
							{
								ko_title : "2-4-8. 강자성 물질-장의 역동성 증가",
								en_title : "",
								content_li : [
									{
										txt : "시스템의 동적 수준을 증가시킴으로써 강자성 물질-장 모델의 효율을 향상시킴 이때 보다 유연하고 신속하게 변화되는 시스템 구조로 전이시키면 효율이 더 올라감",
										txt_detail : [
											
										]
										
									}
								],
								content_li_img : "img_li_2-4-8.png",
								content_ex : [
									{
										txt: "복잡한 형상의 물체(S1)의 두께를 측정하기 위해 자기장을 이용한 장치가 사용된다. 공모양의 자기장 Probe(S2F)는 표면과 직접 접촉하기 때문에 정확한 측정값을 얻기 쉽지 않다.",
										txt_detail : [
											"내부를 작은 입자(자성 파우더)들로 가득 채움으로써 신뢰도를 높일 수 있음"
										]								
									}
								],
								content_ex_img : "img_ex_2-4-8.png"
							},
							{
								ko_title : "2-4-9. 강자성 물질-장에 구조화 된 장 도입",
								en_title : "",
								content_li : [
									{
										txt : "균일하면서 무질서적 구조의 장(F<sub>M</sub>)을 비균일하면서 시간/공간적으로 일정한 구조를 가진 장(구조화된 장, F<sub>M</sub>#)으로 전이시킴으로 강자성 물질-장 모델의 효율을 향상시킴",
										txt_detail : [
											
										]
										
									}
								],
								content_li_img : "img_li_2-4-9.png",
								content_ex : [
									{
										txt: "플라스틱 수지로 면섬유를 만들기 위해 가열된 플라스틱(S1)을 장치(S2)를 이용하여 늘리고 냉각시킨다. 강자성 입자들(S2F)을 수지 표면에 적용하고, 자기장(F<sub>M</sub>#)을 인가하면 표면을 더욱 늘릴 수 있음",
										txt_detail : [
											
										]								
									}
								],
								content_ex_img : "img_ex_2-4-9.png"
							},
							{
								ko_title : "2-4-10. 강자성 물질-장의 구성요소 간의 리듬 일치",
								en_title : "",
								content_li : [
									{
										txt : "대상(S1), 도구(S2), 자기장(F<sub>M</sub>) 간의 리듬을 일치시킴으로써 효율을 향상시킴",
										txt_detail : [
											
										]
										
									}
								],
								content_li_img : "img_li_2-4-10.png",
								content_ex : [
									{
										txt: "진동자로 액체(S2) 속에 있는 암석(S1)을 흔들어 작은 돌들을 분리하는 장치의 효율을 높이기 위하여 자성유체(S2F) 속에 암석들을 넣고 펄스형 자기장(F<sub>M</sub>,fr)을 인가하여 자성유체가 암석들을 크게 흔들어 작은 돌들은 자성유체 위로 떠오르게 된다.",
										txt_detail : [
											
										]								
									}
								],
								content_ex_img : "img_ex_2-4-10.png"
							},
							{
								ko_title : "2-4-11. 강자성 물질-장의 구성요소 간의 리듬 일치",
								en_title : "",
								content_li : [
									{
										txt : "강자성을 도입하는 것이 어렵고, 자화(Magnetization)시키는 것도 어렵다면, 외부에 전자기장(F<sub>E</sub>)을 도입하고 비접촉식/접촉식으로 유도되는 물질(S2E)을 도입하여 전기장 모델로 전이시킴",
										txt_detail : [

										]
										
									}
								],
								content_li_img : "img_li_2-4-11.png",
								content_ex : [
									{
										txt: "열매가 열리는 식물들은 가지들은 격자구조물에 묶어서 키우고 손(S2)으로 열매(S1)를 딴다",
										txt_detail : [
											"철사로 된 격자 구조물(S2E)에 교류 전류(F<sub>E</sub>)를 흘리면 철사가 요동을 치게 되어 열매가 저절로 떨어지게 된다."
										]								
									}
								],
								content_ex_img : "img_ex_2-4-11.png"
							},

							{
								ko_title : "2-4-12. 전기에 반응하는 유체의 활용",
								en_title : "",
								content_li : [
									{
										txt : "강자성 물질(자성 유체)을 도입하는 것이 어려울 경우, 전기장에 반응하는 물질(영동 유체)을 도입함",
										txt_detail : [

										]
										
									}
								],
								content_li_img : "img_li_2-4-12.png",
								content_ex : [
									{
										txt: "충격 완충기는 내부에 점성의 액체로 이루어져 있다. 점성을 가진 액체(S2)는 열을 받으면 점성이 낮아져 충격 완충기(S1)는 효율이 떨어진다.",
										txt_detail : [
											"점성을 가진 액체를 영동유체(S2E)로 대체하고 전류(F<sub>E</sub>)를 인가하여 점도를 조절함"
										]								
									}
								],
								content_ex_img : "img_ex_2-4-12.png"
							},
							
						]
                    }
				]
			},
			{
				class 		: "Class 3",
				ko_title 	: "상위시스템과 마이크로레벨로 진화",
                en_titile 	: "",
                content   	: [
					{
                        ko_title : "3.1. Mono-Bi-Poly로 진화",
						en_title : "",
                        content: [
							{
								ko_title : "3-1-1. Bi-System과 Poly-System의 구성",
								en_title : "",
								content_li : [
									{
										txt : "시스템 진화과정의 어떠한 단계에서 시스템의 효율을 향상시키려면, 다른 시스템과 결함하여 Bi 또는 Poly 시스템을 만들어 달성함",
										txt_detail : [

										]
										
									}
								],
								content_li_img : "img_li_3-1-1.png",
								content_ex : [
									{
										txt: "얇은 판 유리(S1)를 가공하는데 연마 휠(S2)이 사용된다. 한장을 연마하면 쉽게 부서지지만, 여러 장을 다발로 묶어서 가공하면 파손되지 않는다.",
										txt_detail : [
											
										]								
									}
								],
								content_ex_img : "img_ex_3-1-1.png"
							},
							{
								ko_title : "3-1-2. Bi-System과 Poly-System의 진화",
								en_title : "",
								content_li : [
									{
										txt : "Bi 또는 Poly 시스템의 효율을 향상시키기 위하여 대상(S1), 도구(S2), 장(F)간의 연결을 발전시킴(역동성 증가)",
										txt_detail : [

										]
										
									}
								],
								content_li_img : "img_li_3-1-2.png",
								content_ex : [
									{
										txt: "자동차의 브레이크 등(S2)과 화물칸의 브레이크 등(S2)을 서로 연결시킨다.",
										txt_detail : [
											
										]								
									}
								],
								content_ex_img : "img_ex_3-1-2.png"
							},
							{
								ko_title : "3-1-3. Bi, Poly-System의 요소 간의 차이 증가",
								en_title : "",
								content_li : [
									{
										txt : "Bi 또는 Poly 시스템 요소간의 차이를 크게 함으로써 Bi 또는 Poly 시스템의 효율을 향상 시킬 수 있음",
										txt_detail : [

										]
										
									}
								],
								content_li_img : "img_li_3-1-3.png",
								content_ex : [
									{
										txt: "두께가 두꺼운 부품을 용접할 경우, 하나의 전극을 활용하는 것 보다는 일렬로 된 전극 다발을 이용하는 것이 용이하다. 용접 전류의 크기를 뒤로 갈 수록 더 작은 전류를 인가함으로써 효과적으로 용접함",
										txt_detail : [
											
										]								
									}
								],
								content_ex_img : "img_ex_3-1-3.png"
							},
							{
								ko_title : "3-1-4. Bi, Poly-System의 요소 간의 통합 및 부가 요소 제거",
								en_title : "",
								content_li : [
									{
										txt : "여러 요소들을 하나의 요소에 통합 및 부가적인 요소를 제거함으로써 Bi 또는 Poly 시스템의 효율을 향상시킬 수 있음.",
										txt_detail : [
											"통합된 시스템은 다시 단일(Mono)시스템으로 바뀜"
										],
										txt_refer : [
											"진화 : Mono → Bi → Poly → New Mono → New Bi → ……"
										],
										txt_refer_img : [
											"img_refer_3-1-4.png"
										]
										
									}
								],
								content_li_img : "img_li_3-1-4.png",
								content_ex : [
									{
										txt: "각각의 정보를 전달하는 계기판(S2, S3)이 하나로 통합됨",
										txt_detail : [
											
										]								
									}
								],
								content_ex_img : "img_ex_3-1-4.png"
							},
							{
								ko_title : "3-1-5. 전체와 부분간 반대특성",
								en_title : "",
								content_li : [
									{
										txt : "양립할 수 없는 특성을 시스템과 시스템 부품 사이에 분배함으로써 Bi 또는 Poly 시스템의 효율을 향상시킴.",
										txt_detail : [
											"전체 시스템이 A특성을 가지고, 부품들은 Anti-A 특성을 갖는 구조 (전체와 부분의 분리)"
										],
										
									}
								],
								content_li_img : "img_li_3-1-5.png",
								content_ex : [
									{
										txt: "복잡한 형상의 부품(S1)을 고정하기 위해 사용되는 바이스(S2)는 다수의 강철 핀으로 구성되어 있다. 전체적으로 단단한(+S2) 바이스이지만, 개별 핀들은 유연함(-S2)하다.",
										txt_detail : [
											
										]								
									}
								],
								content_ex_img : "img_ex_3-1-5.png"
							}
							
						]
                    },
					{
                        ko_title : "3.2. 마이크로 레벨로 전이",
						en_title : "",
                        content : [
							{
								ko_title : "3-2-1. 거시 구조의 미세 구조로의 전이",
								en_title : "",
								content_li : [
									{
										txt : "시스템의 효율을 향상시키려면, 매크로 레벨로부터 마이크로 레벨로의 전이를 통하여 달성할 수 있다. 시스템이나 시스템의 부품(S2)은 장(F’)과 상호 작용하는 물질(S2’)로 대체함",
										
										txt_refer : [
											"진화 : 결정체 → 분자 → 이온 → 원자 → 장"
										],
									}
								],
								content_li_img : "img_li_3-2-1.png",
								content_ex : [
									{
										txt: " 액체(S2)로 받침대(S1)를 위/아래로 이동시켜 샘플에 균등한 마킹을 하는 장치가 있다. 액체 대신에 압전 액추에이터(Piezoelectric Actuator)(S2’)를 사용하면 임펄스 전기로 받침대를 균일하게 이동시킬 수 있다.",
										txt_detail : [
											
										]								
									}
								],
								content_ex_img : "img_ex_3-2-1.png"
							}
						]
                    }
				]
			},
			{
				class 		: "Class 4",
				ko_title 	: "측정 및 검출",
                en_titile 	: "",
                content   	: [
					{
                        ko_title : "4.1. 측정/검출 대신 시스템 변경",
						en_title : "",
                        content : [
							{
								ko_title : "4-1-1. 측정 및 검출의 필요성 제거",
								en_title : "",
								content_li : [
									{
										txt : "측정이나 검출이 필요하지 않도록 시스템을 변경시킨다.",
										txt_detail : [
											
										],
										txt_refer : [
                                            "측정(Measurement) : 일정한 기준을 가지고 무엇인가의 양을 수치화하는 작업",
                                            "검출(Detection) : 어딘가에 있는 무엇인가의 존재를 확인하는 것"
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: " 전기모터의 과열을 방지하기 위해 온도센서를 이용하여 모터의 온도를 측정/감지 하고 모터가 과열될 경우 모터를 정지시킨다.",
										txt_detail : [
											"모터의 자석을 과열온도와 동일한 퀴리 포인터를 갖는 합금으로 제작하여 과열시 모터의 동작이 저절로 멈추도록 함"
										]								
									}
								],
								content_ex_img : "img_ex_4-1-1.png"
							},
							{
								ko_title : "4-1-2. 대상의 복사물을 측정/검출",
								en_title : "",
								content_li : [
									{
										txt : "측정이나 검출이 필요하지 않도록 시스템을 변경시키기 어려울 경우, 검출 대상의 복사물(Copy)이나 사진을 찍어서 측정함",
										txt_detail : [
											"검출 대상물의 복사물/사진으로부터 대상의 성질을 측정함"
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "살아있는 맹금류(뱀, 악어 등)의 길이를 측정하는 것은 매우 위험한 일이다. 이 경우, 자와 함께 사진을 찍어 길이를 측정할 수 있다.",
										txt_detail : [
											
										]								
									}
								],
								content_ex_img : "img_ex_4-1-2.png"
							},
							{
								ko_title : "4-1-3. 측정 문제를 연속 검출 문제로 변환",
								en_title : "",
								content_li : [
									{
										txt : "측정/검출이 필요 없도록 시스템을 변화시키는 것이 불가능하고, 측정대상을 복사하는 것도 불가능하다면, 측정 문제를 연속적인 검출문제로 바꾸어 문제를 해결한다.",
										txt_detail : [
											
										],
										txt_refer : [
											 "주의 : 측정은 어떤 정확도를 가지고 수행된다. 그러므로 문제가 연속적으로 측정하는 것이라도 2개의 연속적인 검출을 포함하는 측정이라는 단순화된 형태의 문제로 변환할 수 있으며 이로써 문제는 상당히 단순해 진다"
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "물에 의해 바닥이 쓸려 내려가는 곳에 매설된 파이프 주변의 물의 깊이를 측정하는 것은 쉽지 않다. 미리 파이프 아래에 흙이 쓸려가는 정도에 따라 깊이를 알 수 있도록 색상별 부표를 묻어둔다. 떠오른 부표의 색상으로 물의 깊이를 알 수 있음",
										txt_detail : [

										]								
									}
								],
								content_ex_img : "img_ex_4-1-3.png"
							},
						]
                    },
					{
                        ko_title : "4.2. 측정 시스템의 합성",
						en_title : "",
                        content : [
							{
								ko_title : "4-2-1. 측정 시스템의 완성",
								en_title : "",
								content_li : [
									{
										txt : "대상(S1)의 측정 변수(F)를 직접 검출하거나 측정하는 대신에 장(F1)에 의해서 발생될 수 있는 다른 변수(F2)를 검출하거나 측정한다",
										txt_detail : [
											"장에서 발생하는 측정변수는 측정 및 검출이 용이해야 하며, 이 측정 변수가 궁극적으로 측정하고자 하는 변수를 잘 나타내야 한다."
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "img_li_4-2-1.png",
								content_ex : [
									{
										txt: "액체가 끓는 순간(기포 발생)을 측정하기는 쉽지 않다. 액체 내에 전극(S2)을 넣어두면 액체가 끓을 때 발생하는 기포(S1)에 의해 전기저항(F2)이 급격하게 감소하므로 전기저항을 간접적으로 측정함",
										txt_detail : [

										],
										txt_refer : [
											"측정/검출 물질-장 모델은 기능관점에서 대상(S1)이 도구(S2)에게 정보를 주기 때문에, 작용(화살표)의 방향이 대상(S1)에서 도구(S2)로 연결됨"
										]								
									}
								],
								content_ex_img : "img_ex_4-2-1.png"
							},
							{
								ko_title : "4-2-2. 용이하게 측정이 가능한 첨가물의 도입",
								en_title : "",
								content_li : [
									{
										txt : "만일 어떤 시스템이나 그 구성요소의 검출이나 측정이 어렵다면, 쉽게 검출/측정 될 수 있는 첨가물을 내부 또는 외부에 도입함(복합 측정 물질-장 모델)",
										txt_detail : [
								
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "img_li_4-2-2.png",
								content_ex : [
									{
										txt: "육안으로 냉장고의 냉매(S1, 프레온 가스)의 누설지점(F2)을 검출하기는 쉽지 않다. 내부에 형광 물질(S3)을 냉매와 혼합시키고, 자외선 빛(F<sub>M</sub>)을 쪼여 누설 지점을 검출한다",
										txt_detail : [

										],
										txt_refer : [
											
										]								
									}
								],
								content_ex_img : "img_ex_4-2-2.png"
							},
							{
								ko_title : "4-2-3. 용이하게 측정이 가능한 첨가물을 외부 환경에 도입",
								en_title : "",
								content_li : [
									{
										txt : "시스템 내부(S1, S2)에 첨가물을 도입하는 것이 불가능하다면, 쉽게 검출/측정 가능한 장(F3)을 발생시키는 첨가물(Se)을 외부환경에 도입한다. 외부 환경의 변화상태로써 측정 대상의 상태를 검출함",
										txt_detail : [
								
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "img_li_4-2-3.png",
								content_ex : [
									{
										txt: " 내연 기관이 얼마나 마모가 되었는지 측정하기가 쉽지 않다(마모된 입자S1는 윤활유 S2와 함께  이동함.)",
										txt_detail : [
											"윤활유(S2)에 발광 파우더(Se)를 첨가할 경우, 윤활유의 발광도를 측정하면 마모의 정도를 알 수 있다. (마모된 입자가 많을 수록 오일의 발광도(F3)는 낮아짐)"
										],
										txt_refer : [
											
										]								
									}
								],
								content_ex_img : "img_ex_4-2-3.png"
							},
							{
								ko_title : "4-2-4. 외부 환경 변화 유도",
								en_title : "",
								content_li : [
									{
										txt : "시스템 내/외부에 첨가물을 도입하는 것이 불가능하고, 외부 환경에 도입하는 것이 불가능하다면, 외부환경을 분해하거나 외부환경의 접합 상태를 변화시킴으로써 측정대상의 변화를 검출함",
										txt_detail : [
											"Se : 전기분해/Cavitation 등에 의한 가스나 증기 거품 등"
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "img_li_4-2-4.png",
								content_ex : [
									{
										txt: "투명한 파이프 속을 흐르고 있는 물(S1)의 유속(F1)을 측정하기는 쉽지 않다. 유속에 의해 발생되는 기포(Se)의 양(F3)을 검출함으로써 유속(F1)을 간접적으로 측정함",
										txt_detail : [
											
										],
										txt_refer : [
											
										]								
									}
								],
								content_ex_img : "img_ex_4-2-4.png"
							},
						]
                    },
					{
                        ko_title : "4.3. 측정 시스템의 강화",
						en_title : "",
                        content : [
							{
								ko_title : "4-3-1. 물리적 효과의 적용",
								en_title : "",
								content_li : [
									{
										txt : "만일 측정 물질-장 모델의 효율을 향상시키려면 물리적 효과를 적용한다.",
										txt_detail : [
											"측정 대상의 한 특성이 변화할 때 함께 변화하는 다른 특성을 측정함"
										],
										txt_refer : [
											"TRIZ의 지식 탐색 활용"
										],
									}
								],
								content_li_img : "img_li_4-3-1.png",
								content_ex : [
									{
										txt: "전구(S1)의 내부의 가스의 압력(F)을 측정하기 위하여 코로나 방전현상을 이용한다. 전구에 높은 전압(F<sub>E</sub>)을 인가하면, 내부의 가스 압력에 따라 코로나 방전의 밝기(F<sub>M</sub>)가 다르게 나타남",
										txt_detail : [
											
										],
										txt_refer : [
											
										]								
									}
								],
								content_ex_img : "img_ex_4-3-1.png"
							},
							{
								ko_title : "4-3-2. 시스템의 공진 주파수 변화의 활용",
								en_title : "",
								content_li : [
									{
										txt : "만일 시스템의 변화를 직접적으로 측정하거나 검출하는 것이 불가능하고 어떠한 장도 시스템을 통과할 수 없는 경우, 대상(S1,R)의 공진을 이용한다.",
										txt_detail : [
											"진동수의 변화는 시스템에 변화가 발생하고 있다는 것을 의미함"
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "img_li_4-3-2.png",
								content_ex : [
									{
										txt: "용기안에 들어 있는 액체(S1)의 질량을 측정하기 위하여 기계적 공진을 이용한다. 시스템의 공진주파수(FR)을 측정하여 물질의 질량을 계산할 수 있다. (질량이 증가할 수록 공진주파수는 감소함)",
										txt_detail : [
											
										],
										txt_refer : [
											
										]								
									}
								],
								content_ex_img : "img_ex_4-3-2.png"
							},
							{
								ko_title : "4-3-3. 외부 환경의 공진 주파수 변화의 활용",
								en_title : "",
								content_li : [
									{
										txt : "만일 대상(S1,R)의 공진을 발생시키기 어려우면, 외부 환경(Se, R)의 고유진동수 (natural frequency)의 변화(FR)을 측정함",
										txt_detail : [
										
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "img_li_4-3-3.png",
								content_ex : [
									{
										txt: "생산 설비를 멈춘 상태에서 두께가 얇은 가는 철사(S1)의 두께(F)를 측정하는 것은 생산성을 저하시킨다.",
										txt_detail : [
											"철사를 진동시키고 발생하는 소리의 주파수를 측정함으로써 두께를 측정할 수 있음"
										],
										txt_refer : [
											"기타 줄은 굵기에 따라 소리가 다름"
										]								
									}
								],
								content_ex_img : "img_ex_4-3-3.png"
							},
						]
                    },
					{
                        ko_title : "4.4. 강자성 측정시스템으로 전이",
						en_title : "",
                        content : [
							{
								ko_title : "4-4-1. 강자성 물질과 자기장의 활용",
								en_title : "",
								content_li : [
									{
										txt : "강자성 물질(SF)이나 자기장(F<sub>M</sub>)을 이용하면 측정 시스템의 효율이 향상된다.",
										txt_detail : [
										
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "img_li_4-4-1.png",
								content_ex : [
									{
										txt: "배의 선체에 발생한 미세한 Crack(구멍을) 육안으로 검출하기는 쉽지 않다",
										txt_detail : [
											"선체 내부에 영구 자석을 넣고 자력계로 자성의 크기를 측정함으로써 구멍의 위치를 찾을 수 있음"
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_4-4-1.png"
							},
							{
								ko_title : "4-4-2. 강자성 물질 첨가 혹은 강자성 물질로 변환",
								en_title : "",
								content_li : [
									{
										txt : "대상을 강자성 입자(SF)로 바꾸거나 또는 강자성 입자(SF)를 추가하여 강자성 물질-장 모델로 전이하여 자기장(F<sub>M</sub>)을 검출/측정함으로써 측정함으로써 측정 시스템의 효율을 향상시킬 수 있음",
										txt_detail : [
										
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "img_li_4-4-2.png",
								content_ex : [
									{
										txt: "다공성 물질(샘플)의 공극율(Porosity)을 측정하는 것은 쉽지 않다.",
										txt_detail : [
											"구멍들을 자성유체들로 채우고 자기장을 인가한 후에 무게를 측정한다."
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_4-4-2.png"
							},
							{
								ko_title : "4-4-3. 강자성 첨가제의 도입",
								en_title : "",
								content_li : [
									{
										txt : "강자성 입자로 대체하거나 추가하는 것이 불가능할 경우, 강자성 첨가제를 도구의 내부 또는 외부에 도입한다.",
										txt_detail : [
										
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "img_li_4-4-3.png",
								content_ex : [
									{
										txt: "광탄성 물질(S1)에 빛을 쏘고 거리를 측정하여 바위의 변형된 정도를 정확하게  측정하기는 쉽지 않다.",
										txt_detail : [
											"구 형태의 강자성 입자들을 광탄성 물질 내부에 넣음. 바위에 하중이 걸리면 자화율이 변경됨"
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_4-4-3.png"
							},
							{
								ko_title : "4-4-4. 외부 환경에 강자성 입자 도입",
								en_title : "",
								content_li : [
									{
										txt : "기존 물질의 내부/외부에 강자성 입자의 도입이 어렵다면, 외부 환경에 강자성 입자를 도입함",
										txt_detail : [
										
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "img_li_4-4-4.png",
								content_ex : [
									{
										txt: "모형 선박(S1)의 움직임에 따라 발생하는 파도(S2)의 생성과 전파과정(F)에 대한 연구를 하기 위하여 강자성 입자(SF)를 물(S2)에 첨가한다.",
										txt_detail : [
										
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_4-4-4.png"
							},
							{
								ko_title : "4-4-5. 강자성 물질-장에 물리적 효과 도입",
								en_title : "",
								content_li : [
									{
										txt : "물리적 효과를 사용하여 강자성 측정 물질-장 모델의 효율을 향상시킴",
										txt_detail : [
										
										],
										txt_refer : [
											"Curie Point : 강자성체가 일정 온도 이상에서 자성을 잃음",
											"Hopkinson & Barkhausen Effect : 강자성체에 자기를 인가하면, 강자성체가 자화되는 현상",
											"Magneto-elastic Effect : 결정에 전기장을 가할 때 전기장에 비례해 자기화가 생기는 현상."
										],
									}
								],
								content_ex : [
									{
										txt: "자석으로 만들어진 수위계를 이용하여 용기 외부에서 자성 감지 센서를 이용하여 액체의 수위를 측정한다. 수위계가 액체의 온도에 의해 자성을 잃지 않도록 액체 온도보다 낮은 Curie Point를 가진 물질로 코팅함.",
										txt_detail : [
										
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_4-4-5.png"
							},
						]
                    },
					{
                        ko_title : "4.5. 측정시스템의 진화",
						en_title : "",
                        content : [
							{
								ko_title : "4-5-1. Bi/Poly 시스템의 형성",
								en_title : "",
								content_li : [
									{
										txt : "측정 시스템을 Bi 또는 Poly 시스템으로 전이시킴으로써 측정 시스템의 효율을 향상시킬 수 있음",
										txt_detail : [
											"같은 요소 또는 다른 요소와 결합함"
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "img_li_4-5-1.png",
								content_ex : [
									{
										txt: "온도계(S2)로 작은 벌레(S1)의 체온(F)을 측정하기는 쉽지 않다",
										txt_detail : [
											"여러 마리의 벌레들을 한 곳에 가둬 놓고 온도를 측정한다."
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_4-5-1.png"
							},
							{
								ko_title : "4-5-2. 파생물의 측정",
								en_title : "",
								content_li : [
									{
										txt : "제어 가능한 기능의 파생물을 측정함으로써 측정시스템을 진화시킴",
										txt_detail : [
											"기능 측정 → 첫 번째 미분값 측정 → 두 번째 미분값 측정"
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "img_li_4-5-2.png",
								content_ex : [
									{
										txt: "바위(S1)에 구멍을 뚫고 전극(S2)을 넣어 두 점(A, B)의 전위차(S2)를 측정하여 바위의 응력값(F)을 측정한다.",
										txt_detail : [
											"전위의 변화율(F’)을 측정함으로써 측정의 정밀성을 높임. 응력이 높아질 수록 전위차의 변화율은 증가함"
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_4-5-2.png"
							},
						]
                    }
				]
			},
			{
				class 		: "Class 5",
				ko_title 	: "표준해의 적용을 위한 도움말",
                en_titile 	: "",
                content   	: [
					{
                        ko_title : "5.1. 물질의 도입",
						en_title : "",
                        content : [
							{
								ko_title : "5-1-1. 물질의 직접 도입",
								en_title : "",
								content_li : [
									{
										txt : "새로운 물질(S3)을 도입하는 것이 어려울 경우",
										txt_detail : [
                                            "<span class = 'word'>표준해 5-1-1-1</span> : 물질 대신에 공기 또는 고체로 형성된 빈 공간(Void)과 같은 가스상태의 물질을 도입",
                                            "<span class = 'word'>표준해 5-1-1-2</span> : 물질 대신에 장을 도입",
                                            "<span class = 'word'>표준해 5-1-1-3</span> : 시스템 내부 대신에 시스템 외부에 첨가제를 도입",
                                            "<span class = 'word'>표준해 5-1-1-4</span> : 소량의 물로 큰 효과를 나타내는 활성 첨가제 도입",
                                            "<span class = 'word'>표준해 5-1-1-5</span> : 시스템 내부의 특정부위에 매우 소량이 첨가제 도입",
                                            "<span class = 'word'>표준해 5-1-1-6</span> : 필요한 물질을 일시적으로 도입한 후 제거",
                                            "<span class = 'word'>표준해 5-1-1-7</span> : 허용된 곳에 물질대신 물질의 복사물을 도입",
                                            "<span class = 'word'>표준해 5-1-1-8</span> : 추후 분해시킬 수 있는 화학적 화합물의 형태로 도입",
                                            "<span class = 'word'>표준해 5-1-1-9</span> : 전기분해 또는 외부환경이나 물체의 밀집 상태를 변경하는 것과 같이 외부환경이나 물체 자체를 분해하여 물질을 생성",

										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{   
                                        txtNum : [
                                            "표준해 5-1-1-1",
                                            "표준해 5-1-1-2",
                                            "표준해 5-1-1-3",
                                            "표준해 5-1-1-4",
                                            "표준해 5-1-1-5",
                                            "표준해 5-1-1-6",
                                            "표준해 5-1-1-7",
                                            "표준해 5-1-1-8",
                                            "표준해 5-1-1-9",
                                        ],                                        
										txt: [
                                            "수중에 콘크리트를 가설할 때, 콘크리트가 식어 수축하면서 균열이 발생하는 문제가 있다. 콘크리트와 함께 거품(팽창재)을 같이 넣어줌으로써, 콘크리트가 수축하여 균열이 가는 것을 방지함",
                                            "화염의 열기가 외부로 나가지 못하도록 하는 내화벽(Fire Barrier)은 열기를 식히기 위하여 구멍들이 나 있다. 구멍으로 화염이 외부로 나가는 문제가 있다. 내화벽을 압전물질로 만들고, 정전기장(Electrostatic Field)을 인가하면 탄성변형에 의한 압축력에 의해 구멍의 크기를 조절할 수 있다.",
                                            "Gas에 의해 뿌려지는 금속입자는 연소실에 녹아서 외부로 뿌려진다. 이때 녹은 입자들이 공기에 노출되어 온도가 떨어져 Tip의 끝부분에 달라붙는다. 이를 개선하기 위하여 주변에 불활성 Gas를 같이 불어줌으로써 외부 공기와 접촉하지 않도록 한다. ",
                                            "두 개의 금속부푸품을 용접할 때 두 금속 사이에 금속 파우더(S1)를 놓아두고 토치로 가열해서 두 개의 금속을 붙인다. 하지만 토치의 열이 너무 과하면 파우더가 녹는 것을 균일하게 하기 어렵고, 토치의 열이 낮으면 파우더가 녹지 않는다. 이럴 경우 파우더 아래에 작은 열(F<sub>min</sub>)에도 높은 열을 내는 발열성 물질(S2)을 넣어서 국부적으로 높은 열을 내도록 함으로써 파우더가 균일하게 녹도록 한다.",
                                            "Shaft의 Sealing에 탄성 고무 재질의 소재가 많이 사용된다. Shaft와의 마찰열로 인해 고무 Seal이 물러져서 Sealing이 약해짐.황(Sulphur)을 Shaft의 표면에 뿌리면, 회전하는 Shaft에 의해 황이 Shaft에 도포되어 Seal을 더 단단하게 만든다.",
                                            "회전판을 이용하여 감자의 껍질을 벗기면 버려지는 부분이 많고 제대로 벗겨지지 않은 부분이 있을 수 있다.얼음 알갱이를 감자에 쏘면, 내부에서 회전하는 얼음 알갱이들에 의해 감자의 껍질이 모두 벗겨진다.",
                                            "살아있는 맹금류(뱀, 악어 등)의 길이를 측정하는 것은 매우 위험한 일이다. 이 경우, 측정자와 함께 사진을 찍어 길이를 측정할 수 있다.",
                                            "나무는 암모니아에 의해 가소화될 수 있다. 나무의 표면을 가소화하는 과정에서 암모늄염으로 처리할 경우, 처리하는 과정에서 발생하는 열에 의해 암모늄염은 분해되어 암모니아를 형성한다.",
                                            "전기 화학 공정 중 전기적 분해물을 제거할 필요가 있다. 전기적 분해물을 제거하기 위하여 전기 분해시 발생하는 기포(Bubble)을 이용한다."

                                        ],    
										
										txt_refer : [
                                            "",
                                            "",
                                            "",
                                            "",
                                            "",
                                            "",
                                            "",
                                            "가소화 : 고체가 어떤 힘을 받아 형태가 바뀐 뒤, 그 힘을 없애도 본디 모양으로 돌아가지 않는 성질로 됨",
                                            ""
										]								
									}
								],
								content_ex_img : [
                                    "img_ex_5-1-1-1.png",
                                    "img_ex_5-1-1-2.png",
                                    "img_ex_5-1-1-3.png",
                                    "img_ex_5-1-1-4.png",
                                    "img_ex_5-1-1-5.png",
                                    "img_ex_5-1-1-6.png",
                                    "img_ex_5-1-1-7.png",
                                    "",
                                    "",
                                ]
                            },
                            
                            {
								ko_title : "5-1-2. 기존의 장을 우선 활용",
								en_title : "",
								content_li : [
									{
										txt : "만일 시스템을 요구대로 변화시키는 것이 어렵고 도구를 다른 것으로 대치하는 것이나 첨가물을 도입하는 것이 불가능하다면, 도구(Tool) 대신에 대상(Object)을 사용할 수 있다.",
										txt_detail : [
											"대상을 서로 상호 작용하는 요소로 나누어 사용한다."
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "자동차 연료의 효율을 증가시키기 위해 두개의 통로로 연료와 공기를 각각 보내어 부딪히게 한다.",
										txt_detail : [
										
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-1-2.png"
                            },
                            {
								ko_title : "5-1-3. 도입 후 사라지는 물질",
								en_title : "",
								content_li : [
									{
										txt : "시스템 내에 물질이 도입되어 기능을 수행한 이후에는 이 물질은 사라지거나 시스템 내부 또는 외부환경에 존재하는 물질과 구분될 수 없도록 되어야 한다.",
										txt_detail : [
											"도입된 물질은 화학적 작용이나 상태 변화 등에 의해 제거됨"
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "고순도의 산화 알루미늄을 유도가열하여 녹이기 위해서는 전도체가 도입되어야 한다. 녹은 산화알루미늄의 순도를 유지하기 위하여 순수 알루미늄을 전도체로 도입함.",
										txt_detail : [
										
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : ""
                            },
                            {
								ko_title : "5-1-4. 팽창하는 물질 도입",
								en_title : "",
								content_li : [
									{
										txt : "많은 양의 물질을 시스템 내에 도입해야 하지만 불가능하면, 팽창하는 구조의 Void또는 거룸(Foam)등을 도입한다.",
										
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "사고난 비행기를 들어 올리기 위해 날개 아래에 팽창하는 주머니(Bag)를 설치한다. 팽팽한 주머니에 의해 배행기는 들어올려지고, 수송용 차량이 팽창한 주머니 사이로 들어가서 비행기를 싣고 이동한다.",
										txt_detail : [
										
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-1-4.png"
                            },
						]
                    },
					{
                        ko_title : "5.2. 장의 도입",
						en_title : "",
                        content : [
                            {
								ko_title : "5-2-1. 기존의 장을 우선 활용",
								en_title : "",
								content_li : [
									{
										txt : "물질-장 모델 내부에 장이 도입되어야 한다면, 스스템을 구성하는 물질을 매개로 하는 기존의 장을 우선적으로 이용한다.",
										txt_detail : [
											
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "액체 산소 안에 들어 있는 가스를 분리하고자 할 경우, 액체를 파이프에서 회전운동을 시키면 액체는 원심력에 의해 바깥으로 이동해가고, 가스는 중심으로 모이게 한 후 가스만 추출함.",
										txt_detail : [
										
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-2-1.png"
                            },
                            {
								ko_title : "5-2-2. 외부 환경에 존재하는 장을 이용",
								en_title : "",
								content_li : [
									{
										txt : "물질-장 모델내부에 장이 도입되어야 하지만 시스템 내부에 존재하는 기존 장을 사용할 수 없으면, 시스템의 외부환경에 존재하고 있는 장을 이용한다.(중력,열, 압력등)",
										txt_detail : [
											
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "강에 설치된 다리의 배수 파이프의 끝을 노즐 형태로 설치하면, 공기 흐름에 의해 물을 더 효과적으로 뺄 수 있음.",
										txt_detail : [
										
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-2-2.png"
                            },
                            {
								ko_title : "5-2-3. 장을 발생시키는 물질의 이용",
								en_title : "",
								content_li : [
									{
										txt : "물질-장 모델 내부에 장이 도입되어야 하지만, 시스템 내부 또는 외부에 존재하는 기존 장을 사용할 수 없으면, 시스템의 내부 또는 외부에 존재하고 있는 물질이 매개가 되거나 원천이 될 수 있는 장을 이용한다.",
										txt_detail : [
											
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "하이브리드 자동차는 감소 시 바퀴(Object)가 스스로 마찰에너지를 전기에너지로 충전(원하는 결과물) 시킴, 별도의 충전기가 필요 없음",
										txt_detail : [
										
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-2-3.png"
							}
						]
                    },
					{
                        ko_title : "5.3. 상전이 활용",
						en_title : "",
                        content : [
							{
								ko_title : "5-3-1. 물질의 상을 변화시킴",
								en_title : "",
								content_li : [
									{
										txt : "만일 다른 물질의 도입 없이 물질 사용의 효율을 증가 시키려면, 그 물질의 상을 변화 시켜 달성될 수 있다.",
										txt_detail : [
											
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "물이 얼때 팽창하는 힘을 이용하여 바위를 깬다.",
										txt_detail : [
										
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-3-1.png"
                            },
                            {
								ko_title : "5-3-2. 상이 변하는 물질의 이용",
								en_title : "",
								content_li : [
									{
										txt : "만일 두가지 특성이 필요하다면, 동작 조건에 따라 하나의 상에서 또 다른 상으로 변환될 수 있는 물질을 이용함으로써 달성될 수 있다.",
										txt_detail : [
											
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "열교환기의 Tab을 형상기억합금으로 만들어서 부착함으로써 온도가 낮을 때는 Tap이 닫혀 있다가, 온도가 올라가면 Tap이 열려서 냉각 표면을 증가시킴",
										txt_detail : [
										
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-3-2.png"
                            },
                            {
								ko_title : "5-3-3. 상 전이에 수반된 물리 효과를 이용",
								en_title : "",
								content_li : [
									{
										txt : "상 변화에 수반되는 물리적 현상을 이용함으로써 시스템의 효율을 향상 시킴",
										txt_detail : [
											
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "무거운 짐을 이동시키기 위해 얼음으로 지지하는 받침대를 만든다. 얼음이 녹을 때 마찰력이 감소하여 쉽게 짐을 이동시킬 수 있음.",
										txt_detail : [
										
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-3-3.png"
                            },
                            {
								ko_title : "5-3-4. 2중 상태로 전이",
								en_title : "",
								content_li : [
									{
										txt : "하나의 상을 가진 물질을 2개의 상을 가진 물질로 대체함",
										txt_detail : [
											
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "가공물을 연마하기 위하여 연마재를 포함하고 있는 액체 속에서 가공물을 회전 시킨다.고체 Blade는 연마재가 일정 범위 내에 있도록 하고 있지만, 효과가 불충분함. 이러한 문제는 강자성 입자를 연마재로 활용하고 외부에 자기장을 인가하면, 효과적으로 강자성 연마재와 가공물이 접촉하도록 한다.",
										txt_detail : [
										
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-3-4.png"
                            },
                            {
								ko_title : "5-3-5. 요소간 상호작용",
								en_title : "",
								content_li : [
									{
										txt : "시스템의 요소(상태)간의 상호작용(물리 또는 화학적)을 도입함으로써 단일 상의 물질을 두 개의 상을 가진 물질로 대체한 시스템의 효율을 향상 시킴",
										txt_detail : [
											
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "펌프로 온실의 지붕 사이로 컬러 액정을 공급한다. 컬러 액정의 투명도와 통과하는 두께에 의해 빛이 온실 내부로 들어가는 양을 조절한다. 이러한 펌프 장비는 가격이 비싸다.",
										txt_detail : [
                                            "열에 의해 팽창하는 액체를 이용함. 욕실의 온도가 돌라가면 액체는 팽창하고 지붕은 액체로 가득 차게 되어 빛이 더 이상 통과되지 않음."
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-3-5.png"
                            },
						]
                    },
					{
                        ko_title : "5.4. 물리효과 및 현상 활용",
						en_title : "",
                        content : [
							{
								ko_title : "5-4-1. 대상 스스로 상전이 되는 물질",
								en_title : "",
								content_li : [
									{
										txt : "만일 대상이 주기적으로 서로 다른 물리적 상태를 유지해야 한다면, 물리적 가역 변환( 이온화-재결합, 분해-결합, 등)를 이용하여 대상이 스스로 이러한 전이를 수행하도록 할 수 있다.",
										txt_detail : [
											
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "마찰력이 발생하는 곳에 윤활유를 공급하는 복잡한 장치(펌프, 탱크)를 열팽창하는 장치로 사용함으로써 펌프를 없애버림.",
										txt_detail : [
                                            "마찰력에 의해 온도가 올라갈 경우, 열팽창한 요소의 부피가 증가한 힘(열팽창력)에 의해 윤활유가 Shaft로 공급됨. 냉각이 되면, 부피가 감소하여 윤활유 공급이 차단됨."
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-4-1.png"
                            },
                            {
								ko_title : "5-4-2. 출력장의 증폭",
								en_title : "",
								content_li : [
									{
										txt : "약한 입력장으로 강한 효과를 만들고자 할 경우, 물질을 변환시키는 변환자를 임계조건으로 설정함",
										txt_detail : [
											"에너지/장은 변환자의 방아쇠(Trigger) 역할을 함"
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "기체로 가득찬 용기의 Crack 유무를 확인하기 위해서 액체 탱크에 용기를 담그고 발생하는 기포(Bubble)를 육안으로 확인하여 Crack 유무를 판단하기 에는 신뢰성이 낮다. 기포의 공진 주파수를 측정함으로써 신뢰성을 높임.",
										txt_detail : [
                                            
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-4-2.png"
                            },
						]
                    },
					{
                        ko_title : "5.5. 물질입자의 확보",
						en_title : "",
                        content : [
							{
								ko_title : "5-5-1. 분해를 통해 물질 입자를 획득",
								en_title : "",
								content_li : [
									{
										txt : "만일 어떤 물질 입자(eg.이온)가 문제를 해결하기 위해서 필요하지만, 문제 조건에 의해 제한되면, 이 물질입자의 상위 구조 수준에 존재하고 있는 물질을 분해함으로써 얻을 수 있다.",
										txt_detail : [
											
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "고압의 수소(H2)를 얻기 위해 물(H2O)을 전기 분해하는 장치를 추가함.",
										txt_detail : [
                                            
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-5-1.png"
                            },
                            {
								ko_title : "5-5-2. 합성을 통해 물질 입자를 획득",
								en_title : "",
								content_li : [
									{
										txt : "만일 어떤 물질 입자(eg. 분자)가 문제를 해결 하기 위해서 필요하고, 이 물질입자를 상위구조 수준의 물질을 분해해서 얻을 수 없다면, 이 물질 입자는 이온과 같이 하부 구조 수준에 존재하고 있는 입자를 결합시켜 얻는다.",
										txt_detail : [
											
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "고분자 화합물을 사용하면 배의 유체 저항을 줄일 수 있지만, 많은 양의 고분자 화합물(중합체, Polymer)를 사용해야 하는 문제점이 있음.",
										txt_detail : [
                                            "전기장으로 물 분자 폴리머를 형성시킴"
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-5-2.png"
                            },
                            {
								ko_title : "5-5-3. 분해한 물질의 합성",
								en_title : "",
								content_li : [
									{
										txt : "만일 상위구조 수준의 물질이 분해되어야 한다면, 가장 용이한 방법은 이 물질의 가장 근접한 상위 구조의 요소를 분해하는 것이다. <br>만일 하위구조 수준의 물질을 결합하여야 한다면, 가장 용이한 방법은 이 물질의 가장 근접한 하위구조의 요소를 결합하는 것이다.",
										txt_detail : [
											
										],
										txt_refer : [
											
										],
									}
								],
								content_li_img : "",
								content_ex : [
									{
										txt: "피뢰침(전도봉)은 번개로부터 전파 수신장치를 보호한다. 하지만, 피뢰침은 전파가 전달되는 것을 방해한다. 피뢰침 대신 공기 기둥을 사용한다. 공기의 압력을 낮추면(진공) 희박한 공기는 쉽게 이온화된다. 번개차 치면, 내부는 플라즈마가 되어 번개를 지면으로 방출시킴.",
										txt_detail : [
                                            
										],
										txt_refer : [
										
										]								
									}
								],
								content_ex_img : "img_ex_5-5-3.png"
                            },
						]
                    }

				]
			}
		]
	}

	loadAll() {
		return Promise.resolve(this.data76);
	}
}
