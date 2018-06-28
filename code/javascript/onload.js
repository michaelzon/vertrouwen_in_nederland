/* Name: Michael Zonneveld
** Studentnumber: 11302984
** Date: 28/06/18 */

window.onload = function(){
/* this function will be triggered when the page is loaded
** it sends al the jsons to the importData function where it gets parsed */

  // request for the queries
  d3.queue()
  .defer(d3.json, "data_structure/json/vertrouwen_nederland.json")
  .defer(d3.json, "data_structure/json/gebruik_dienstverlening.json")
  .defer(d3.json, "data_structure/json/internet_gebruik.json")
  .defer(d3.json, "data_structure/json/politieke_interesse.json")
  .defer(d3.json, "data_structure/json/politieke_participatie.json")
  .awaitAll(importData);

};
