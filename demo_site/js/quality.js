/* ============================================
   품질 리포트 페이지 JavaScript
   ============================================ */

// 수율 트렌드 차트
const yieldTrendCtx = document.getElementById('yieldTrendChart');

if (yieldTrendCtx) {
    new Chart(yieldTrendCtx, {
        type: 'line',
        data: {
            labels: ['1주차', '2주차', '3주차', '4주차'],
            datasets: [
                {
                    label: '실제 수율',
                    data: [93.2, 94.1, 94.5, 94.7],
                    borderColor: '#0066cc',
                    backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#0066cc'
                },
                {
                    label: '목표',
                    data: [93, 93, 93, 93],
                    borderColor: '#10b981',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false
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
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 46, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 90,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
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

// 공정별 수율 차트
const processYieldCtx = document.getElementById('processYieldChart');

if (processYieldCtx) {
    new Chart(processYieldCtx, {
        type: 'bar',
        data: {
            labels: ['Deposition', 'Lithography', 'Etching', 'CMP', 'Testing', 'Packaging'],
            datasets: [{
                label: '수율',
                data: [98.2, 95.8, 97.1, 96.5, 94.3, 99.1],
                backgroundColor: [
                    'rgba(0, 102, 204, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(0, 102, 204, 0.8)',
                    'rgba(0, 102, 204, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)'
                ],
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 46, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return '수율: ' + context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: false,
                    min: 90,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// 불량 유형 차트 (도넛)
const defectTypeCtx = document.getElementById('defectTypeChart');

if (defectTypeCtx) {
    new Chart(defectTypeCtx, {
        type: 'doughnut',
        data: {
            labels: ['Particle', 'Pattern Defect', 'Scratch', 'Metal Residue', 'Others'],
            datasets: [{
                data: [32, 27, 18, 13, 10],
                backgroundColor: [
                    '#0066cc',
                    '#ef4444',
                    '#f59e0b',
                    '#10b981',
                    '#6b7280'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 46, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

console.log('📊 Quality page charts loaded');
