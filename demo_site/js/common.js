/* ============================================
   공통 JavaScript - SemiFab Customer Portal
   ============================================ */

// 현재 시간 업데이트
function updateDateTime() {
    const now = new Date();

    const dateEl = document.getElementById('currentDate');
    const timeEl = document.getElementById('currentTime');

    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    }

    if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// 1초마다 시간 업데이트
setInterval(updateDateTime, 1000);
updateDateTime();

// 알림 배너 닫기
document.querySelectorAll('.alert-close').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.alert-banner').style.display = 'none';
    });
});

// 모바일 메뉴 토글
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}

// 숫자 애니메이션 (카운트업)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);

        if (element.dataset.suffix) {
            element.textContent = value + element.dataset.suffix;
        } else {
            element.textContent = value.toLocaleString();
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 페이지 로드 시 숫자 애니메이션
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-value[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count);
        animateValue(el, 0, target, 1000);
    });
});

// 알림 드롭다운 (간단 버전)
const notificationBtn = document.querySelector('.notification');
if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        alert('알림 기능은 데모 버전에서 지원되지 않습니다.');
    });
}

// 사용자 메뉴 드롭다운 (간단 버전)
const userMenu = document.querySelector('.user-menu');
if (userMenu) {
    userMenu.addEventListener('click', () => {
        alert('로그아웃 / 설정 기능은 데모 버전에서 지원되지 않습니다.');
    });
}

// 현재 페이지 네비게이션 활성화
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
setActiveNav();

console.log('🔬 SemiFab Customer Portal Loaded');
