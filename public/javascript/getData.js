var request = require('request');
var sprintf = require("sprintf-js").sprintf,
    vsprintf = require("sprintf-js").vsprintf;

function getUsedCars(make, model, yearMin, yearMax, callback){
  var options = {
  url: sprintf('https://api.tmsandbox.co.nz/v1/Search/Motors/Used.json?make=%s&model=%s&year_max=%d&year_min=%d', make, model, yearMax, yearMin),
  headers: {
    'Authorization': sprintf('OAuth oauth_consumer_key=%s, oauth_signature_method="PLAINTEXT", oauth_signature=%s', process.env.TOKEN, process.env.SECRET)
  }
};

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var cars = JSON.parse(body)['List'];
      callback(cars);
    }
  })
}

exports.getUsedCars = getUsedCars;
