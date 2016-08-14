var make = "Toyota";
var model = "RAV4";
var yearMin = 0;
var yearMax = 2016;

function search(make, model, yearMin, yearMax) {
  $.ajax({
    dataType: 'json',
    url: "/searching",
    data: {
      make:make, model:model, yearMin:yearMin, yearMax:yearMax
    },
    method: "GET",
    success: function(res) {
      onSuccess(res);
    }
  });
}

function onSuccess(res) {
  console.log(res);
}
