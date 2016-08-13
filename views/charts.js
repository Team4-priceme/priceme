var ctx = document.getElementById("myChart");

    var myChart = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            datasets: [{
                label: 'Start Price',
                data: [12, 19, 3, 5, 2, 3, 6],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]


        },
        options: {
            title: {
                    display: true,
                    text: 'Porsche 9/11 prices week of xxx'
                    },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                            }
                    }]
                },
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem){
                        return tooltipItem.yLabel;
                    }
                }
            }
            
        }

    });
    




    var ctx = document.getElementById("myChart2");
    //Javascript object and assign variables. var_data1= 

    /*
    var apiObject = {
        data1: 'car3',
        data2: 'car4'
    };
    */
    //var chartData1 = apiObject.data1;
    //apiObject.data1 going into dataset.
    
    var myChart = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            datasets: [{
                label: 'Start Price',
                data: [, 19, 3, 5, 2, 3, 6],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]


        },
        options: {
            title: {
                    display: true,
                    text: 'Porsche 9/11 prices week of xxx'
                    },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                            }
                    }],
                xAxes: [{
                display: true
                    }]
                },
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem){
                        return tooltipItem.yLabel;
                    }
                }
            }
            
        }

    });