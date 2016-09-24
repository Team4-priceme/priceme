
$(document).ready(function() {
  $("#searchButton").click(function() {

  	var brand = $("#makeText").val();
  	var model =$("#modelText").val();
  	var year =$("#yearText").val();
  	var dashposition = year.indexOf("-");
  	var yearmin= year.substring(0,dashposition);
  	var yearmax= year.substring(dashposition+1,year.length);
		/*$("#search").on("keyup", function(e) {
			if(e.keyCode === 13) {
				var parameters = { brand,model,yearmin,yearmax};
      }
    });*/

    search(brand, model, yearmin, yearmax);
  });
});


function onLoaded(data) {
  console.log("Loading");
  console.log(data);

  $("#outputOuter").show();
  $("html, body").animate({ scrollTop: $("#outputOuter").offset().top }, 1500);

  var leftWindow = $("#leftWindow");

  leftWindow.empty();

  leftWindow.append("<p>Results for:</p>");
  leftWindow.append("<p>" + data.make + " " + data.model + " " + data.yearMin + "-" + data.yearMax + "</p>");
  leftWindow.append("<div class="result blue"><p id="priceTitle">average price</p><p id="price" class="blue">$" + data.averageAsking + "</p></div>");
  leftWindow.append("<div class="result"><p id="priceTitle">highest price</p><p id="price">$" + data.max + "</p></div>");
  leftWindow.append("<div class="result"><p id="priceTitle">lowest price</p><p id="price">$" + data.min + "</p></div>");

  chartData(data);
}
