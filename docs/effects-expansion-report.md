# Effects 확장 적용 보고 — 2026-09-24

## 적용 범위

기존 14개를 보존하고 다음 17개를 Effects 메뉴·검색·분류·상세 화면에 추가했다. 전체 31개, 새 상세 85단계다.

| 항목 | 제공 영상 |
| --- | --- |
| 접착 | https://youtu.be/LghvHvI5LME |
| 응축 | https://youtu.be/HItuiqy_YX0 |
| 음향 부상 | https://youtu.be/0pZeYIiz9io |
| 양친매성 | https://youtu.be/kZGeWRZJId0 |
| 전착 | https://youtu.be/mJUKDM6euMI |
| 정전 유도 | https://youtu.be/wUUCXPIW_Xs |
| 증류 | https://youtu.be/BkkEOtKQTRU |
| 광이온화 | https://youtu.be/QDyg6EbgdZg |
| 크리밍 | https://youtu.be/3jB1JSqdAh4 |
| 빙엄 소성 | https://youtu.be/oMuXNSkanI4 |
| 에어로젤 단열 | https://youtu.be/G2MYi7czDMc |
| 아크 증발 | https://youtu.be/95mT54utvq4 |
| 활성 알루미나 | https://youtu.be/Fh665pWpMKU |
| 로런츠 힘 | https://youtu.be/3VVHwdyzILA |
| 강자성 | https://youtu.be/sQ7fEU_ATRY |
| 도플러 효과 | https://youtu.be/10rJyHRZrgM |
| 활성탄 흡착 | https://youtu.be/D3zU6OND4O8 |

## 화면과 콘텐츠

- 목록용 16:9 이미지 17개와 상세용 4:5 이미지 85개를 별도로 연결했다. 상세 이미지를 목록에 확대·잘라 사용하지 않는다.
- 장비의 재질·구도·효과를 항목별로 구성했다. 이미지 생성 스킬을 사용했고, 원리상 문제가 발견된 6장은 v2로 수정했다. 원본 v1은 보존했다.
- 제목·영어 보조 제목·단계·점/연결선/명칭·역할 설명은 네이티브 동적 텍스트다. 한국어·영어·일본어·중국어 데이터를 제공한다.
- 설명은 이미지 속 고정 글자가 아닌 네이티브 도형과 번역 텍스트로 구현했다. 계면 단면, 파형, 에너지 준위, 이온 이동, 응력 그래프, 자구, 흡착/파과 등 항목별 표현을 사용했다.
- 기존 공통 상세 구조, 단일 타임라인, 구분선, 단계 이동 및 제목 표시 규칙을 재사용한다.

## 파일 및 프롬프트

- `src/data/expansionEffects.ts`: 17개 항목의 4개 언어 콘텐츠와 5단계 정의.
- `src/data/expansionArtwork.ts`: 정적 Metro 이미지 연결, 단계별 명칭 예외.
- `src/data/expansionPositions.ts`: 목록 및 85단계의 연결선 대상/명칭 좌표.
- `src/ExpansionDiagram.tsx`: 17종의 단계별 설명 도식.
- `src/data/effects.ts`, `effectCatalog.ts`, `scientificArtwork.ts`, `featuredEffects.ts`, `effectCallouts.ts`, `assets.ts`, `src/ScientificEffectArtwork.tsx`: 공통 앱 연결.
- `assets/content/effects/featured/{id}-v1.png`: 목록 이미지.
- `assets/content/effects/{id}-0{1..5}-portrait-v1.png`: 상세 원본.
- `docs/effects-expansion-plan.json`: 장비 설정 및 단계별 장면.
- `docs/effects-expansion-image-prompts.json`: 최초 102개 이미지에 사용한 프롬프트.

v2 수정 지시 요약: 정전 유도 04는 접지 분리 후 양전하, 05는 대전 막대를 제거하고 양전하를 분포시킨다. 로런츠 힘 01은 동일 구형 장치 내 직선 전자빔, 04는 나선이 아닌 작은 곡률 반경, 05는 반대 굽힘을 표현한다. 증류 03은 유리관 밖 증기를 제거하고 관 내부 흐름만 남긴다. 해당 6개 `*-portrait-v2.png`가 앱에 연결되어 있다.

## 원리 검토 및 해석 범위

17개 영상 제목과 미리보기 화면을 확인했다. 전체 영상 재생·자막 전수 검토를 수행한 것은 아니다. 영상을 그대로 복제하지 않고 교육용 장면으로 재구성했다. 정전 유도는 도체·접지 실험, 로런츠 힘은 전자빔과 코일, 아크 증발은 음극 아크 코팅 사례를 사용한다. 영상의 로런츠 힘 영문 오기는 표준 명칭으로 정리했다.

참고한 원리 자료:

- IUPAC creaming: https://goldbook.iupac.org/terms/view/C01389
- IUPAC photoionization: https://goldbook.iupac.org/terms/view/P04620
- NASA aerogels: https://www.nasa.gov/aeronautics/aerogels-thinner-lighter-stronger/
- EPA adsorption/treatment: https://www.epa.gov/sdwa/overview-drinking-water-treatment-technologies
- Acoustic levitation research: https://doi.org/10.1038/srep03176

생성 장비는 원리 이해를 위한 개념 표현이며 상용 제품 설계나 실제 성능을 검증한 장치가 아니다. 도식은 정량 시뮬레이션이 아니다. 크리밍과 합일, 흡착과 흡수, 광자 에너지 문턱, 빙엄 항복응력, 자기력의 방향 등을 구분해 설명했다.

## 검증

- `npm run typecheck`: 통과.
- `npm test`: 53개 모두 통과.
- 전체 31개 목록 및 155단계 연결선 데이터: 320/390/430pt, 4개 언어에 대한 렌더링/좌표/번역 검사 통과.
- 새 85단계: 이미지 존재·중복 여부·비율 및 설명 도식 렌더링 검사 통과.
- 생성 이미지 102개 및 한국어 연결선 합성 미리보기를 시각 점검했다.
- iOS 시뮬레이터에서 전체 31개 목록 연결과 새 목록 카드 표시를 확인했다.
- `npx expo export --platform ios --output-dir /tmp/triz-effects-expansion-ios-final-20260924`: 최종 번들 검증.

## 남은 제한사항

85단계를 4개 언어로 실제 시뮬레이터에서 각각 터치해 전수 확인한 것은 아니다. 자동 검사는 렌더링 데이터와 배치 조건을 확인하며, 모든 언어의 실제 폰트 줄바꿈을 보증하지 않는다. App Store 배포나 기기 설치용 네이티브 바이너리 빌드는 수행하지 않았다. 기존 사용자 변경 사항은 유지했다.
