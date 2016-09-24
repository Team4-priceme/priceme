var make = "Toyota";
var model = "RAV4";
var yearMin = 0;
var yearMax = 2016;

function search(make, model, yearMin, yearMax) {
  $.ajax({
    dataType: "json",
    url: "/getUsedData",
    data: {
      make:make, model:model, year_min:yearMin, year_max:yearMax
    },
    method: "GET",
    success: function(res) {
      onLoaded(res);
    }
  });
}
