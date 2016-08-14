var request = require('request');
var sprintf = require("sprintf-js").sprintf,
    vsprintf = require("sprintf-js").vsprintf;

function getUsedCars(make, model, yearMin, yearMax, callback){

  var options = {
    url: sprintf('https://api.trademe.co.nz/v1/Search/Motors/Used.json?make=%s&model=%s&year_max=%d&year_min=%d', make, model, yearMax, yearMin),
    headers: {
      'Authorization': sprintf('OAuth oauth_consumer_key=%s, oauth_signature_method="PLAINTEXT", oauth_signature=%s&', process.env.TOKEN, process.env.SECRET)
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var cars = JSON.parse(body)['List'];

      var buyCount = 0;
      var buyTotal= 0;
      var total = 0;
      for (var i=0; i < cars.length; i++) {
        if (cars[i].hasOwnProperty('BuyNowPrice')) {
          buyCount += 1;
          buyTotal += cars[i].BuyNowPrice
        }
        cars[i].Price = parseInt(cars[i].PriceDisplay.replace(/\D/g, ""));
        total += cars[i].Price;
      }

      if (total === 0) {
        var jsonStr = JSON.stringify({info:{averageAsking:0, averageBuyNow:0, make:make, model:model, yearMin:yearMin, yearMax:yearMax}, cars:cars});
      }
      else {
        if (buyTotal != 0) {
          var jsonStr = JSON.stringify({info:{averageAsking:total/cars.length, averageBuyNow:buyTotal/buyCount,  make:make, model:model, yearMin:yearMin, yearMax:yearMax}, cars:cars});
        }
        else {
          var jsonStr = JSON.stringify({info:{averageAsking:total/cars.length, averageBuyNow:0,  make:make, model:model, yearMin:yearMin, yearMax:yearMax}, cars:cars});
        }
      }

      callback(jsonStr);
    } else {
      console.log(response.statusCode);
    }
  });
}

exports.getUsedCars = getUsedCars;
