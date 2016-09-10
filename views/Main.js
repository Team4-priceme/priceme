
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

  var askingTotal = 0;
  var askingNum = 0;
  var buyTotal = 0;
  var buyNum = 0;
  for (var i = 0; i < data.length; i++) {
    askingTotal += data[i].askingTotal;
    askingNum += data[i].askingNum;
    buyTotal += data[i].buyNowTotal;
    buyNum += data[i].buyNowNum;
  }
  averageData = {averageAsking : Math.floor(askingTotal/askingNum),
                averageBuyNow : Math.floor(buyTotal/buyNum)};

  $("#outputOuter").show();
  $("html, body").animate({ scrollTop: $('#outputOuter').offset().top }, 1500);

  var leftWindow = $("#leftWindow");

  leftWindow.empty();

  leftWindow.append("<p>Results for:</p>");
  leftWindow.append("<p>" + make + ' ' + model + ' ' + yearMin + '-' + yearMax + "</p>");
  leftWindow.append("<div class='result blue'><p id='priceTitle'>average price</p><p id='price' class='blue'>$" + averageData.averageAsking + "</p></div>");
  leftWindow.append("<div class='result'><p id='priceTitle'>highest price</p><p id='price'>$" + 0 + "</p></div>");
  leftWindow.append("<div class='result'><p id='priceTitle'>lowest price</p><p id='price'>$" + 0 + "</p></div>");

  chartData(averageData, make, model);
}
