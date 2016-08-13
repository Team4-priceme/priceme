var express = require('express');
var path = require('path');
var getData = require("./public/javascript/getData.js");

var app = express();

var make = "Toyota";
var model = "RAV4";
var yearMin = 0;
var yearMax = 2016;

app.get('/', function (req, res) {
  console.log("default entry point");
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get('/sendingData', function(req, res){
  /*http://mherman.org/blog/2013/10/20/handling-ajax-calls-with-node-dot-js-and-express-scraping-craigslist/#.V67mmCh97IU
  var val = req.query.sendingData
  console.log(val);*/
});

app.get('/getUsedData', function(req, res){
  getData.getUsedCars(make, model, yearMin, yearMax, function(cars){
    var count = 0;
    var total = 0;
    for (var i=0; i < cars.length; i++) {
      count += 1;
      cars[i].Price = parseInt(cars[i].PriceDisplay.replace(/\D/g, ""));
      total += cars[i].Price;
    }
    if (total === 0) {
      var jsonStr = JSON.stringify({info:{average:0, make:make, model:model, yearMin:yearMin, yearMax:yearMax}, cars:cars});
    }
    else {
      var jsonStr = JSON.stringify({info:{average:total/count, make:make, model:model, yearMin:yearMin, yearMax:yearMax}, cars:cars});
    }
    res.send(jsonStr);
  });
});

app.use(express.static(__dirname + '/views'));


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
