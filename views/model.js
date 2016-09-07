function search(make, model, yearMin, yearMax) {
  $.ajax({
    dataType: 'json',
    url: "/getUsedData",
    data: {
      make:make, model:model, yearMin:yearMin, yearMax:yearMax
    },
    method: "GET",
    success: function(res) {
      onLoaded(res);
    }
  });
}
