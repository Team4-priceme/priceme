var express = require('express');
var path = require('path');
var request = require('request');
var sprintf = require("sprintf-js").sprintf,
    vsprintf = require("sprintf-js").vsprintf;

var schedule = require('node-schedule');

var mongo = require('mongodb');
var monk = require('monk');

var app = express();

app.get('/', function (req, res) {
  console.log("default entry point");
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get('/update', function(req, res) {
  updateMotorsUsed();
  res.send('done');
});

app.get('/getUsedData', function(req, res) {
  var db = monk('localhost:27017/priceme');
  var collection = db.get('usedcars');
  collection.findOne({make: req.query.make.toUpperCase(), model: req.query.model.toUpperCase(), year: {$lte:parseInt(req.query.yearMax), $gte:parseInt(req.query.yearMin)}},{},function(e,docs){
    res.json(docs);
  });
});

app.use(express.static(__dirname + '/views'));

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});

function getTrademeMotorsUsed(page, callback){
  var options = {
    url: sprintf('https://api.tmsandbox.co.nz/v1/Search/Motors/Used.json?rows=1&page=%d', page),
    headers: {
      'Authorization': sprintf('OAuth oauth_consumer_key=%s, oauth_signature_method="PLAINTEXT", oauth_signature=%s&', process.env.TOKEN, process.env.SECRET)
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return callback(JSON.parse(body));
    } else {
      console.log(response.statusCode);
    }
  });
}

function updateDatabaseMotorsUsed(data){
  for (var i = 0; i < data.List.length; i++) {

    var askingPrice = Math.floor(parseInt(data.List[i].PriceDisplay.replace(/\D/g, "")));;

    var db = monk('localhost:27017/priceme');
    var collection = db.get('usedcars');

    if(data.List[i].HasBuyNow){

      collection.update({
        make: data.List[i].Make.toUpperCase(),
        model: data.List[i].Model.toUpperCase(),
        year: data.List[i].Year,
        date: 0},
        {$inc:{askingTotal:askingPrice, askingNum:1, buyNowTotal:data.List[i].BuyNowPrice, buyNowNum:1}}, {upsert: true}, function(err, result){
        if(err != null){
          console.log(err);
        }
      });
    } else{
      collection.update({
        make: data.List[i].Make.toUpperCase(),
        model: data.List[i].Model.toUpperCase(),
        year: data.List[i].Year,
        date: 0},
        {$inc:{askingTotal:askingPrice, askingNum:1}}, {upsert: true}, function(err, result){
        if(err != null){
          console.log(err);
        }
      });
    }
  }
  if(data.PageSize * data.Page < data.TotalCount){
    getTrademeMotorsUsed(data.Page+1, updateDatabaseMotorsUsed)
  }
}

function updateMotorsUsed(){
  console.log('Updating Database');
  getTrademeMotorsUsed(1, updateDatabaseMotorsUsed);
}

module.exports = app;
