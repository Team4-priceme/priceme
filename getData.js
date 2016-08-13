var request = require('request');
var sprintf = require("sprintf-js").sprintf,
    vsprintf = require("sprintf-js").vsprintf;

function getUsedCars(make, model, yearMin, yearMax, callback){
  var requestURL = sprintf('https://trademe-api-proxy.herokuapp.com/v1/Search/Motors/Used.json?make=%s&model=%s&year_max=%d&year_min=%d', make, model, yearMax, yearMin);
  request(requestURL, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var cars = JSON.parse(body)['List'];
      callback(cars);
    }
  })
}

exports.getUsedCars = getUsedCars;
