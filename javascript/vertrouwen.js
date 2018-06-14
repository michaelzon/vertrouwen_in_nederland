// the following part will be triggered when the page is loaded
window.onload = function(){

  // request for the queries
  d3.queue()
  .defer(d3.json, "data_structure/json/vertrouwen_nederland.json")      //[0]
  .defer(d3.json, "data_structure/json/gebruik_dienstverlening.json")   //[1]
  .defer(d3.json, "data_structure/json/internet_faciliteiten.json")     //[2]
  .defer(d3.json, "data_structure/json/internet_gebruik.json")          //[3]
  .defer(d3.json, "data_structure/json/politieke_interesse.json")       //[4]
  .defer(d3.json, "data_structure/json/politieke_participatie.json")    //[5]
  .awaitAll(importData);

  makeDendrogramCanvas()

  // hier komt eventhandler

};

function updateLines(data){
  console.log('verververver', data)

  var butTotaal = document.getElementById("selectTotaal");
  var butNederlands = document.getElementById("selectNederlands");
  var butWesters = document.getElementById("selectWesters");
  var butNietWesters = document.getElementById("selectNietWesters");

  // eventhandler > roept linegraph functie aan met de data die je wil hebben

  butTotaal.addEventListener("click", {
    handleEvent: function (event){
      makeLinegraph(data.totaal)
    }
  });

  butNederlands.addEventListener("click", {
    handleEvent: function (event){
      makeLinegraph(data.nederlands)
    }
  });

  butWesters.addEventListener("click", {
    handleEvent: function (event) {
      makeLinegraph(data.westers)
    }
  });

  butNietWesters.addEventListener("click", {
    handleEvent: function (event) {
      makeLinegraph(data.nietWesters)
    }
  });

}


function makeLinegraph(data){

  // remove current lines if others are added by clicking on dropdown
  if (d3.select("#linegraph").select("svg")){
    d3.select("#linegraph").select("svg").remove();
  }

  console.log(data)

  // console.log('vertrouwen', vertrouwen)
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      padding = {top: 60, right: 60, bottom: 60, left: 60},
      outerWidth = 1260,
      outerHeight = 700,
      innerWidth = outerWidth - margin.left - margin.right,
      innerHeight = outerHeight - margin.top - margin.bottom,
      width = innerWidth - padding.left - padding.right,
      height = innerHeight - padding.top - padding.bottom;

  // create an array of years convert its type to number
  var years = (Object.keys(data))
  for(var i = 0; i < years.length; i ++){
    years[i] = Number(years[i])
  }

  // scaling for the width of the graph
  var xScale = d3.scaleLinear()
      .domain(d3.extent(years))   //returns 2012 and 2017 as min and max
      .range([0, width]);

  // var zColor = d3.scaleOrdinal()
  //     .domain(independents)
  //     .range(colorbrewer.BrBG[8]);

  // and for the height
  var yScale = d3.scaleLinear()
      .domain([20, 80])
      .range([height, 0]);

  // function for creating x-axis later on
  var xAxis = d3.axisBottom(xScale)
      .tickFormat((d,i) => years[i])
      .ticks(6);

  // and also for the y-axis
  var yAxis = d3.axisLeft(yScale)
      .tickFormat(function(d){return d+ "%"})
      .tickFormat(d => d+ "%")
      .ticks(7);

  // draw my canvas for the linegraph
  var svg = d3.select("#linegraph")
      .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
      .attr("id", "linechart")

  var charts = svg.append("g")
      .attr("transform", "translate(10, 10)");

  var mensenTot = [];
  for(var i = 0; i < years.length; i ++){
    mensenTot.push(data[years[i]]["VertrouwenInAndereMensen"])
  }

  var ambtTot = [];
  for(var i = 0; i < years.length; i ++){
    ambtTot.push(data[years[i]]["Ambtenaren"])
  }

  var euTot = [];
  for(var i = 0; i < years.length; i ++){
    euTot.push(data[years[i]]["EuropeseUnie"])
  }

  var persTot = [];
  for(var i = 0; i < years.length; i ++){
    persTot.push(data[years[i]]["Pers"])
  }

  var politieTot = [];
  for(var i = 0; i < years.length; i ++){
    politieTot.push(data[years[i]]["Politie"])
  }

  var rechtersTot = [];
  for(var i = 0; i < years.length; i ++){
    rechtersTot.push(data[years[i]]["Rechters"])
  }

  var tweedeKamerTot = [];
  for(var i = 0; i < years.length; i ++){
    tweedeKamerTot.push(data[years[i]]["TweedeKamer"])
  }

  var lineMen = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(mensenTot[i])) // pass a list of all percentages from mensenvertrouwen of totaalbev
      .curve(d3.curveLinear);

  charts.append("path")
    .data([years])         //array with years
    .attr("class", "lineMen")
    .attr("id", "lines")
    .attr("d", lineMen);

  var lineAmbt = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(ambtTot[i])) // pass a list of all percentages from mensenvertrouwen of totaalbev
      .curve(d3.curveLinear);

  charts.append("path")
    .data([years])         //array with years
    .attr("class", "lineAmbt")
    .attr("id", "lines")
    .attr("d", lineAmbt);

  var lineEu = d3.line()
      .x(d => xScale(d))
      .x(function(d) {return xScale(d)})
      .y((d,i) => yScale(euTot[i])) // pass a list of all percentages from mensenvertrouwen of totaalbev
      .curve(d3.curveLinear);

  charts.append("path")
    .data([years])         //array with years
    .attr("class", "lineEu")
    .attr("id", "lines")
    .attr("d", lineEu);

  var linePers = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(persTot[i])) // pass a list of all percentages from mensenvertrouwen of totaalbev
      .curve(d3.curveLinear);

  charts.append("path")
    .data([years])         //array with years
    .attr("class", "linePers")
    .attr("id", "lines")
    .attr("d", linePers);

  var linePolitie = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(politieTot[i])) // pass a list of all percentages from mensenvertrouwen of totaalbev
      .curve(d3.curveLinear);

  charts.append("path")
    .data([years])         //array with years
    .attr("class", "linePolitie")
    .attr("id", "lines")
    .attr("d", linePolitie);

  var lineRechters = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(rechtersTot[i])) // pass a list of all percentages from mensenvertrouwen of totaalbev
      .curve(d3.curveLinear);

  charts.append("path")
    .data([years])         //array with years
    .attr("class", "lineRechters")
    .attr("id", "lines")
    .attr("d", lineRechters);

  var lineTweedeKamer = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(tweedeKamerTot[i])) // pass a list of all percentages from mensenvertrouwen of totaalbev
      .curve(d3.curveLinear);

  charts.append("path")
    .data([years])
    .attr("class", "lineTweedeKamer")
    .attr("id", "lines")
    .attr("d", lineTweedeKamer);

  charts.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate (0," + height + ")")
      .call(xAxis);

  charts.append("g")
      .attr("class", "y-axis")
      .call(yAxis)

};

function makeDendrogramCanvas(){
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      padding = {top: 60, right: 60, bottom: 60, left: 60},
      outerWidth = 1260,
      outerHeight = 1000,
      innerWidth = outerWidth - margin.left - margin.right,
      innerHeight = outerHeight - margin.top - margin.bottom,
      width = innerWidth - padding.left - padding.right,
      height = innerHeight - padding.top - padding.bottom;

  var x = d3.scaleIdentity()
      .domain([0, width]);

  var y = d3.scaleIdentity()
      .domain([0, height]);

  var xAxis = d3.axisBottom()
      .scale(x)

  var yAxis = d3.axisRight()
      .scale(y)

  var svg = d3.select("#dendrogram").append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var defs = svg.append("defs");

  defs.append("marker")
      .attr("id", "triangle-start")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 10)
      .attr("refY", 5)
      .attr("markerWidth", -6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
    .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z");

  defs.append("marker")
      .attr("id", "triangle-end")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 10)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
    .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z");

  svg.append("rect")
      .attr("class", "outer")
      .attr("width", innerWidth)
      .attr("height", innerHeight);

  var g = svg.append("g")
      .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

  g.append("rect")
      .attr("class", "inner")
      .attr("width", width)
      .attr("height", height);

  g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  g.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ",0)")
      .call(yAxis);

  svg.append("line")
      .attr("class", "arrow")
      .attr("x2", padding.left)
      .attr("y2", padding.top)
      .attr("marker-end", "url(#triangle-end)");

  svg.append("line")
      .attr("class", "arrow")
      .attr("x1", innerWidth / 2)
      .attr("x2", innerWidth / 2)
      .attr("y2", padding.top)
      .attr("marker-end", "url(#triangle-end)");

  svg.append("line")
      .attr("class", "arrow")
      .attr("x1", innerWidth / 2)
      .attr("x2", innerWidth / 2)
      .attr("y1", innerHeight - padding.bottom)
      .attr("y2", innerHeight)
      .attr("marker-start", "url(#triangle-start)");

  svg.append("line")
      .attr("class", "arrow")
      .attr("x2", padding.left)
      .attr("y1", innerHeight / 2)
      .attr("y2", innerHeight / 2)
      .attr("marker-end", "url(#triangle-end)");

  svg.append("line")
      .attr("class", "arrow")
      .attr("x1", innerWidth)
      .attr("x2", innerWidth - padding.right)
      .attr("y1", innerHeight / 2)
      .attr("y2", innerHeight / 2)
      .attr("marker-end", "url(#triangle-end)");

  svg.append("text")
      .text("origin")
      .attr("y", -8);

    svg.append("circle")
        .attr("class", "origin")
        .attr("r", 4.5);

  g.append("text")
      .text("translate(margin.left, margin.top)")
      .attr("y", -8);
};
