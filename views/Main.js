$(document).ready(function() {
  $("#searchButton").click(function() {

  	var make = $("#makeText").val();
  	var model =$("#modelText").val();
  	var year =$("#yearText").val();
  	var dashposition = year.indexOf("-");
  	var yearMin= year.substring(0,dashposition);
  	var yearMax= year.substring(dashposition+1,year.length);
		/*$('#search').on('keyup', function(e) {
			if(e.keyCode === 13) {
				var parameters = { brand,model,yearmin,yearmax};
      }
    });*/

    search(make, model, yearMin, yearMax);
  });
});


function onLoaded(data, make, model, yearMin, yearMax) {
  var date = new Date().getDate();
  console.log(date);
  var averageAsking = [];
  var averageBuyNow = [];

  var totalAskingTotal = 0;
  var totalAskingNum = 0;

  for (var d = 7; d > 0; d--) {
    var askingTotal = 0;
    var askingNum = 0;
    var buyTotal = 0;
    var buyNum = 0;
    var date1 = new Date();
    date1.setDate(date - d);
    date1.setHours(0, 0, 0, 0);
    console.log(data[0].date);
    console.log('1', date1);
    var date2 = new Date();
    date2.setDate(date - (d-1));
    date2.setHours(0, 0, 0, 0);
    console.log('2', date2);
    for (var i = 0; i < data.length; i++) {
      var listingDate = new Date(data[i].date);
      if(listingDate > date1 && listingDate <= date2){
        askingTotal += data[i].askingTotal;
        askingNum += data[i].askingNum;
        buyTotal += data[i].buyNowTotal;
        buyNum += data[i].buyNowNum;
      }
    }
    if(askingNum != 0){
      averageAsking.push(Math.floor(askingTotal/askingNum));
    } else{
      averageAsking.push(0);
    }
    if(askingNum != 0){
      averageBuyNow.push(Math.floor(buyTotal/buyNum));
    } else{
      averageBuyNow.push(0);
    }
    totalAskingTotal += askingTotal;
    totalAskingNum += askingNum;
  }

  if(totalAskingTotal != 0){
    var totalAverage = Math.floor(totalAskingTotal/totalAskingNum);
  } else{
    var totalAverage = 0;
  }

  $("#outputOuter").show();
  $("html, body").animate({ scrollTop: $('#outputOuter').offset().top }, 1500);

  var leftWindow = $("#leftWindow");

  leftWindow.empty();

  leftWindow.append("<p>Results for:</p>");
  leftWindow.append("<p>" + make + ' ' + model + ' ' + yearMin + '-' + yearMax + "</p>");
  leftWindow.append("<div class='result blue'><p id='priceTitle'>average price</p><p id='price' class='blue'>$" + totalAverage + "</p></div>");
  leftWindow.append("<div class='result'><p id='priceTitle'>highest price</p><p id='price'>$" + 0 + "</p></div>");
  leftWindow.append("<div class='result'><p id='priceTitle'>lowest price</p><p id='price'>$" + 0 + "</p></div>");
  console.log(averageAsking);
  chartData(averageAsking, averageBuyNow, make, model);
}
