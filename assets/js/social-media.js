// Social Media Statistics Charts
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }

    // Platform Market Share Chart
    const marketShareCtx = document.getElementById('marketShareChart');
    if (marketShareCtx) {
        try {
            new Chart(marketShareCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Facebook', 'YouTube', 'Instagram', 'TikTok', 'LinkedIn', 'Twitter'],
                    datasets: [{
                        data: [29.6, 27.0, 23.5, 10.5, 9.0, 4.5],
                        backgroundColor: ['#1877f2', '#ff0000', '#e4405f', '#000000', '#0077b5', '#1da1f2'],
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
            handleChartError(error, 'marketShareChart');
        }
    }

    // Age Demographics Chart
    const ageCtx = document.getElementById('ageChart');
    if (ageCtx) {
        try {
            new Chart(ageCtx, {
                type: 'bar',
                data: {
                    labels: ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
                    datasets: [{
                        label: 'Users (%)',
                        data: [8.2, 23.6, 31.2, 20.3, 11.2, 4.1, 1.4],
                        backgroundColor: generateChartColors(7),
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
                                text: 'Percentage (%)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Age Groups'
                            }
                        }
                    }
                }
            });
        } catch (error) {
            handleChartError(error, 'ageChart');
        }
    }

    // Daily Active Users Trend Chart
    const trendsCtx = document.getElementById('trendsChart');
    if (trendsCtx) {
        try {
            new Chart(trendsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            label: 'Facebook',
                            data: [1.95, 1.96, 1.97, 1.98, 1.98, 1.99, 1.99, 1.98, 1.97, 1.98, 1.99, 2.0],
                            borderColor: '#1877f2',
                            backgroundColor: 'rgba(24, 119, 242, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'Instagram',
                            data: [1.4, 1.42, 1.44, 1.46, 1.48, 1.5, 1.52, 1.54, 1.56, 1.58, 1.6, 1.62],
                            borderColor: '#e4405f',
                            backgroundColor: 'rgba(228, 64, 95, 0.1)',
                            tension: 0.4
                        },
                        {
                            label: 'TikTok',
                            data: [0.8, 0.82, 0.85, 0.88, 0.91, 0.94, 0.97, 1.0, 1.03, 1.06, 1.09, 1.12],
                            borderColor: '#000000',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'Daily Active Users (Billions)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Month (2024)'
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
            handleChartError(error, 'trendsChart');
        }
    }
});