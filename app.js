var express = require('express');
var path = require('path');

var app = express();

app.get('/', function (req, res) {
  //res.send('Hello World!');

  console.log("default entry point");
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get('/retrieveCarInfo', function(req, res){
  console.log("hey");
  var make = "Toyota";
  var model = "RAV4";
  var yearMin = 0;
  var yearMax = 2016;

  cars.cacheCars(make, model, yearMin, yearMax, function(cars) {
    console.log("hey2");
    var jsonStr = JSON.stringify(cars);
    console.log(jsonStr);
    res.send(jsonStr);
  });

});

app.use(express.static(__dirname + '/views'));


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
