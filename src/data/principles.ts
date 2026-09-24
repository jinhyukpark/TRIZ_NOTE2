import legacy from './legacy.json'
import learningGuides from './learningGuides.json'
import additionalExamples from './additionalExamples.json'
import principleDetails from './principleDetails.ko.json'
export type Principle = {
  id: number
  ko: string
  en: string
  cue: string
  question: string
  example: string
  tags: string[]
  image: string
  exampleTitle: string
  sections: { title: string; subTitle?: string[] }[]
  guide: { summary: string; steps: string[]; labels: string[]; note: string }
}

const rows = [
  ['분할','Segmentation','하나를 독립적인 부분으로 나눈다','더 작게 나누면 필요한 부분만 바꾸거나 쓸 수 있는가?','큰 트럭 대신 여러 대의 작은 트럭을 운영한다.'],
  ['추출','Taking out','방해되는 부분은 빼고 필요한 성질만 남긴다','문제를 일으키는 부분만 떼어낼 수 있는가?','에어컨의 소음과 열을 내는 실외기를 밖으로 분리한다.'],
  ['국부적 품질','Local quality','각 부분을 서로 다른 최적 조건으로 만든다','모든 곳이 같아야 한다는 가정을 버리면?','지우개가 필요한 연필 끝에만 지우개를 붙인다.'],
  ['비대칭','Asymmetry','대칭을 깨거나 비대칭 정도를 높인다','좌우가 달라지면 더 편하거나 강해지는가?','손 모양에 맞춘 인체공학 마우스를 만든다.'],
  ['통합','Merging','관련된 대상이나 동작을 함께 묶는다','따로 하던 일을 동시에 처리할 수 있는가?','여러 혈액 검사를 한 장비에서 동시에 수행한다.'],
  ['다용도','Universality','한 대상이 여러 기능을 맡게 한다','하나가 다른 부품의 역할까지 할 수 있는가?','노트북 가방을 펼쳐 거치대로도 사용한다.'],
  ['포개기','Nested doll','대상을 다른 대상 안에 넣는다','빈 공간 안에 보관하거나 이동시킬 수 있는가?','쇼핑 카트를 서로 포개어 보관한다.'],
  ['무게 보상','Anti-weight','다른 힘으로 무게를 상쇄한다','부력·양력·균형추로 하중을 줄일 수 있는가?','물에 뜨는 손잡이를 국자에 적용한다.'],
  ['사전 반대조치','Preliminary anti-action','예상 작용과 반대되는 힘을 미리 준다','나중의 변형을 미리 반대로 보상하면?','판 스프링에 미리 반대 방향 응력을 준다.'],
  ['사전 조치','Preliminary action','필요한 변화를 미리 수행한다','사용 직전의 준비를 제품에 넣을 수 있는가?','우표 뒷면에 접착제를 미리 바른다.'],
  ['사전 대비','Beforehand cushioning','실패에 대비한 안전 수단을 미리 둔다','문제가 생긴 뒤 피해를 줄일 완충 장치는?','차량에 에어백을 미리 설치한다.'],
  ['높이 맞추기','Equipotentiality','올리거나 내리는 일을 없앤다','작업 높이를 같게 만들어 이동을 줄일 수 있는가?','트럭과 창고 바닥의 단차를 도크로 맞춘다.'],
  ['거꾸로 하기','The other way round','작용·움직임·배치를 뒤집는다','고정된 것을 움직이고 움직이던 것을 고정하면?','사람 대신 바닥이 움직이는 러닝머신을 쓴다.'],
  ['곡률 증가','Spheroidality','직선을 곡선으로, 평면을 구면으로 바꾼다','회전·롤러·곡면을 쓰면 마찰이 줄어드는가?','볼펜 끝의 볼로 잉크를 고르게 전달한다.'],
  ['동적 특성','Dynamics','상황에 따라 구조와 조건이 바뀌게 한다','사용 중 스스로 조절되는 구조는 가능한가?','각도와 높이를 바꾸는 조절식 의자를 만든다.'],
  ['과부족 조치','Partial action','완벽 대신 조금 덜하거나 더 수행한다','100%가 어렵다면 80%로도 목적을 달성하는가?','스프레이로 필요한 양보다 조금 넓게 도장한다.'],
  ['차원 바꾸기','Another dimension','1차원에서 2차원, 2차원에서 3차원으로 옮긴다','쌓거나 기울이거나 다른 면을 쓰면?','평면 주차장을 다층 주차장으로 바꾼다.'],
  ['기계적 진동','Mechanical vibration','진동·공진·초음파를 이용한다','흔들거나 주파수를 맞추면 더 쉽게 되는가?','초음파로 미세 부품을 세척한다.'],
  ['주기적 작용','Periodic action','연속 작용을 펄스나 주기로 바꾼다','계속하는 대신 필요한 순간에만 작동하면?','교통 신호로 차량 흐름을 주기적으로 제어한다.'],
  ['유용한 작용의 지속','Continuity of useful action','쉬는 시간과 헛동작을 없앤다','대기 시간에도 가치 있는 일을 하게 할 수 있는가?','프린터가 양방향 이동 모두에서 인쇄한다.'],
  ['고속 처리','Skipping','위험하거나 해로운 구간을 빠르게 통과한다','아주 빠르게 하면 부작용이 줄어드는가?','고온 공정을 짧게 수행해 열 손상을 줄인다.'],
  ['전화위복','Blessing in disguise','해로운 요소를 유용하게 활용한다','버리던 열·진동·폐기물을 자원으로 쓰면?','폐열로 들어오는 공기를 예열한다.'],
  ['피드백','Feedback','결과를 측정해 다음 작용을 조절한다','상태를 감지하고 스스로 보정할 수 있는가?','온도 센서로 난방 출력을 자동 조절한다.'],
  ['중간 매개체','Intermediary','직접 접촉 대신 중간 대상을 둔다','둘 사이에 전달자나 임시층을 넣으면?','장갑을 매개로 뜨거운 물체를 잡는다.'],
  ['셀프 서비스','Self-service','대상이 스스로 유지·보수하게 한다','작동 과정에서 청소나 충전도 함께 할 수 있는가?','회전 중 발생한 힘으로 필터를 자동 세척한다.'],
  ['복제','Copying','비싸거나 위험한 원본 대신 사본을 쓴다','실물 대신 이미지·모형·시뮬레이션이면 충분한가?','위험한 현장을 디지털 트윈으로 점검한다.'],
  ['일회용품','Cheap short-living objects','비싼 내구품을 값싼 단기품으로 바꾼다','반복 사용보다 안전한 일회용이 나은가?','멸균이 어려운 의료 도구를 일회용으로 만든다.'],
  ['기계 시스템 대체','Mechanics substitution','기계 방식을 빛·소리·전기장 등으로 바꾼다','접촉하지 않고 감지하거나 움직일 수 있는가?','기계식 스위치를 광센서로 대체한다.'],
  ['공기·유압 활용','Pneumatics and hydraulics','고체 부품 대신 기체나 액체를 쓴다','유체가 형상 변화와 힘 전달을 맡을 수 있는가?','에어 쿠션으로 제품을 부드럽게 이송한다.'],
  ['유연한 막','Flexible shells','딱딱한 구조를 얇고 유연한 막으로 바꾼다','필요할 때만 펼쳐지는 경계면은?','공기주입식 구조물로 보관 부피를 줄인다.'],
  ['다공성 재료','Porous materials','구멍을 내거나 다공성 물질을 채운다','빈 공간이 가벼움·흡수·단열을 만들 수 있는가?','다공성 포장재로 충격과 무게를 줄인다.'],
  ['색상 변경','Color changes','색·투명도·시각 표시를 바꾼다','보이지 않는 상태를 색으로 드러낼 수 있는가?','온도에 따라 색이 변하는 라벨을 붙인다.'],
  ['동질성','Homogeneity','상호작용하는 대상을 같은 재료로 만든다','접촉면의 재료를 같게 하면 문제가 줄어드는가?','용기와 내용물의 성분을 호환 재료로 맞춘다.'],
  ['폐기와 재생','Discarding and recovering','역할을 마친 부분은 버리고 다시 복원한다','사용한 부분만 사라지거나 재생되게 할 수 있는가?','소모된 보호막을 벗기고 새 층을 노출한다.'],
  ['속성 변환','Parameter changes','온도·농도·유연성·상태를 바꾼다','물질의 상태나 조건을 바꾸면 다루기 쉬운가?','운반 중 액체를 얼려 누출을 막는다.'],
  ['상전이','Phase transitions','상태 변화 때 생기는 효과를 쓴다','녹고 굳고 증발할 때의 에너지를 활용하면?','상변화 물질로 온도를 일정하게 유지한다.'],
  ['열팽창','Thermal expansion','열에 따른 팽창과 수축을 활용한다','온도 변화가 자동 작동을 만들 수 있는가?','바이메탈이 온도에 따라 스위치를 켠다.'],
  ['강한 산화제','Strong oxidants','일반 공기를 산소가 풍부한 환경으로 바꾼다','산화 반응을 더 빠르고 완전하게 만들면?','산소 농도를 높여 연소 효율을 높인다.'],
  ['불활성 환경','Inert atmosphere','반응하지 않는 환경이나 진공을 쓴다','산화·오염을 막도록 주변 환경을 바꾸면?','식품 포장 안을 질소로 채워 산패를 늦춘다.'],
  ['복합 재료','Composite materials','단일 재료 대신 서로 다른 장점을 결합한다','가벼움과 강도를 다른 재료로 동시에 얻으면?','탄소섬유 복합재로 가볍고 강한 구조를 만든다.'],
] as const

const tagSets = [['구조','분해'],['분리','핵심'],['최적화','구조'],['형상','인체공학'],['결합','효율'],['기능','통합'],['공간','수납'],['힘','보상']]

export const principles: Principle[] = rows.map((row, index) => ({
  id: index + 1,
  ko: row[0], en: row[1], cue: row[2], question: row[3], example: row[4],
  tags: tagSets[index % tagSets.length],
})).map((p, index) => {
  const original = legacy.principles[index]
  return { ...p, question:principleDetails[index].question, ko: original.shortKo, en: original.shortEng, cue: original.content[0].title,
    example: original.expExp, exampleTitle: original.expTitle,
    image: `/assets/illustrations/principle-${String(p.id).padStart(2, '0')}-3d-labeled.${p.id === 30 ? 'png' : 'jpg'}`,
    guide: learningGuides[index],
    sections: original.content.map((section,sectionIndex)=>({...section,subTitle:[...new Set([...(section.subTitle??[]).filter(x=>x.trim()),...((additionalExamples as Record<string,string[][]>)[String(p.id)]?.[sectionIndex]??[])])].slice(0,5)})), tags: [] }
})
