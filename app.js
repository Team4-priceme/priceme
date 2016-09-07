var express = require('express');
var path = require('path');
var request = require('request');
var sprintf = require("sprintf-js").sprintf,
    vsprintf = require("sprintf-js").vsprintf;

var mongo = require('mongodb');
var monk = require('monk');

var app = express();

app.get('/', function (req, res) {
  console.log("default entry point");
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get('/trademeUsedCars', function(req, res) {
  var options = {
    url: 'https://api.tmsandbox.co.nz/v1/Search/Motors/Used.json?',
    headers: {
      'Authorization': sprintf('OAuth oauth_consumer_key=%s, oauth_signature_method="PLAINTEXT", oauth_signature=%s&', process.env.TOKEN, process.env.SECRET)
    }
  };
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body));
    } else {
      console.log(response.statusCode);
    }
  });
});

app.get('/getUsedData', function(req, res) {
  var db = monk('localhost:27017/priceme');
  var collection = db.get('usedcars');
  collection.findOne({make: req.query.make, model: req.query.model, year: {$lte:parseInt(req.query.yearMax), $gte:parseInt(req.query.yearMin)}},{},function(e,docs){
    res.json(docs);
  });
});

app.use(express.static(__dirname + '/views'));


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});

function updateUsedCars(){
  var options = {
    url: 'https://api.tmsandbox.co.nz/v1/Search/Motors/Used.json?',
    headers: {
      'Authorization': sprintf('OAuth oauth_consumer_key=%s, oauth_signature_method="PLAINTEXT", oauth_signature=%s&', process.env.TOKEN, process.env.SECRET)
    }
  };

  var data = {};
  var page = 0;
  var totalPages = 1;
  while (page < totalPages) {
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = JSON.parse(body);
      } else {
        console.log(response.statusCode);
      }
    });

    var db = monk('localhost:27017/priceme');
    var collection = db.get('usedcars');

    collection.update({make: 'Toyota', model: 'RAV4', year: 2010, date: 0}, {$inc:{askingTotal:1000, askingNum:1}}, {upsert: true}, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  }
}

module.exports = app;
