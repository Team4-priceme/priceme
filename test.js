var request = require('request');
request('https://trademe-api-proxy.herokuapp.com/v1/Search/Motors/Used.json?make=toyota&model=rav4&year_max=2013&year_min=2016',
 function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var cars = JSON.parse(body)['List'];
    for (i= 0; i < cars.length; i++) {
      car = cars[i]
      console.log(car['ListingId']);
      console.log(car['StartPrice']);
      console.log(car['PriceDisplay'])
      if (car.hasOwnProperty('BuyNow')) {
        console.log(car['BuyNow']);
      }
    }
  }
})

function 
