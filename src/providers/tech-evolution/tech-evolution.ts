import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TechEvolutionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TechEvolutionProvider {

	dataEvn: Object;

	constructor(public http: Http) {
		//console.log('Hello TechEvolutionProvider Provider');

		this.dataEvn = [
			{

				group :  "1", 
				ko_title 	: "기술시스템 구성의 법칙",
				content : [
					{
						index		: "1",
                        parent: "기술시스템 구성의 법칙",
                        ko_title 	: "시스템 완전성의 법칙",
						en_titile	: "",
			   			content     : {
							content  : [
								{
									content_li : [
										{
											txt : "기술시스템은 기능을 수행하기 위해서 <span class='word'>4개의 구성요소</span>를 갖추어야 한다.",
                                            txt_detail : [
											],
											txt_refer : [
												{ 
													refer_title : "<span class='word'>4가지 구성요소</span>",
													refer_detail : "엔진(Engine), 전달장치(Transmission) 도구(Tool), 제어장치(Control Unit)"
												}
											]
										}
									],
									content_archi_img : 	"img_archi_1.png",
									content_picture_img : 	"sub01.jpg",				
								},
							]
						}
						
					},
					{
                        index		: "2",
                        parent      : "기술시스템 구성의 법칙",
						ko_title 	: "에너지 전도성의 법칙",
						en_titile	: "",
						content     : {
							content  : [
								{
									content_li : [
										{
											txt : "기술시스템이 기능을 수행하기 위해서는 에너지원에서부터 엔진, 전달장치, 제어장치, 도구로 에너지가 잘 흘러야 한다.",
											txt_detail : [
											],
											txt_refer : [
												
											]
										}
									],
									content_archi_img : 	"img_archi_2.png",
									content_picture_img : 	"sub02.jpg",				
								},
							]
						} 
					},
					{
                        index		: "3",
                        parent      : "기술시스템 구성의 법칙",
						ko_title 	: "리듬 조화의 법칙",
						en_titile	: "",
						content     : {
							content  : [
								{
									content_li : [
										{
											txt : "기술시스템을 구성하는 4가지 구성요소들 사이에는 서로 리듬(크기, 고유진동수, 주파수등)이 조화를 이루어야 한다.",
											txt_detail : [
											],
											txt_refer : [
												
											]
										}
									],
									content_archi_img : 	"img_archi_3.png",
									content_picture_img : 	"sub03.jpg",				
								},
							]
						} 
					}
				]
			},
			{
				group :  "2", 
				ko_title 	: "기술시스템 발전의 법칙",
				content : [
					{
                        index		: "4",
                        parent      : "기술시스템 발전의 법칙",
						ko_title 	: "이상성 증가의 법칙",
						en_titile	: "",
						content     : {
							content  : [
								{
									content_li : [
										{
											txt : "모든 기술시스템은 이상성을 증가하는 방향으로 진화한다.",
											txt_detail : [
											],
											txt_refer : [
												
											]
										}
									],
									content_archi_img : 	"img_archi_4.png",
									content_picture_img : 	"sub04.jpg",				
								},
							]
						} 
					},
					{
                        index		: "5",
                        parent      : "기술시스템 발전의 법칙",
						ko_title 	: "시스템 불균등 발전 법칙",
						en_titile	: "",
						content     : {
							content  : [
								{
									content_li : [
										{
											txt : "기술시스템을 이루고 있는 각 구성요소들의 발전 속도는 각각 다르며, 전체 기술시스템의 진화 속도는 가장 느린 구성요소의 진화속도에 맞춰 진화한다.",
											txt_detail : [
											],
											txt_refer : [
												
											]
										}
									],
									content_picture_img : 	"sub05.jpg",				
								},
							]
						} 
					},
					{
                        index		: "6",
                        parent      : "기술시스템 발전의 법칙",
						ko_title 	: "상위 시스템으로의 이동 법칙",
						en_titile	: "",
						content     : {
							content  : [
								{
									content_li : [
										{
											txt : "기술시스템 자체로서 발전의 한계 상황에 도달하면(가용자원 소진) 그 기술시스템은 기술시스템을 포함하는 상위 시스템과 결합하거나 또는 기능만 상위 시스템으로 전이되어 새로운 시스템으로 진화한다.",
											txt_detail : [
											],
											txt_refer : [
												
											]
										}
									],
									content_picture_img : 	"sub06.jpg",				
								},
							]
						} 
					},
					{
                        index		: "7",
                        parent      : "기술시스템 발전의 법칙",
						ko_title 	: "마이크로 수준으로 이동 법칙",
						en_titile	: "",
						content     : {
							content  : [
								{
									content_li : [
										{
											txt : "기술시스템의 기능은 보다 세분화된 물질이나 장(에너지)을 사용하는 새로운 물리법칙을 적용하는 방향으로 진화한다.",
											txt_detail : [
												"물질을 미세하게 나누는 방법", 
												"비어있는 공간이나 기공을 이용하는 방법",
												"물질을 장으로 바꾸는 방법"
											],
											txt_refer : [
												
											]
										}
									],
									content_picture_img : 	"sub07.jpg",				
								},
							]
						} 
					},
					{
                        index		: "8",
                        parent      : "기술시스템 발전의 법칙",
						ko_title 	: "물질-장 수준 증가의 법칙",
						en_titile	: "",
						content     : {
							content  : [
								{
									content_li : [
										{
											txt : "기술시스템은 인간의 개입을 최소화하는 방향(자동화)으로 발전한다.",
											txt_detail : [
												"제어성이 용이한 방향으로 물질-장을 증가 시킨다.(MAThChEM)"
											],
											txt_refer : [
												{ 
													refer_title : "<span class='word'>장(Field)</span>",
													refer_detail : "정적(Static)인 질량상태(물질)로 있지 않고, 물질간의 상호 작용을 일으키는 에너지원"
												}, 
												{
													refer_title : "<span class='word'>MAThChEM<span>",
													refer_detail : "각 장의 앞 약자로 만들어진 장의 진화방향을 의미하는 TRIZ 용어 (기계장(M) → 음향장(A) → 열장(Th) →화학장(Ch)→ 전기장(E) → 자기장(M))"
												}
											]
										}
									],
									content_picture_img : 	"sub08.jpg",				
								},
							]
						} 
					},
					{
                        index		: "9",
                        parent      : "기술시스템 발전의 법칙",
						ko_title 	: "역동성 증가의 법칙",
						en_titile	: "",
						content     : {
							content  : [
								{
									content_li : [
										{
											txt : "기술시스템은 성능향상을 위하여 정적인(Static) 구조에서 동적인(Dynamic) 구조로 진화한다.",
											txt_detail : [
											
											],
											txt_refer : [
												
											]
										}
									],
									
									content_picture_img : 	"sub09.jpg",				
								},
							]
						} 
					}
				]
			}
				
		]
	}

	loadAll() {
		return Promise.resolve(this.dataEvn);
	}
}
