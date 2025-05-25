$(document).ready(function() {
    const ctxSalesStock = $('#salesStockChart').get(0).getContext('2d');
    
    const dates = ['2023-06-01', '2023-06-02', '2023-06-03', '2023-06-04', '2023-06-05', '2023-06-06', '2023-06-07'];
    const salesData = [1200, 1900, 1500, 2000, 1800, 2500, 2200]; 
    const stockData = [5000, 4800, 4500, 4300, 4000, 3800, 4200]; 
    
    new Chart(ctxSalesStock, { 
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Deliver',
                    data: salesData,
                    borderColor: 'rgba(14, 109, 253, 1)', 
                    backgroundColor: 'rgba(14, 109, 253, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true 
                },
                {
                    label: 'Stock', 
                    data: stockData,
                    borderColor: 'rgba(16, 185, 129, 1)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true 
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6
                    }
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 7
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [2, 4],
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value >= 1000 ? value / 1000 + 'k' : value;
                        }
                    }
                }
            }
        }
    });

    const ctxProductDelivered = $('#productDeliveredChart').get(0).getContext('2d');
    const productData = {
        labels: ['Beras 5kg', 'Beras 3kg', 'Gula 1kg', 'Minyak Goreng 2L', 'Telur 1kg', 'Mie Instan (Box)'],
        datasets: [{
            label: 'PCS Delivered',
            data: [120, 95, 150, 75, 60, 110], 
            backgroundColor: [ 
                'rgba(13, 110, 253, 0.7)',  
                'rgba(25, 135, 84, 0.7)',  
                'rgba(255, 193, 7, 0.7)',   
                'rgba(13, 202, 240, 0.7)', 
                'rgba(220, 53, 69, 0.7)',   
                'rgba(108, 117, 125, 0.7)' 
            ],
            hoverOffset: 8 
        }]
    };

    new Chart(ctxProductDelivered, {
        type: 'doughnut',
        data: productData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%', 
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 10,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed + ' PCS';
                            }
                            return label;
                        }
                    }
                },
                title: { 
                    display: false, 
                    text: 'Product Delivery Breakdown', 
                    padding: {
                        top: 10,
                        bottom: 10
                    },
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
    const ctxRealtime = $('#realtimeTransactionChart').get(0).getContext('2d');

    function formatTime(date) {
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    const timeLabels = [];
    const productPcsData = []; 
    const now = new Date();
    now.setMinutes(Math.floor(now.getMinutes() / 5) * 5);
    now.setSeconds(0);
    now.setMilliseconds(0);

    for (let i = 0; i < 6; i++) { 
        const pastTime = new Date(now.getTime() - ((5 - i) * 5 * 60 * 1000));
        timeLabels.push(formatTime(pastTime));
        productPcsData.push(Math.floor(Math.random() * 150) + 20);
    }

    new Chart(ctxRealtime, { 
        type: 'bar',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'PCS Product Deliver',
                data: productPcsData,
                backgroundColor: 'rgba(13, 110, 253, 0.9)', 
                borderColor: 'rgba(13, 110, 253, 1)',
                borderWidth: 1,
                borderRadius: 4,
                barPercentage: 0.6,
                categoryPercentage: 0.7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#fff',
                    titleColor: '#333',
                    bodyColor: '#555',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 4,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US').format(context.parsed.y) + ' Pcs';
                            }
                            return label;
                        }
                    }
                },
                legend: {
                    display: true, 
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8,
                        padding: 15,
                        color: '#333'
                    }
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#555',
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 6
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [3, 3],
                        drawBorder: false,
                        color: '#e0e0e0'
                    },
                    ticks: {
                        color: '#555',
                        callback: function(value) {
                            if (Number.isInteger(value)) { 
                                if (value >= 1000) {
                                    return (value / 1000) + 'k';
                                }
                                return value;
                            }
                            return null; 
                        }
                    }
                }
            }
        }
    });
});