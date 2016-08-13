var ctx = document.getElementById("startPrice");

    var startPrice = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Current Date"],
            datasets: [{
                label: 'Start Price',
                data: [50, 19, 3, 50, 2, 3, 60],
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
                    text: 'Mean Asking Price for Porsche 9/11 prices week of xxx'
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


    var ctx = document.getElementById("buyNowPrice");

    var startPrice = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Current Date"],
            datasets: [{
                label: 'Start Price',
                data: [12, 19, 3, 5, 2, 3, 70],
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
                    text: 'Mean Buy Now Price for Porsche 9/11 prices week of xxx'
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
    




    var ctx = document.getElementById("trendGraph");
    //Javascript object and assign variables. var_data1= 

    
    var apiObject = 
        {"ListingId":4769777,"Title":"Toyota RAV4 Gxl Suv 2013","Category":"0001-0268-0334-","StartPrice":0,"StartDate":"/Date(1470972287093)/","EndDate":"/Date(1471145087093)/",
        "ListingLength":null,"IsFeatured":true,"IsBold":true,"IsHighlighted":true,"AsAt":"/Date(1471061767311)/","CategoryPath":"/Trade-Me-Motors/Cars/Toyota","Region":"Auckland",
        "Suburb":"Auckland City","NoteDate":"/Date(0)/","ReserveState":3,"IsClassified":true,"Subtitle":"dsfdsfdsfdsfds","PriceDisplay":"Asking price: $34,000","BodyStyle":"RV/SUV",
        "Doors":4,"EngineSize":2494,"Make":"Toyota","Model":"RAV4","Odometer":55996,"Year":2013,"Transmission":"Automatic","Fuel":"Petrol","NumberPlate":"HCC865",
        "BestContactTime":"Any time","Cylinders":0,"Owners":2,"Vin":null,"WofExpires":"/Date(0)/","RegistrationExpires":"/Date(0)/","StereoDescription":"",
        "ExteriorColour":"Silver","ImportHistory":"0","IsDealer":false};
    
    //var chartData1 = apiObject.data1;
    //apiObject.data1 going into dataset.
    
    var myChart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: 'Start Price',
                data: [10, 19, 3, 5, 2, 3, 6],
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
                    text: 'Mean Price for '+ apiObject.Make +" " + apiObject.Model + ' from 1st Febuary to 8th Febuary'
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


