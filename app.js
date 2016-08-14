var express = require('express');
var path = require('path');
var getData = require("./public/javascript/getData.js");

var app = express();

app.get('/', function (req, res) {
  console.log("default entry point");
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get('/getUsedData', function(req, res){

  var make = req.query.make;
  var model = req.query.model;
  var yearMin = req.query.year_min;
  var yearMax = req.query.year_max;

  console.log('Requesting:', make, model, yearMin, yearMax);

  getData.getUsedCars(make, model, yearMin, yearMax, function(jsonStr) {
    res.send(jsonStr);
  });
});

app.use(express.static(__dirname + '/views'));


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
