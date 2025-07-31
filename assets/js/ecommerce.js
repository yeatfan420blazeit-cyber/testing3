// E-commerce Statistics Charts
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }

    // E-commerce Growth by Region Chart
    const regionGrowthCtx = document.getElementById('regionGrowthChart');
    if (regionGrowthCtx) {
        try {
            new Chart(regionGrowthCtx, {
                type: 'bar',
                data: {
                    labels: ['Asia-Pacific', 'North America', 'Europe', 'Latin America', 'Middle East & Africa'],
                    datasets: [{
                        label: 'Growth Rate (%)',
                        data: [12.4, 8.1, 6.7, 15.2, 18.9],
                        backgroundColor: generateChartColors(5),
                        borderRadius: 6
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
                                text: 'Growth Rate (%)'
                            }
                        }
                    }
                }
            });
        } catch (error) {
            handleChartError(error, 'regionGrowthChart');
        }
    }

    // Payment Methods Usage Chart
    const paymentCtx = document.getElementById('paymentChart');
    if (paymentCtx) {
        try {
            new Chart(paymentCtx, {
                type: 'pie',
                data: {
                    labels: ['Credit Cards', 'Digital Wallets', 'Bank Transfer', 'BNPL', 'Cash on Delivery', 'Others'],
                    datasets: [{
                        data: [32.1, 28.7, 15.3, 12.4, 8.2, 3.3],
                        backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#6b7280'],
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
            handleChartError(error, 'paymentChart');
        }
    }

    // E-commerce Revenue Trend Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        try {
            new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
                    datasets: [
                        {
                            label: 'Global E-commerce Revenue',
                            data: [3.5, 4.2, 4.9, 5.2, 5.5, 5.7],
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Mobile Commerce',
                            data: [1.4, 1.8, 2.3, 2.6, 2.8, 2.91],
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
                                text: 'Revenue (Trillions USD)'
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
            handleChartError(error, 'revenueChart');
        }
    }
});