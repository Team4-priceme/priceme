
$(document).ready(function() {
  $("#searchButton").click(function() {

  	var brand = $("#makeText").val();
  	var model =$("#modelText").val();
  	var year =$("#yearText").val();
  	var dashposition = year.indexOf("-");
  	var yearmin= year.substring(0,dashposition);
  	var yearmax= year.substring(dashposition+1,year.length);
		/*$('#search').on('keyup', function(e) {
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
  $("html, body").animate({ scrollTop: $('#outputOuter').offset().top }, 1500);

  var leftWindow = $("#leftWindow");

  leftWindow.empty();

  leftWindow.append("<p>Results for:</p>");
  leftWindow.append("<p>" + "Ford Focus Trend 2014" + "</p>");
  leftWindow.append("<div class='result blue'><p>average price</p><p id='price' class='blue'>$" + Math.floor(data.info.averageAsking) + "</p></div>");
  leftWindow.append("<div class='result'><p>highest price</p><p id='price'>$" + Math.floor(data.info.max) + "</p></div>");
  leftWindow.append("<div class='result'><p>lowest price</p><p id='price'>$" + Math.floor(data.info.min) + "</p></div>");

  chartData(data);
}
