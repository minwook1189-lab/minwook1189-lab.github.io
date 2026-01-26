"""
📧 일일 생산 현황 자동 메일 발송 스크립트
- 매일 아침 전날 생산 데이터를 정리하여 Outlook으로 발송
- 반도체 파운드리 일일 리포트 예시
"""

import win32com.client
from datetime import datetime, timedelta
import random  # 데모용 랜덤 데이터 생성

# ============================================
# 1. 샘플 데이터 생성 (실제로는 DB나 파일에서 읽어옴)
# ============================================
def get_production_data():
    """전날 생산 데이터 가져오기 (데모용 샘플 데이터)"""

    yesterday = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")

    data = {
        "date": yesterday,
        "total_wafers_in": random.randint(800, 1000),      # 투입 웨이퍼
        "total_wafers_out": random.randint(750, 950),      # 산출 웨이퍼
        "yield_rate": round(random.uniform(93.0, 96.5), 1), # 수율
        "lots_completed": random.randint(15, 25),           # 완료 Lot
        "lots_in_progress": random.randint(100, 130),       # 진행 중 Lot

        # 공정별 현황
        "process_status": {
            "Lithography": random.randint(20, 35),
            "Etching": random.randint(15, 30),
            "Deposition": random.randint(25, 40),
            "Testing": random.randint(20, 35),
            "Packaging": random.randint(10, 20),
        },

        # 품질 이슈
        "quality_issues": random.randint(0, 3),

        # 주요 고객별 진행 현황
        "customer_status": [
            {"name": "Samsung", "lots": random.randint(30, 45), "on_track": True},
            {"name": "Apple", "lots": random.randint(25, 40), "on_track": True},
            {"name": "Qualcomm", "lots": random.randint(15, 30), "on_track": random.choice([True, False])},
            {"name": "NVIDIA", "lots": random.randint(20, 35), "on_track": True},
        ]
    }

    return data


# ============================================
# 2. 이메일 본문 HTML 생성
# ============================================
def create_email_html(data):
    """보기 좋은 HTML 이메일 본문 생성"""

    # 상태 색상 결정
    yield_color = "#4ade80" if data["yield_rate"] >= 94 else "#f59e0b" if data["yield_rate"] >= 92 else "#ef4444"

    html = f"""
    <html>
    <head>
        <style>
            body {{ font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; padding: 20px; }}
            .container {{ max-width: 700px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }}
            .header {{ background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; padding: 25px; }}
            .header h1 {{ margin: 0; font-size: 22px; }}
            .header p {{ margin: 5px 0 0; opacity: 0.8; }}
            .content {{ padding: 25px; }}
            .stats-grid {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 25px; }}
            .stat-box {{ background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center; }}
            .stat-box .value {{ font-size: 28px; font-weight: bold; color: #1a1a2e; }}
            .stat-box .label {{ font-size: 12px; color: #666; margin-top: 5px; }}
            .yield-box .value {{ color: {yield_color}; }}
            table {{ width: 100%; border-collapse: collapse; margin: 15px 0; }}
            th, td {{ padding: 12px; text-align: left; border-bottom: 1px solid #eee; }}
            th {{ background: #f8f9fa; font-weight: 600; color: #333; }}
            .status-ok {{ color: #4ade80; font-weight: bold; }}
            .status-warning {{ color: #f59e0b; font-weight: bold; }}
            .section-title {{ font-size: 16px; font-weight: 600; color: #1a1a2e; margin: 20px 0 10px; border-left: 4px solid #00d4ff; padding-left: 10px; }}
            .footer {{ background: #f8f9fa; padding: 15px 25px; font-size: 12px; color: #666; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📊 일일 생산 현황 리포트</h1>
                <p>{data['date']} 기준</p>
            </div>

            <div class="content">
                <!-- 핵심 지표 -->
                <div class="stats-grid">
                    <div class="stat-box">
                        <div class="value">{data['total_wafers_out']:,}</div>
                        <div class="label">산출 웨이퍼</div>
                    </div>
                    <div class="stat-box yield-box">
                        <div class="value">{data['yield_rate']}%</div>
                        <div class="label">종합 수율</div>
                    </div>
                    <div class="stat-box">
                        <div class="value">{data['lots_completed']}</div>
                        <div class="label">완료 Lot</div>
                    </div>
                </div>

                <!-- 공정별 현황 -->
                <div class="section-title">🏭 공정별 진행 현황</div>
                <table>
                    <tr>
                        <th>공정</th>
                        <th>진행 중 Lot</th>
                    </tr>
    """

    for process, count in data["process_status"].items():
        html += f"""
                    <tr>
                        <td>{process}</td>
                        <td>{count} Lots</td>
                    </tr>
        """

    html += """
                </table>

                <!-- 고객별 현황 -->
                <div class="section-title">👥 주요 고객별 현황</div>
                <table>
                    <tr>
                        <th>고객사</th>
                        <th>진행 Lot</th>
                        <th>납기 상태</th>
                    </tr>
    """

    for customer in data["customer_status"]:
        status_class = "status-ok" if customer["on_track"] else "status-warning"
        status_text = "정상" if customer["on_track"] else "지연 위험"
        html += f"""
                    <tr>
                        <td>{customer['name']}</td>
                        <td>{customer['lots']} Lots</td>
                        <td class="{status_class}">{status_text}</td>
                    </tr>
        """

    # 품질 이슈 알림
    issue_text = "이슈 없음" if data["quality_issues"] == 0 else f"{data['quality_issues']}건 발생 - 상세 확인 필요"
    issue_color = "#4ade80" if data["quality_issues"] == 0 else "#ef4444"

    html += f"""
                </table>

                <!-- 품질 알림 -->
                <div class="section-title">⚠️ 품질 이슈</div>
                <p style="color: {issue_color}; font-weight: bold;">{issue_text}</p>

            </div>

            <div class="footer">
                📧 본 메일은 자동 발송되었습니다. | 생산관리시스템 자동 리포트<br>
                문의: production-support@company.com
            </div>
        </div>
    </body>
    </html>
    """

    return html


# ============================================
# 3. Outlook으로 메일 발송
# ============================================
def send_email_via_outlook(to_list, subject, html_body, cc_list=None):
    """
    Outlook을 통해 이메일 발송

    Parameters:
        to_list: 수신자 이메일 주소 (리스트 또는 문자열)
        subject: 메일 제목
        html_body: HTML 형식의 메일 본문
        cc_list: 참조자 이메일 주소 (선택)
    """
    try:
        # Outlook 애플리케이션 연결
        outlook = win32com.client.Dispatch("Outlook.Application")
        mail = outlook.CreateItem(0)  # 0 = 메일 아이템

        # 수신자 설정
        if isinstance(to_list, list):
            mail.To = "; ".join(to_list)
        else:
            mail.To = to_list

        # 참조자 설정 (선택)
        if cc_list:
            if isinstance(cc_list, list):
                mail.CC = "; ".join(cc_list)
            else:
                mail.CC = cc_list

        # 메일 내용 설정
        mail.Subject = subject
        mail.HTMLBody = html_body

        # 메일 발송
        mail.Send()

        print(f"✅ 메일 발송 완료!")
        print(f"   수신자: {mail.To}")
        print(f"   제목: {subject}")

        return True

    except Exception as e:
        print(f"❌ 메일 발송 실패: {e}")
        return False


# ============================================
# 4. 메인 실행
# ============================================
def main():
    print("=" * 50)
    print("📧 일일 생산 현황 메일 발송 시작")
    print("=" * 50)

    # 1. 데이터 수집
    print("\n1️⃣ 생산 데이터 수집 중...")
    data = get_production_data()
    print(f"   - 날짜: {data['date']}")
    print(f"   - 수율: {data['yield_rate']}%")
    print(f"   - 완료 Lot: {data['lots_completed']}")

    # 2. 이메일 본문 생성
    print("\n2️⃣ 이메일 본문 생성 중...")
    html_body = create_email_html(data)
    print("   - HTML 본문 생성 완료")

    # 3. 메일 발송
    print("\n3️⃣ 메일 발송 중...")

    # 수신자 설정 (실제 사용시 수정)
    recipients = [
        "manager@company.com",
        "team-lead@company.com",
    ]
    cc_recipients = [
        "director@company.com",
    ]

    subject = f"[일일 리포트] 생산 현황 ({data['date']}) - 수율 {data['yield_rate']}%"

    # 발송 (실제 발송 원하면 아래 주석 해제)
    # send_email_via_outlook(recipients, subject, html_body, cc_recipients)

    # 데모용: 미리보기 파일 저장
    preview_path = "email_preview.html"
    with open(preview_path, "w", encoding="utf-8") as f:
        f.write(html_body)
    print(f"   - 미리보기 저장됨: {preview_path}")
    print("   - (실제 발송하려면 main() 함수의 주석 해제)")

    print("\n" + "=" * 50)
    print("✅ 완료!")
    print("=" * 50)


if __name__ == "__main__":
    main()
