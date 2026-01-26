# ⏰ 메일 자동 발송 스케줄링 가이드

## Windows 작업 스케줄러로 매일 자동 실행하기

### 1단계: 배치 파일 생성

`run_daily_report.bat` 파일을 만들어 저장하세요:

```batch
@echo off
cd /d "C:\Users\peter\OneDrive\바탕 화면\cursor\executive_workshop"
python 04_daily_report_email.py
```

### 2단계: 작업 스케줄러 설정

1. **작업 스케줄러 열기**
   - `Win + R` → `taskschd.msc` 입력 → Enter

2. **새 작업 만들기**
   - 오른쪽 패널에서 "기본 작업 만들기" 클릭

3. **이름 및 설명**
   - 이름: `일일 생산 리포트 발송`
   - 설명: `매일 아침 8시 생산 현황 이메일 자동 발송`

4. **트리거 설정**
   - "매일" 선택
   - 시작 시간: `오전 8:00:00`
   - 매 1일마다 되풀이

5. **동작 설정**
   - "프로그램 시작" 선택
   - 프로그램/스크립트: `C:\경로\run_daily_report.bat`

6. **완료**
   - "마침" 클릭

### 3단계: 테스트

작업 스케줄러에서 만든 작업을 오른쪽 클릭 → "실행" 으로 테스트

---

## 주의사항

1. **Outlook이 실행 중이어야 함**
   - 스크립트 실행 시 Outlook이 자동으로 열리지만
   - 이미 로그인되어 있어야 정상 발송됨

2. **Python 경로 확인**
   - 배치 파일에서 `python` 대신 전체 경로 사용 권장
   - 예: `C:\Python39\python.exe`

3. **보안 설정**
   - Outlook 보안 경고가 뜰 수 있음
   - IT 부서에 매크로/자동화 허용 요청 필요할 수 있음

---

## 응용: 특정 조건에서만 발송

```python
# 수율이 93% 미만일 때만 긴급 알림 발송
if data["yield_rate"] < 93:
    subject = f"🚨 [긴급] 수율 저하 알림 ({data['yield_rate']}%)"
    send_email_via_outlook(emergency_recipients, subject, html_body)
```
