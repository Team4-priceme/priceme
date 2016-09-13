function chartData(averageAsking, averageBuyNow, make, model, date){

Chart.defaults.global.title.fontSize = 16;
Chart.defaults.global.title.fontFamily = 'Open Sans';
Chart.defaults.global.title.fontStyle = 'normal';
Chart.defaults.global.title.padding = 25;

var days = getPastWeek();

var ctx = document.getElementById("startPrice");

    var startPrice = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: 'Start Price',
                yLabel: 'Per thousands',
                data: averageAsking,
                backgroundColor: [
                    'rgba(86, 172, 178, 0.2)',
                    'rgba(30, 30, 30, 0.2)',
                    'rgba(86, 172, 178, 0.2)',
                    'rgba(30, 30, 30, 0.2)',
                    'rgba(86, 172, 178, 0.2)',
                    'rgba(30, 30, 30, 0.2)',
                    'rgba(86, 172, 178, 0.2)'
                ],
                borderColor: [
                    'rgba(86, 172, 178, 1)',
                    'rgba(30, 30, 30, 1)',
                    'rgba(86, 172, 178, 1)',
                    'rgba(30, 30, 30, 1)',
                    'rgba(86, 172, 178, 1)',
                    'rgba(30, 30, 30, 1)',
                    'rgba(86, 172, 178, 1)'
                ],
                borderWidth: 1
            }]


        },
        options: {
            title: {
                    display: true,
                    text: 'Mean Asking Price for '+ model + " " + make + ', week ending Sunday 14th August'
                    },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                            },
                    scaleLabel: {
                         display: true,
                        labelString: 'Price ($NZD)'
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
            labels: days,
            datasets: [{
                label: 'Start Price',
                data: averageBuyNow,
                backgroundColor: [
                    'rgba(30, 30, 30, 0.2)',
                    'rgba(86, 172, 178, 0.2)',
                    'rgba(30, 30, 30, 0.2)',
                    'rgba(86, 172, 178, 0.2)',
                    'rgba(30, 30, 30, 0.2)',
                    'rgba(86, 172, 178, 0.2)',
                    'rgba(30, 30, 30, 0.2)'
                ],
                borderColor: [
                    'rgba(30, 30, 30, 1)',
                    'rgba(86, 172, 178, 1)',
                    'rgba(30, 30, 30, 1)',
                    'rgba(86, 172, 178, 1)',
                    'rgba(30, 30, 30, 1)',
                    'rgba(86, 172, 178, 1)',
                    'rgba(30, 30, 30, 1)',

                ],
                borderWidth: 1
            }]


        },
        options: {
            title: {
                    display: true,
                    text: 'Mean Buy Now Price for a ' + model + " " + make + ', week ending Sunday 14th August'
                    },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                            },
                    scaleLabel: {
                         display: true,
                        labelString: 'Price ($NZD)'
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






    //Javascript object and assign variables. var_data1=

    /*
    var apiObject =
        {"ListingId":4769777,"Title":"Toyota RAV4 Gxl Suv 2013","Category":"0001-0268-0334-","StartPrice":0,"StartDate":"/Date(1470972287093)/","EndDate":"/Date(1471145087093)/",
        "ListingLength":null,"IsFeatured":true,"IsBold":true,"IsHighlighted":true,"AsAt":"/Date(1471061767311)/","CategoryPath":"/Trade-Me-Motors/Cars/Toyota","Region":"Auckland",
        "Suburb":"Auckland City","NoteDate":"/Date(0)/","ReserveState":3,"IsClassified":true,"Subtitle":"dsfdsfdsfdsfds","PriceDisplay":"Asking price: $34,000","BodyStyle":"RV/SUV",
        "Doors":4,"EngineSize":2494,"Make":"Toyota","Model":"RAV4","Odometer":55996,"Year":2013,"Transmission":"Automatic","Fuel":"Petrol","NumberPlate":"HCC865",
        "BestContactTime":"Any time","Cylinders":0,"Owners":2,"Vin":null,"WofExpires":"/Date(0)/","RegistrationExpires":"/Date(0)/","StereoDescription":"",
        "ExteriorColour":"Silver","ImportHistory":"0","IsDealer":false};
    */
    //var chartData1 = apiObject.data1;
    //apiObject.data1 going into dataset.

    var ctx = document.getElementById("trendGraph");
    var myChart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: 'Start Price',
                data: getRandomNumbers(10000),
                backgroundColor: [
                    'rgba(86, 172, 178, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(86, 172, 178, 0.2)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 159, 64, 1)'

                ],
                borderWidth: 1
            }]


        },
        options: {
            title: {
                    display: true,
                    text: 'Mean Price for a '+ make +" " + model + ', from 1st January to 31st July'
                    },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                            },
                    scaleLabel: {
                         display: true,
                        labelString: 'Price ($NZD)'
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



}

function getPastWeek(){
  _day = new Date().getDay();
  days = [];
  for (var i = 0; i < 7; i++) {
    switch(_day){
      case 0:
          day = "Sunday";
          break;
      case 1:
          day = "Monday";
          break;
      case 2:
          day = "Tuesday";
          break;
      case 3:
          day = "Wednesday";
          break;
      case 4:
          day = "Thursday";
          break;
      case 5:
          day = "Friday";
          break;
      case 6:
          day = "Saturday";
      }
      days.push(day);
      _day -= 1;
      if(_day < 0){_day = 6;}
  }
  return days;
}

function getRandomNumbers(realNum) {
  var out = [];

  for(var i = 0; i < 6; i++) {
    var rand = 0.6 * Math.random() + 0.7;
    out.push(Math.floor(rand * realNum));
  }
  out.push(realNum)

  return out;
}
