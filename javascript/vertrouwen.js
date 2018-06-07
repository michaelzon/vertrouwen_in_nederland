// the following part will be triggered when the page is loaded

window.onload = function(){

  // api request for the data
  var rawTableInfo = "https://opendata.cbs.nl/ODataApi/odata/82378NED/TableInfos";
  var rawData = "https://opendata.cbs.nl/ODataApi/odata/82378NED/TypedDataSet";
  var rawProperties = "https://opendata.cbs.nl/ODataApi/odata/82378NED/DataProperties";
  var rawGroups = "https://opendata.cbs.nl/ODataApi/odata/82378NED/Persoonskenmerken";
  var rawPeriods = "https://opendata.cbs.nl/ODataApi/odata/82378NED/Perioden";

  // request for the queries
  d3.queue()
  .defer(d3.request, rawTableInfo)
  .defer(d3.request, rawData)
  .defer(d3.request, rawProperties)
  .defer(d3.request, rawGroups)
  .defer(d3.request, rawPeriods)
  .awaitAll(doSomething);

  console.log(rawData)

};

function doSomething(error, response){

  // check if data gets loaded
  if (error) throw error;

  var tableInfo = JSON.parse(response[0].responseText);
  var data = JSON.parse(response[1].responseText);
  console.log(data)
};
