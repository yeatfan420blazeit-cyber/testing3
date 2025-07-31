// Charts for the homepage
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }

    // Internet Penetration Chart
    const penetrationCtx = document.getElementById('penetrationChart');
    if (penetrationCtx) {
        try {
            showChartLoading('penetrationChart');
            
            const penetrationChart = new Chart(penetrationCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Connected', 'Not Connected'],
                    datasets: [{
                        data: [64.4, 35.6],
                        backgroundColor: ['#3b82f6', '#e5e7eb'],
                        borderWidth: 0,
                        cutout: '70%'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
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
                    },
                    animation: {
                        animateRotate: true,
                        duration: 2000
                    }
                },
                plugins: [{
                    beforeDraw: function(chart) {
                        const width = chart.width;
                        const height = chart.height;
                        const ctx = chart.ctx;
                        
                        ctx.restore();
                        const fontSize = (height / 100).toFixed(2);
                        ctx.font = fontSize + "em Inter";
                        ctx.fillStyle = '#1f2937';
                        ctx.textBaseline = "middle";
                        
                        const text = "64.4%";
                        const textX = Math.round((width - ctx.measureText(text).width) / 2);
                        const textY = height / 2;
                        
                        ctx.fillText(text, textX, textY);
                        ctx.save();
                    }
                }]
            });

            hideChartLoading('penetrationChart');
        } catch (error) {
            handleChartError(error, 'penetrationChart');
        }
    }

    // Device Usage Chart
    const deviceCtx = document.getElementById('deviceChart');
    if (deviceCtx) {
        try {
            showChartLoading('deviceChart');
            
            const deviceChart = new Chart(deviceCtx, {
                type: 'pie',
                data: {
                    labels: ['Mobile', 'Desktop', 'Tablet'],
                    datasets: [{
                        data: [58.99, 39.24, 1.77],
                        backgroundColor: ['#ef4444', '#3b82f6', '#10b981'],
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
                                padding: 20,
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
                    },
                    animation: {
                        animateRotate: true,
                        duration: 2000
                    }
                }
            });

            hideChartLoading('deviceChart');
        } catch (error) {
            handleChartError(error, 'deviceChart');
        }
    }

    // Simulate real-time updates for charts
    function updateChartData() {
        // Add slight variations to simulate real-time data
        const variation = 0.1;
        
        if (window.penetrationChart) {
            const currentValue = window.penetrationChart.data.datasets[0].data[0];
            const newValue = Math.max(60, Math.min(70, currentValue + (Math.random() - 0.5) * variation));
            window.penetrationChart.data.datasets[0].data = [newValue, 100 - newValue];
            window.penetrationChart.update('none');
        }
        
        if (window.deviceChart) {
            const mobile = window.deviceChart.data.datasets[0].data[0];
            const desktop = window.deviceChart.data.datasets[0].data[1];
            const tablet = window.deviceChart.data.datasets[0].data[2];
            
            const mobileVar = mobile + (Math.random() - 0.5) * variation;
            const desktopVar = desktop + (Math.random() - 0.5) * variation;
            const tabletVar = 100 - mobileVar - desktopVar;
            
            window.deviceChart.data.datasets[0].data = [
                Math.max(55, Math.min(65, mobileVar)),
                Math.max(35, Math.min(45, desktopVar)),
                Math.max(1, Math.min(3, tabletVar))
            ];
            window.deviceChart.update('none');
        }
    }

    // Update charts every 60 seconds
    setInterval(updateChartData, 60000);
    
    // Store chart references globally for updates
    window.penetrationChart = penetrationChart;
    window.deviceChart = deviceChart;
});