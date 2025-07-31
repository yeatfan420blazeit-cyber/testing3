// Main JavaScript functionality for Internet Statistics Hub

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    return false;
});

// Ensure all required external libraries are loaded
function checkDependencies() {
    const dependencies = {
        'Chart.js': typeof Chart !== 'undefined',
        'Font Awesome': document.querySelector('link[href*="font-awesome"]') !== null
    };
    
    for (const [name, loaded] of Object.entries(dependencies)) {
        if (!loaded) {
            console.warn(`${name} may not be loaded properly`);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Check dependencies first
    checkDependencies();
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation to stat cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                // Mark as animated to prevent re-animation
                entry.target.setAttribute('data-animated', 'true');
                
                entry.target.style.opacity = '1';
                
                // Only apply transform to non-chart elements
                if (!entry.target.classList.contains('chart-container')) {
                    entry.target.style.transform = 'translateY(0)';
                }
                
                animateNumber(entry.target);
                
                // Stop observing this element after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all stat cards (excluding chart containers to prevent positioning bugs)
    const statCards = document.querySelectorAll('.stat-card:not(.chart-container), .quick-stat, .platform-card:not(.chart-container)');
    statCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Handle chart containers separately with a gentler animation
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        container.style.opacity = '0';
        container.style.transition = 'opacity 1s ease';
        observer.observe(container);
    });

    // Animate numbers in stat cards
    function animateNumber(element) {
        const numberElements = element.querySelectorAll('[id*="users"], [id*="sales"], [id*="attacks"], [id*="searches"], [id*="hours"], h3[id], h4[id]');
        
        numberElements.forEach(numberEl => {
            const text = numberEl.textContent;
            const numberMatch = text.match(/[\d,\.]+/);
            
            if (numberMatch) {
                const number = parseFloat(numberMatch[0].replace(/,/g, ''));
                const suffix = text.replace(numberMatch[0], '').trim();
                const prefix = text.substring(0, text.indexOf(numberMatch[0]));
                
                animateValue(numberEl, 0, number, 2000, prefix, suffix);
            }
        });
    }

    function animateValue(element, start, end, duration, prefix = '', suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            let displayValue = formatNumber(value);
            element.textContent = prefix + displayValue + ' ' + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Set final value with proper formatting
                element.textContent = prefix + formatNumber(end) + ' ' + suffix;
            }
        };
        window.requestAnimationFrame(step);
    }

    function formatNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1);
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1);
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1);
        }
        return num.toString();
    }

    // Real-time clock update (simulate live data)
    function updateLiveStats() {
        const elements = {
            'internet-users': () => (5.16 + Math.random() * 0.01).toFixed(2) + ' Billion',
            'websites-count': () => (1.88 + Math.random() * 0.01).toFixed(2) + ' Billion',
            'emails-sent': () => (333.2 + Math.random() * 10).toFixed(1) + ' Billion',
            'google-searches': () => (8.5 + Math.random() * 0.5).toFixed(1) + ' Billion',
            'youtube-hours': () => (1.0 + Math.random() * 0.1).toFixed(1) + ' Billion',
            'ecommerce-sales': () => '$' + (5.7 + Math.random() * 0.1).toFixed(1) + ' Trillion',
            'cyber-attacks': () => Math.floor(2244 + Math.random() * 100).toLocaleString()
        };

        Object.keys(elements).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = elements[id]();
            }
        });
    }

    // Update stats every 30 seconds to simulate real-time data
    setInterval(updateLiveStats, 30000);

    // Initialize Chart.js defaults
    if (typeof Chart !== 'undefined') {
        Chart.defaults.font.family = 'Inter, sans-serif';
        Chart.defaults.color = '#6b7280';
        Chart.defaults.plugins.legend.labels.usePointStyle = true;
        Chart.defaults.plugins.legend.labels.padding = 20;
        Chart.defaults.elements.arc.borderWidth = 0;
        Chart.defaults.elements.bar.borderRadius = 4;
        Chart.defaults.elements.line.tension = 0.4;
        
        // Ensure stable positioning for charts
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = false;
        Chart.defaults.resizeDelay = 100;
    }

    // Utility function to generate chart colors
    window.generateChartColors = function(count) {
        const colors = [
            '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
            '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
        ];
        return colors.slice(0, count);
    };

    // Utility function to create gradient
    window.createGradient = function(ctx, color1, color2) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    };

    // Error handling for charts
    window.handleChartError = function(error, chartId) {
        console.error('Error creating chart:', error);
        const canvas = document.getElementById(chartId);
        if (canvas && canvas.parentElement) {
            const container = canvas.parentElement;
            container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; min-height: 200px;"><p style="text-align: center; color: #ef4444; font-weight: 500;">Chart temporarily unavailable</p></div>';
        }
    };

    // Show loading state for charts
    window.showChartLoading = function(chartId) {
        const canvas = document.getElementById(chartId);
        if (canvas && canvas.parentElement) {
            const container = canvas.parentElement;
            container.classList.add('chart-loading');
            // Prevent any transforms during loading
            container.style.transform = 'none';
        }
    };

    window.hideChartLoading = function(chartId) {
        const canvas = document.getElementById(chartId);
        if (canvas && canvas.parentElement) {
            const container = canvas.parentElement;
            container.classList.remove('chart-loading');
            // Ensure canvas is properly positioned after loading
            setTimeout(() => {
                if (canvas) {
                    canvas.style.position = 'relative';
                    canvas.style.transform = 'none';
                }
            }, 100);
        }
    };
});

// Simulated API calls for demonstration
window.API = {
    async fetchGlobalStats() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return {
            internetUsers: 5.16,
            websites: 1.88,
            emailsDaily: 333.2,
            searchesDaily: 8.5,
            videoHours: 1.0,
            ecommerceRevenue: 5.7,
            cyberAttacks: 2244
        };
    },

    async fetchRegionalData() {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return [
            { region: 'Asia', users: 2.9, penetration: 61.8 },
            { region: 'Europe', users: 0.705, penetration: 94.2 },
            { region: 'North America', users: 0.52, penetration: 89.7 },
            { region: 'Latin America', users: 0.467, penetration: 70.9 },
            { region: 'Africa', users: 0.541, penetration: 38.6 },
            { region: 'Oceania', users: 0.033, penetration: 71.7 }
        ];
    },

    async fetchSocialMediaStats() {
        await new Promise(resolve => setTimeout(resolve, 400));
        
        return {
            facebook: 2.96,
            youtube: 2.70,
            instagram: 2.35,
            twitter: 0.45,
            linkedin: 0.9,
            tiktok: 1.05
        };
    },

    async fetchSecurityStats() {
        await new Promise(resolve => setTimeout(resolve, 350));
        
        return {
            dailyAttacks: 2244,
            breachCost: 4.45,
            ransomwareAttacks: 623,
            phishingEmails: 3.4
        };
    }
};

// Theme detection and handling
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function updateTheme(e) {
    // Future implementation for dark mode
    if (e.matches) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

prefersDarkScheme.addListener(updateTheme);
updateTheme(prefersDarkScheme);