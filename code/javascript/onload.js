// the following part will be triggered when the page is loaded
window.onload = function(){

  // request for the queries
  d3.queue()
  .defer(d3.json, "data_structure/json/vertrouwen_nederland.json") 
  .defer(d3.json, "data_structure/json/gebruik_dienstverlening.json")
  .defer(d3.json, "data_structure/json/internet_gebruik.json")
  .defer(d3.json, "data_structure/json/politieke_interesse.json")
  .defer(d3.json, "data_structure/json/politieke_participatie.json")
  .awaitAll(importData);

};
