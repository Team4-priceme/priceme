
$(document).ready(function(){
    $("#searchButton").click(function(){
        $("html, body").animate({ scrollTop: $('#outputOuter').offset().top }, 1500);
		var brand = $("#makeText").val();
		var model =$("#modelText").val();
		var year =$("#yearText").val();
		var dashposition = year.indexOf("-");
		var yearmin= year.substring(0,dashposition);
		var yearmax= year.substring(dashposition+1,year.length);
		
		
		$(function(){
		$('#search').on('keyup', function(e){
			if(e.keyCode === 13) {
				var parameters = { brand,model,yearmin,yearmax};
				
		
    });
		
	
	
	



});

