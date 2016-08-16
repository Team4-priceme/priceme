var request = require('request');
var sprintf = require("sprintf-js").sprintf,
    vsprintf = require("sprintf-js").vsprintf;
var async = require('async');

function getLast24Hours(){
  var date = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
  return date;
}

function getLastWeek(){
  var today = new Date().getDate();
  var lastWeek = [];
  for(var i = 1; i < 7; i++){
    lastWeek.push(new Date(new Date().setDate(today-i)));
    lastWeek[i-1].setHours(0, 0, 0, 0);
  }
  return lastWeek;
}

/*function requestUsedData(make, model, yearMin, yearMax, date, totals, callback){
  var options = {
    url: sprintf('https://api.trademe.co.nz/v1/Search/Motors/Used.json?make=%s&model=%s&year_max=%d&year_min=%d&date_from=%s&rows=500&sort_order=ExpiryAsc', make, model, yearMax, yearMin, date.toUTCString()),
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

      if (cars.length != 0){
        var min = Math.floor(parseInt(cars[0].PriceDisplay.replace(/\D/g, "")));
        var max = min;
        totals.min, totals.max = Math.floor(parseInt(cars[0].PriceDisplay.replace(/\D/g, "")));
      }

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

      totals.askingTotal += total;
      totals.askingCount += cars.length;
      totals.buyTotal += buyTotal;
      totals.buyCount += buyCount;

      if(cars.length === 0){
        var data = {averageAsking:0, averageBuyNow:0, max:0, min:0, date:date};
      } else if (buyTotal === 0) {
        if(min < totals.min){
          totals.min = min;
        }
        if(max > totals.max){
          totals.max = max;
        }
        var data = {averageAsking:Math.floor(total/cars.length), averageBuyNow:0, max:max, min:min, date:date};
      }
      else{
        var data = {averageAsking:Math.floor(total/cars.length), averageBuyNow:Math.floor(buyTotal/buyCount), max:max, min:min, date:date};
      }
      callback(data);
    } else {
      console.log(response.statusCode);
    }
  });
}*/

function getUsedCars(make, model, yearMin, yearMax, callback){

  var last24Hours = getLast24Hours();

  var lastWeek = getLastWeek();

  var options = [];
  options.push({
    url: sprintf('https://api.trademe.co.nz/v1/Search/Motors/Used.json?make=%s&model=%s&year_max=%d&year_min=%d&date_from=%s&rows=500&sort_order=ExpiryAsc', make, model, yearMax, yearMin, last24Hours.toUTCString()),
    headers: {
      'Authorization': sprintf('OAuth oauth_consumer_key=%s, oauth_signature_method="PLAINTEXT", oauth_signature=%s&', process.env.TOKEN, process.env.SECRET)
    }
  });

  for (var i = 0; i < lastWeek.length; i++) {
    options.push({
      url: sprintf('https://api.trademe.co.nz/v1/Search/Motors/Used.json?make=%s&model=%s&year_max=%d&year_min=%d&date_from=%s&rows=500&sort_order=ExpiryAsc', make, model, yearMax, yearMin, lastWeek[i].toUTCString()),
      headers: {
        'Authorization': sprintf('OAuth oauth_consumer_key=%s, oauth_signature_method="PLAINTEXT", oauth_signature=%s&', process.env.TOKEN, process.env.SECRET)
      }
    });
  }

  var totals = {askingTotal:0, askingCount:0, buyTotal:0, buyCount:0, min:-1, max:-1};
  var dayInfo = [];

  async.map(options, request, function(err, results) {
    if (err) throw(err);
    var i = 0;
    async.map(results, function(day){

      if (i === 0) {
        var date = last24Hours;
      } else{
        var date = lastWeek[i-1];
      }

      var cars = JSON.parse(day.body).List;

      var buyCount = 0;
      var buyTotal= 0;
      var total = 0;

      if (cars.length != 0){
        var min = Math.floor(parseInt(cars[0].PriceDisplay.replace(/\D/g, "")));
        var max = min;
        totals.min = Math.floor(parseInt(cars[0].PriceDisplay.replace(/\D/g, "")));
        totals.max = totals.min;
      }

      for (var j=0; j < cars.length; j++) {
        if (cars[i].hasOwnProperty('BuyNowPrice')) {
          buyCount += 1;
          buyTotal += cars[i].BuyNowPrice;
        }
        var price = parseInt(cars[i].PriceDisplay.replace(/\D/g, ""));
        total += price;
        if(price < min){
          min = Math.floor(price);
        } else if(price > max){
          max = Math.floor(price);
        }
      }

      totals.askingTotal += total;
      totals.askingCount += cars.length;
      totals.buyTotal += buyTotal;
      totals.buyCount += buyCount;

      if(cars.length === 0){
        dayInfo.push({averageAsking:0, averageBuyNow:0, max:0, min:0, date:date});
      } else if (buyTotal === 0) {
        if(min < totals.min){
          totals.min = min;
        }
        if(max > totals.max){
          totals.max = max;
        }
        dayInfo.push({averageAsking:Math.floor(total/cars.length), averageBuyNow:0, max:max, min:min, date:date});
      } else{
        if(min < totals.min){
          totals.min = min;
        }
        if(max > totals.max){
          totals.max = max;
        }
        dayInfo.push({averageAsking:Math.floor(total/cars.length), averageBuyNow:Math.floor(buyTotal/buyCount), max:max, min:min, date:date});
      }
      i++;
    });

    if (totals.askingTotal === 0){
      var jsonStr = JSON.stringify({averageAsking:0, averageBuyNow:0, max:0, min:0, make:make, model:model, yearMin:yearMin, yearMax:yearMax, last24Hours:last24HoursData, lastWeek:lastWeekData});
    } else if (totals.buyTotal === 0) {
        var jsonStr = JSON.stringify({averageAsking:Math.floor(totals.askingTotal/totals.askingCount), averageBuyNow:0, max:totals.max, min:totals.min, make:make, model:model, yearMin:yearMin, yearMax:yearMax, last24Hours:last24HoursData, lastWeek:lastWeekData});
    } else{
      var jsonStr = JSON.stringify({averageAsking:Math.floor(totals.askingTotal/totals.askingCount), averageBuyNow:Math.floor(totals.buyTotal/totals.buyCount), max:totals.max, min:totals.min, make:make, model:model, yearMin:yearMin, yearMax:yearMax, dayInfo:dayInfo});
    }
    callback(jsonStr);
  })
};

  /*requestUsedData(make, model, yearMin, yearMax, last24Hours, totals, function(data){
    last24HoursData = data;
    console.log('done', 24);
    completedRequests++;
  })

  for (var i = 0; i < lastWeek.length; i++) {
    requestUsedData(make, model, yearMin, yearMax, lastWeek[i], totals, function(data){
      lastWeekData.push(data);
      console.log('done', i);
      completedRequests++;
    })
  }
  if(completedRequests === 7){
  if (totals.askingTotal === 0){
    var jsonStr = JSON.stringify({averageAsking:0, averageBuyNow:0, max:0, min:0, make:make, model:model, yearMin:yearMin, yearMax:yearMax, last24Hours:last24HoursData, lastWeek:lastWeekData});
  } else if (totals.buyTotal === 0) {
      var jsonStr = JSON.stringify({averageAsking:Math.floor(totals.askingTotal/totals.askingCount), averageBuyNow:0, max:totals.max, min:totals.min, make:make, model:model, yearMin:yearMin, yearMax:yearMax, last24Hours:last24HoursData, lastWeek:lastWeekData});
  } else{
    var jsonStr = JSON.stringify({averageAsking:Math.floor(totals.askingTotal/totals.askingCount), averageBuyNow:Math.floor(totals.buyTotal/totals.buyCount), max:totals.max, min:totals.min, make:make, model:model, yearMin:yearMin, yearMax:yearMax, last24Hours:last24HoursData, lastWeek:lastWeekData});
  }
  console.log('jsonStr:', jsonStr);
  callback(jsonStr);
}*/

exports.getUsedCars = getUsedCars;
