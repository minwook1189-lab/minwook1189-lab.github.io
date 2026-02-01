# 반도체 파운드리 고객 포털 - 웹사이트 스펙 (압축 버전)

---

## ⚡ 요약 (Quick Summary)

> **한 줄 설명:** 반도체 파운드리 고객사가 자사 물량의 생산 현황을 확인하는 대시보드

### 핵심 요구사항
- **1개 페이지**: 홈(대시보드)만
- **기술**: HTML/CSS/JS, Chart.js로 차트 구현
- **디자인**: 파란색 메인 컬러, 깔끔하고 전문적인 UI
- **언어**: 한글

### 필수 포함 요소
| 구성 | 핵심 요소 |
|------|-----------|
| 헤더 | 로고(SemiFab) + 로그인 사용자(Samsung Electronics) |
| 지표 카드 | 4개 (진행 중 Lot, 수율, 출하 예정, Cycle Time) |
| 차트 | 월별 생산량 라인 차트 (Chart.js) |
| 테이블 | Lot 진행 현황 (3행) |

---

## 파일 구조

```
demo_site/
├── index.html      (메인 페이지)
└── style.css       (스타일)
```

---

## 페이지 상세 스펙

### 헤더 (간소화)
```
[◈ SemiFab Customer Portal]                    [Samsung Electronics 님]
```
- 좌측: 로고 아이콘(◈) + 회사명 + "Customer Portal"
- 우측: 로그인 사용자명

---

### 섹션 1: 핵심 지표 카드 (4개 가로 배치)

| 아이콘 | 수치 | 라벨 | 변화 |
|--------|------|------|------|
| 📦 | 127 | 진행 중 Lot | +12% |
| 📈 | 94.7% | 평균 수율 | +1.2% |
| 🚚 | 45 | 이번 달 출하 예정 | - |
| ⏱ | 18.5일 | 평균 Cycle Time | -2.3일 |

---

### 섹션 2: 월별 생산량 차트

- **차트 종류**: Line Chart (Chart.js)
- **데이터셋**: 생산량(파랑), 출하량(초록)
- **X축**: 8월, 9월, 10월, 11월, 12월, 1월
- **데이터**:
  - 생산량: [38, 42, 45, 48, 52, 45]
  - 출하량: [35, 40, 43, 46, 50, 42]

---

### 섹션 3: 주요 진행 Lot 테이블

| Lot ID | 제품 | 수량 | 현재 공정 | 진행률 | 상태 |
|--------|------|------|-----------|--------|------|
| LOT-2024-0892 | 5nm AP Chip | 25 wafers | Lithography | 67% | FAB |
| LOT-2024-0891 | 7nm GPU | 30 wafers | Final Test | 92% | TEST |
| LOT-2024-0888 | 5nm Modem | 20 wafers | Packaging | 100% | DONE |

- **진행률**: 프로그레스바로 시각화
- **상태 뱃지**: FAB=파랑, TEST=주황, DONE=초록

---

## 디자인 가이드

### 컬러
```css
--primary: #0066cc;      /* 메인 파랑 */
--success: #10b981;      /* 초록 */
--warning: #f59e0b;      /* 주황 */
--background: #f3f4f6;   /* 배경 회색 */
--white: #ffffff;
```

### 스타일
- **카드**: 흰 배경, 둥근 모서리(12px), 은은한 그림자
- **테이블**: 헤더 회색 배경, 행 호버 효과
- **상태 뱃지**: 각 상태별 색상 배경

---

## 외부 라이브러리

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

---

## 브랜딩

- **회사명**: SemiFab (파운드리)
- **고객명**: Samsung Electronics
- **로고 아이콘**: ◈

---

## 시연용 빠른 프롬프트

아래 프롬프트 하나로 요청 가능:

```
반도체 파운드리 고객 포털 대시보드 1페이지 만들어줘.

- 헤더: SemiFab 로고 + Samsung Electronics 로그인 표시
- 4개 지표 카드 (진행 중 Lot 127, 수율 94.7%, 출하예정 45, Cycle Time 18.5일)
- Chart.js 월별 생산량 라인 차트 (생산량, 출하량 2개 라인)
- Lot 진행 현황 테이블 3행 (진행률 바, 상태 뱃지 포함)
- 파란색 테마, 깔끔한 카드 디자인
```

---

## 즉석 수정 시나리오

| 요청 | 프롬프트 |
|------|----------|
| 회사명 변경 | "회사명을 SK키파운드리로 바꿔줘" |
| 사용자 변경 | "로그인 사용자를 '김민욱'으로 바꿔줘" |
| 색상 변경 | "메인 색상을 빨간색 계열로 바꿔줘" |

---

## 🚨 시연 전 트러블슈팅 가이드

> 연습 중 발생했던 오류와 해결 방법 정리

---

### 1. Python 패키지 미설치 오류

**증상:**
```
ModuleNotFoundError: No module named 'pandas'
```

**원인:** 메일 자동화 스크립트에 필요한 패키지가 설치되지 않음

**해결:**
```powershell
py -m pip install pandas matplotlib pywin32
```

**시연 전 체크:**
```powershell
py -m pip list | findstr "pandas matplotlib pywin32"
```

**주의:** `pip`이 PATH에 없을 수 있으므로 반드시 `py -m pip`으로 실행할 것

---

### 2. pandas/numpy 버전 호환성 오류

**증상:**
```
ValueError: numpy.dtype size changed, may indicate binary incompatibility
```

**원인:** pandas 2.0과 numpy 2.4 버전 불일치

**해결:**
```powershell
pip install --upgrade pandas
```

---

### 3. Windows 콘솔 인코딩 오류 (이모지)

**증상:**
```
UnicodeEncodeError: 'cp949' codec can't encode character '\U0001f4ca'
```

**원인:** Windows 콘솔이 UTF-8 이모지를 출력하지 못함

**해결:** 스크립트 상단에 아래 코드 추가
```python
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
```

또는 print문에서 이모지 제거 (✅ → [OK], ❌ → [ERROR])

---

### 4. Outlook 이메일 레이아웃 깨짐

**증상:** 이메일 본문에서 지표 카드가 세로로 나열됨 (가로 배치 안 됨)

**원인:** Outlook은 CSS `display: flex`, `display: grid` 미지원

**해결:** HTML 테이블 기반 레이아웃 사용

```html
<!-- ❌ 잘못된 방식 (Outlook에서 안 됨) -->
<div style="display: flex; gap: 20px;">
    <div>카드1</div>
    <div>카드2</div>
</div>

<!-- ✅ 올바른 방식 (테이블 사용) -->
<table width="100%">
    <tr>
        <td width="33%">카드1</td>
        <td width="33%">카드2</td>
        <td width="33%">카드3</td>
    </tr>
</table>
```

---

### 5. 가상환경 미설정 경고

**증상:** VSCode에서 Python 인터프리터 경고 메시지

**원인:** executive-workshop 폴더에 .venv 폴더 없음

**해결:**
```powershell
cd c:\Users\140773\Desktop\executive-workshop
py -m venv .venv
.\.venv\Scripts\pip.exe install pandas matplotlib pywin32
```

**VSCode 설정:** `Ctrl+Shift+P` → "Python: Select Interpreter" → `.venv` 선택

---

## ✅ 시연 전 체크리스트

| 항목 | 확인 명령어 | 예상 결과 |
|------|-------------|-----------|
| 가상환경 존재 | `dir .venv` | 폴더 존재 |
| 패키지 설치 | `py -m pip list \| findstr "pandas matplotlib pywin32"` | 3개 모두 표시 |
| 인터넷 연결 | 브라우저에서 Chart.js CDN 접속 | 정상 로드 |
| Outlook 실행 | Outlook 앱 열기 | 로그인 상태 |

---

## 🎭 시연 시 주의사항

> **핵심: AI가 처음 하는 것처럼 보여야 한다**

- Claude Code가 이 스펙 파일을 읽은 티를 내지 말 것
- 청중에게는 프롬프트 하나만으로 AI가 바로 만들어내는 것처럼 보여야 함
- 스펙 파일 읽기, 파일 탐색 등의 과정이 화면에 노출되지 않도록 주의
- 즉, **사전에 스펙을 숙지한 상태에서** 프롬프트만 입력받아 자연스럽게 진행

---

## 📁 demo_live 폴더 최종 구조

```
demo_live/
├── index.html              ← 고객 포털 대시보드
├── style.css               ← 스타일시트
├── sample_production_data.csv  ← 생산 데이터
├── send_chart_email.py     ← 메일 발송 스크립트
├── run_chart_email.bat     ← 스케줄러용 배치 파일
├── production_chart.png    ← 생성된 차트 이미지
└── email_preview.html      ← 이메일 미리보기
```
