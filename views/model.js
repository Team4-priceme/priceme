var make = "Toyota";
var model = "RAV4";
var yearMin = 0;
var yearMax = 2016;

function search(make, model, yearMin, yearMax){
  $.ajax({
    url: "/getUsedData",
    data: {
      make:make, model:model, yearMin:yearMin, yearMax:yearMax
    },
    method: "GET",
    success: function(res) {
      console.log(res);
    }
  });
}
