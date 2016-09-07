
$(document).ready(function() {
  $("#searchButton").click(function() {

  	var brand = $("#makeText").val();
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

    search(brand, model, yearMin, yearMax);
  });
});


function onLoaded(data) {

  $("#outputOuter").show();
  $("html, body").animate({ scrollTop: $('#outputOuter').offset().top }, 1500);

  var leftWindow = $("#leftWindow");

  leftWindow.empty();

  leftWindow.append("<p>Results for:</p>");
  leftWindow.append("<p>" + data.make + ' ' + data.model + ' ' + data.year + '-' + data.year + "</p>");
  leftWindow.append("<div class='result blue'><p id='priceTitle'>average price</p><p id='price' class='blue'>$" + Math.floor(data.askingTotal/data.askingNum) + "</p></div>");
  leftWindow.append("<div class='result'><p id='priceTitle'>highest price</p><p id='price'>$" + data.askingMax + "</p></div>");
  leftWindow.append("<div class='result'><p id='priceTitle'>lowest price</p><p id='price'>$" + data.askingMin + "</p></div>");

  chartData(data);
}
