/* ============================================
   홈 페이지 JavaScript
   ============================================ */

// 차트 데이터 (6개월 / 12개월)
const chartData = {
    '6months': {
        labels: ['8월', '9월', '10월', '11월', '12월', '1월'],
        production: [38, 42, 45, 48, 52, 45],
        shipment: [35, 40, 43, 46, 50, 42]
    },
    '12months': {
        labels: ['2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월', '1월'],
        production: [32, 35, 38, 40, 36, 39, 38, 42, 45, 48, 52, 45],
        shipment: [30, 33, 36, 38, 34, 37, 35, 40, 43, 46, 50, 42]
    }
};

// 월별 생산량 차트
const productionCtx = document.getElementById('productionChart');
let productionChart = null;

if (productionCtx) {
    productionChart = new Chart(productionCtx, {
        type: 'line',
        data: {
            labels: chartData['6months'].labels,
            datasets: [
                {
                    label: '생산량 (Lot)',
                    data: chartData['6months'].production,
                    borderColor: '#0066cc',
                    backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBackgroundColor: '#0066cc'
                },
                {
                    label: '출하량 (Lot)',
                    data: chartData['6months'].shipment,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBackgroundColor: '#10b981'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 46, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 30,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        stepSize: 10
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// 기간 선택 드롭다운 이벤트
const periodSelect = document.querySelector('.period-select');
if (periodSelect && productionChart) {
    periodSelect.addEventListener('change', function() {
        const period = this.value === '최근 6개월' ? '6months' : '12months';
        const data = chartData[period];

        productionChart.data.labels = data.labels;
        productionChart.data.datasets[0].data = data.production;
        productionChart.data.datasets[1].data = data.shipment;
        productionChart.update();
    });
}

console.log('📊 Home page charts loaded');
