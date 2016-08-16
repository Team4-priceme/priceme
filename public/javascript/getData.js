var request = require('request');
var sprintf = require("sprintf-js").sprintf,
    vsprintf = require("sprintf-js").vsprintf;

function getPast24Hours(){
  var date = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
  return date;
}

function getPastWeek(){
  var today = new Date().getDate();
  var pastWeek = [];
  for(var i = 1; i < 7; i++){
    pastWeek.push(new Date(new Date().setDate(today-i)));
    pastWeek[i-1].setHours(0, 0, 0, 0);
  }
  return pastWeek;
}

function getUsedCars(make, model, yearMin, yearMax, callback){

  var past24Hours = getPast24Hours();
  var pastWeek = getPastWeek();

  var options = {
    url: sprintf('https://api.trademe.co.nz/v1/Search/Motors/Used.json?make=%s&model=%s&year_max=%d&year_min=%d&date_from=%s&rows=500&sort_order=ExpiryAsc', make, model, yearMax, yearMin, past24Hours.toUTCString()),
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
      var min = Math.floor(parseInt(cars[0].PriceDisplay.replace(/\D/g, "")));
      var max = min;

      for (var i=0; i < cars.length; i++) {
        if (cars[i].hasOwnProperty('BuyNowPrice')) {
          buyCount += 1;
          buyTotal += cars[i].BuyNowPrice;
        }
        var price = parseInt(cars[i].PriceDisplay.replace(/\D/g, ""));
        total += price;
        if(price < min){
          min = Math.floor(price);
        }
        else if(price > max){
          max = Math.floor(price);
        }
      }

      if (total === 0) {
        var jsonStr = JSON.stringify({averageAsking:0, averageBuyNow:0, max:0, min:0, make:make, model:model, yearMin:yearMin, yearMax:yearMax});
      }
      else {
        if (buyTotal != 0) {
          var jsonStr = JSON.stringify({averageAsking:Math.floor(total/cars.length), averageBuyNow:Math.floor(buyTotal/buyCount), max:max, min:min, make:make, model:model, yearMin:yearMin, yearMax:yearMax});
        }
        else {
          var jsonStr = JSON.stringify({averageAsking:Math.floor(total/cars.length), averageBuyNow:0, max:max, min:min, make:make, model:model, yearMin:yearMin, yearMax:yearMax});
        }
      }

      callback(jsonStr);
    } else {
      console.log(response.statusCode);
    }
  });
}

exports.getUsedCars = getUsedCars;
