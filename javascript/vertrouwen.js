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

  // makeLinegraphCanvas()
  makeDendrogramCanvas()

};

function importData(error, response){

  // check if data gets loaded
  if (error) throw error;

  // creating one big array of all my objects
  bigDatty = [];

  for(i = 0; i < 6; i ++){
    bigDatty.push(response[i])
  }

  var vertrouwen = (bigDatty[0]['vertrouwen']);

  for(var i = 0; i < vertrouwen.length; i ++){
    vertrouwen[i].ID = Number(vertrouwen[i].ID); // don't forget to store number value in current value
    vertrouwen[i].Periode = Number(vertrouwen[i].Periode);
    vertrouwen[i].Ambtenaren = Number(vertrouwen[i].Ambtenaren);
    vertrouwen[i].EuropeseUnie = Number(vertrouwen[i].EuropeseUnie);
    vertrouwen[i].Pers = Number(vertrouwen[i].Pers);
    vertrouwen[i].Politie = Number(vertrouwen[i].Politie);
    vertrouwen[i].Rechters = Number(vertrouwen[i].Rechters);
    vertrouwen[i].TweedeKamer = Number(vertrouwen[i].TweedeKamer);
    vertrouwen[i].VertrouwenInAndereMensen = Number(vertrouwen[i].VertrouwenInAndereMensen);
  }

  // console.log('trust',vertrouwen)
  // console.log('yoyo',bigDatty)

  makeLinegraphCanvas(vertrouwen)

};

function makeLinegraphCanvas(vertrouwen){

  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      padding = {top: 60, right: 60, bottom: 60, left: 60},
      outerWidth = 1260,
      outerHeight = 700,
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

  var svg = d3.select("#linegraph").append("svg")
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


  console.log(vertrouwen)

  // its linegraph time

  // determing the dimensions and margins of the linegraph
  var graphMargin = {top: 20, rigth: 20, bottom: 30, left: 50},
      graphWidth = 960 - graphMargin.left - graphMargin.right,
      graphHeight = 500 - graphMargin.top - graphMargin.bottom;

  var graphX = d3.scaleTime().range([0, 100]);
  var graphY = d3.scaleLinear().range([100, 0]);

  var vertrouwenLine = d3.line()
      .x(function (d){ return graphX(d.Periode); })
      .y(function (d){ return graphY()}); //weet niet of dit kan zo, maar gaat natuurlijk om een array van jaren


  var graphSvg = d3.select("#linegraph").append("graphSvg")
      .attr("graphWidth", graphWidth + margin.left + margin.right)
      .attr("graphHeight", graphHeight + graphMargin.top + graphMargin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + graphMargin.left + "," + graphMargin.top + ")");



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
