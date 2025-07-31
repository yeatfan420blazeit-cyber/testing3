// Security Statistics Charts
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }

    // Cyber Attack Types Distribution Chart
    const attackTypesCtx = document.getElementById('attackTypesChart');
    if (attackTypesCtx) {
        try {
            new Chart(attackTypesCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Malware', 'Phishing', 'Ransomware', 'DDoS', 'Social Engineering', 'Others'],
                    datasets: [{
                        data: [34.2, 28.1, 15.7, 12.3, 6.8, 2.9],
                        backgroundColor: ['#ef4444', '#f59e0b', '#dc2626', '#3b82f6', '#8b5cf6', '#6b7280'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            handleChartError(error, 'attackTypesChart');
        }
    }

    // Data Breach Sources Chart
    const breachSourcesCtx = document.getElementById('breachSourcesChart');
    if (breachSourcesCtx) {
        try {
            new Chart(breachSourcesCtx, {
                type: 'bar',
                data: {
                    labels: ['External Attacks', 'System Glitches', 'Human Error', 'Malicious Insiders', 'Physical Actions'],
                    datasets: [{
                        label: 'Incidents (%)',
                        data: [45.2, 22.1, 21.4, 7.8, 3.5],
                        backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#6b7280'],
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Percentage of Incidents (%)'
                            }
                        }
                    }
                }
            });
        } catch (error) {
            handleChartError(error, 'breachSourcesChart');
        }
    }

    // Global Cybersecurity Spending Chart
    const spendingCtx = document.getElementById('spendingChart');
    if (spendingCtx) {
        try {
            new Chart(spendingCtx, {
                type: 'line',
                data: {
                    labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025 (Est)'],
                    datasets: [
                        {
                            label: 'Global Cybersecurity Spending',
                            data: [124.1, 139.8, 155.8, 172.5, 188.3, 215.8, 243.2],
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Security Software',
                            data: [45.2, 50.8, 57.1, 63.9, 70.2, 78.1, 86.5],
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Security Services',
                            data: [78.9, 89.0, 98.7, 108.6, 118.1, 137.7, 156.7],
                            borderColor: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            fill: true,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Spending (Billions USD)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Year'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    }
                }
            });
        } catch (error) {
            handleChartError(error, 'spendingChart');
        }
    }

    // Simulate real-time threat counter
    function updateThreatCounters() {
        const threatElements = {
            'daily-attacks': () => Math.floor(2244 + Math.random() * 200),
            'data-breaches': () => '$' + (4.45 + Math.random() * 0.5).toFixed(2) + ' Million',
            'ransomware-attacks': () => Math.floor(623 + Math.random() * 50) + ' Million',
            'phishing-emails': () => (3.4 + Math.random() * 0.3).toFixed(1) + ' Billion'
        };

        Object.keys(threatElements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = threatElements[id]();
            }
        });
    }

    // Update threat counters every 10 seconds for dramatic effect
    setInterval(updateThreatCounters, 10000);
});