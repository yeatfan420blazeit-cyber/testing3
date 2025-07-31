// Global Statistics Charts
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }

    // Internet Users by Region Chart
    const regionCtx = document.getElementById('regionChart');
    if (regionCtx) {
        try {
            new Chart(regionCtx, {
                type: 'bar',
                data: {
                    labels: ['Asia', 'Europe', 'N. America', 'L. America', 'Africa', 'Oceania'],
                    datasets: [{
                        label: 'Internet Users (Billions)',
                        data: [2.9, 0.705, 0.52, 0.467, 0.541, 0.033],
                        backgroundColor: generateChartColors(6),
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
                                text: 'Users (Billions)'
                            }
                        }
                    }
                }
            });
        } catch (error) {
            handleChartError(error, 'regionChart');
        }
    }

    // Internet Speed by Country Chart
    const speedCtx = document.getElementById('speedChart');
    if (speedCtx) {
        try {
            new Chart(speedCtx, {
                type: 'bar',
                data: {
                    labels: ['Monaco', 'Singapore', 'Chile', 'Denmark', 'Thailand'],
                    datasets: [{
                        label: 'Speed (Mbps)',
                        data: [319.59, 300.83, 298.5, 297.02, 295.88],
                        backgroundColor: '#3b82f6',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Speed (Mbps)'
                            }
                        }
                    }
                }
            });
        } catch (error) {
            handleChartError(error, 'speedChart');
        }
    }

    // Internet Growth Over Time Chart
    const growthCtx = document.getElementById('growthChart');
    if (growthCtx) {
        try {
            new Chart(growthCtx, {
                type: 'line',
                data: {
                    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
                    datasets: [{
                        label: 'Internet Users (Billions)',
                        data: [4.4, 4.6, 4.9, 5.0, 5.1, 5.16],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4
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
                            beginAtZero: false,
                            min: 4.0,
                            title: {
                                display: true,
                                text: 'Users (Billions)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Year'
                            }
                        }
                    }
                }
            });
        } catch (error) {
            handleChartError(error, 'growthChart');
        }
    }
});