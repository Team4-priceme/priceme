var express = require('express');
var path = require('path');

var app = express();

app.get('/', function (req, res) {
  //res.send('Hello World!');

  console.log("default entry point");
  res.sendFile(path.join(__dirname + "/views/index.html"));
});



app.use(express.static(__dirname + '/views'));


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
