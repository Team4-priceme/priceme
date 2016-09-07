var express = require('express');
var path = require('path');
var getData = require("./public/javascript/getData.js");

var mongo = require('mongodb');
var monk = require('monk');


var app = express();

app.get('/', function (req, res) {
  console.log("default entry point");
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

/*app.post('/updateuseddata', function(req, res) {
  var db = monk('localhost:27017/priceme');
  var collection = db.get('usedcars');
  collection.findOne({make: req.query.make, model: req.query.model},{},function(e,docs){
    res.json(docs);
  });
});*/

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

module.exports = app;
