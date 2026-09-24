# TRIZ Note — 스토어 출시 준비

현재 상태: **등록 가능한 최종 버전이 아님.** 아래 필수 항목과 실제 기기 결제 검증이 남아 있습니다. 앱 심사 통과는 보장되지 않습니다.

## 확정한 모델

- 무료 다운로드 + 1년 자동 갱신 구독. 미국 기준 목표 가격 **US$5/년**. 실제 제공 가능한 가격 포인트는 콘솔에서 확인하고, US$4.99 등으로 임의 변경하지 않습니다.
- 혜택: 전체 콘텐츠 및 구독 기간 중 신규 Effects·학습 자료 지속 업데이트. 제공하지 않는 업데이트 주기는 약속하지 않습니다. 업데이트 운영 계획을 심사 메모에 기재합니다.
- 웹사이트: https://www.illunex.com . TRIZ Note 운영자명·지원 이메일은 아직 확정하지 않았습니다.
- 과금 활성화 시 원리 1은 무료 샘플, 원리 2–40·심화 학습·Effects 상세·모순 도구는 유료입니다. 목록 탐색·계정 관리·삭제는 결제 없이 가능합니다. 이 무료 범위는 출시 전 확인합니다.
- 과금 플래그가 꺼진 개발 환경은 기존처럼 전체 열람 가능합니다. 이 상태로 출시하지 않습니다.

## 이번에 준비한 코드

- 연간 상품/베이스 플랜과 실제 청구 가격 일치 검사. Google은 단일 P1Y 자동 갱신 단계만 허용합니다. 무료 체험·할인·할부는 지원하지 않습니다.
- 자동 갱신·해지 안내, 구매 복원, Apple/Google 구독 관리 링크, 서버의 만료일 기준 접근 제어.
- 개인정보처리방침·이용약관·고객지원 링크 연결 자리. 실서비스 URL이 없으면 구매 버튼을 비활성화합니다.
- 이메일/비밀번호 로그인 유지, iOS 네이티브 Apple 로그인 코드(기본 비활성).
- 계정 삭제 화면/Edge Function 코드. 비밀번호 또는 Apple 인증 코드로 재인증하고, Apple 토큰 폐기 → 세션 해지 → 계정 및 FK 연계 데이터 삭제. 이 기기의 해당 계정 연습 메모도 삭제합니다.

## 반드시 남은 작업

1. **웹 정책 페이지**: TRIZ Note 전용 개인정보처리방침, 이용약관, 지원, 외부 계정 삭제 요청 페이지를 게시합니다. 다른 제품의 정책을 재사용하지 않습니다. 삭제 요청 페이지는 앱 설치 없이 접근 가능해야 하며 실제 처리 경로를 제공해야 합니다. URL을 `.env.local`에 설정합니다.
2. **법적 고지 확정**: 운영자·지원 이메일, 수집 정보(이메일/Apple 식별자/메모/학습·구매 기록), Supabase 처리·보관 지역, 보관 기간·백업·국외 이전·삭제 예외를 실제 운영과 맞춰 검토합니다. 현재 FK 삭제는 구매 기록도 삭제하므로 법정 보존 요구 및 구매 복구 정책을 출시 전 결정해야 합니다.
3. **스토어 콘솔**: 유료 앱 계약·세금·은행 정보, 앱 식별자 `com.triznote.app`, 스토어별 1년 자동 갱신 상품, USD 가격 및 국가별 가격, 구독 그룹/기본 플랜, 4개 언어 상품명·설명·심사 이미지를 등록합니다. Apple/Google 계약 수락과 계좌 입력은 운영자가 직접 합니다.
4. **서버 구매 수명주기**: App Store Server Notifications V2와 Google RTDN의 인증/서명 검증, 갱신·환불·취소·유예·보류·재시도·이벤트 중복/순서 역전 처리를 구현/배포해야 합니다. 현재 검증은 클라이언트가 제출한 거래 기준입니다. 앱을 닫은 동안의 갱신/환불을 완전하게 동기화하지 못합니다. 이 상태로 실결제를 활성화하지 마세요.
5. **복원/계정 경계**: 같은 계정 재설치·다른 기기 복원, iOS↔Android 동일 계정의 중복 구독 방지, 다른 앱 계정의 구매 복원 거부, 삭제 후 재가입한 구독자의 복구·지원 경로를 테스트합니다. 현재 검증은 원 구매 계정과 일치해야 합니다.
6. **서버 배포**: `delete-account`를 Supabase TrizNote2에 배포하고 테스트 전용 계정으로 재인증 실패/성공, 연계 데이터 삭제, 기존 토큰 사용 차단, 재시도를 검증합니다. 실제 사용자 계정으로 테스트하지 않습니다. 기존 구매 함수도 실제 Sandbox/테스터 환경에서 검증합니다.
7. **Apple 로그인**: Apple Developer App ID에 capability 활성화, Supabase Apple provider에 iOS bundle ID 설정, 아래 폐기용 비밀 값 설정, 새 네이티브 빌드 후 `EXPO_PUBLIC_APPLE_AUTH_ENABLED=true`. Android는 현재 이메일 로그인입니다. Apple 계정의 Android 내 삭제는 외부 삭제 페이지가 필요합니다.
8. **심사 제출물**: 지원 URL/개인정보 URL, App Privacy/Google Data safety, 연령등급·대상 연령, 콘텐츠 및 이미지 이용 권리, 무료/구독 범위, 테스트 로그인 계정, IAP 접근 경로, 계정 삭제 위치, 스크린샷(iPhone/iPad/Android), 정상 동작하는 서버를 준비합니다. 메모는 비공개이며 공개 사용자 게시물 기능은 없습니다.
9. **완성도**: 아직 남은 한국어 원문/이미지 라벨 번역, 문서 오탈자 및 기술 설명 검수, 작은 화면·태블릿·가로·접근성 글자 크기, 이미지 오프라인 로드, 잘못된 연결/오류 메시지, 앱 아이콘/스플래시 최종 디자인을 검증합니다.

## 설정과 검증

공개 설정은 `.env.example`를 참조합니다. 가격은 코드에 하드코딩하지 않습니다. 공개 환경변수에 Apple 키나 Supabase service-role 키를 넣지 마세요.

`delete-account` 서버 비밀 값:

- Supabase 기본 제공 `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`
- `APPLE_AUTH_CLIENT_ID` (iOS bundle ID), `APPLE_AUTH_TEAM_ID`, `APPLE_AUTH_KEY_ID`, `APPLE_AUTH_PRIVATE_KEY` (Sign in with Apple 키)
- 위 값은 기존 App Store Server API의 `APPLE_ISSUER_ID`/`APPLE_PRIVATE_KEY`와 용도가 다릅니다.

네이티브 모듈을 추가했으므로 Apple 로그인 사용 전 새 빌드가 필요합니다. 단순 새로고침으로 capability가 추가되지 않습니다.

```sh
npm run typecheck
npm test
npm run check:release
npm run ios
npm run android
```

`check:release`는 미완료된 정책 URL·상품·알림 처리를 실패로 보고합니다. 통과하더라도 실제 구매·계정 삭제 테스트와 콘솔 설정을 대체하지 않습니다. 이 문서는 심사 준비용이며 법률 검토를 대체하지 않습니다.

## 공식 기준

- [Apple App Review Guidelines 3.1.2 / 4.8 / 5.1.1](https://developer.apple.com/app-store/review/guidelines/)
- [Apple 계정 삭제 안내](https://developer.apple.com/support/offering-account-deletion-in-your-app/)
- [Google Play 구독 정책](https://support.google.com/googleplay/android-developer/answer/9900533)
- [Google 계정 삭제 요구사항](https://support.google.com/googleplay/android-developer/answer/13327111)
- [Supabase Apple 로그인](https://supabase.com/docs/guides/auth/social-login/auth-apple)
