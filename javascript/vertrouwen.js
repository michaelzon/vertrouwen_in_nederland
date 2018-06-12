// the following part will be triggered when the page is loaded
var vertrouwen = [];
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

  // parse the date / time
  // var parseTime = d3.timeParse("%Y");

  // store 2012 and 2017 in variables
  var minYear = d3.min(vertrouwen, d => d.Periode)
  var maxYear = d3.max(vertrouwen, d => d.Periode)

  // var minPer = d3.min(vertrouwen, d => d.VertrouwenInAndereMensen)
  var maxPer = d3.max(vertrouwen, d => d.VertrouwenInAndereMensen)

  // var minPer = d3.min(vertrouwen, d => console.log('jaja', d.VertrouwenInAndereMensen))

  // var minPer = d3.min(vertrouwen, function (d,i){ console.log('jjj', d.VertrouwenInAndereMensen, i)})
  var minPer = d3.min(vertrouwen, (d,i) => console.log('jjj', d.VertrouwenInAndereMensen, i))
  // var minPer = d3.min(vertrouwen, (d,i) => console.log('jjj', d[i]VertrouwenInAndereMensen))


  var minPer = d3.min(vertrouwen, (d,i) => console.log('jjj', d.VertrouwenInAndereMensen, i))


  console.log("minper", minPer)
  // console.log(maxPer)

  console.log(vertrouwen)


  // scaling for the width of the graph
  var xScale = d3.scaleLinear()
      .domain([minYear, maxYear])
      .range([0, width]);

  // and for the height
  var yScale = d3.scaleLinear()
      .domain([minPer, maxPer])
      .range([height, 0]);

  // function for creating x-axis later on
  var xAxis = d3.axisBottom(xScale)
      // .tickFormat(d => d.Periode)
      // .tickFormat(function (d){ console.log(d); return d.Periode})
      // .tickFormat(d3.timeFormat("2000", "2001"))
      .ticks(6)

  // and also for the y-axis
  var yAxis = d3.axisLeft(yScale)
      .ticks(7)

  // draw my canvas for the linegraph
  var svg = d3.select("#linegraph")
      .append("svg")
      .attr("width", width)
      .attr("height", height)

  var charts = svg.append("g")
      // .attr("transform", "translate(10, 10)");

  // // put a x-axis on it
  // svg.append("g")
  //     .attr("class", "xaxis")
  //     .call(xAxis);
  //
  // // and a y-axis
  // svg.append("g")
  //     .attr("class", "yaxis")
  //     .call(yAxis);

  var line = d3.line()
      .x(d => xScale(d.Periode))
      .y(d => yScale(d.VertrouwenInAndereMensen))
      .curve(d3.curveLinear);

  charts.append("path")
    .data([vertrouwen])
    .attr("class", "line")
    .attr("d", line);

  charts.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate (0," + (height - padding.top) + ")")
      .call(xAxis);

  charts.append("g")
      .attr("class", "y-axis")
      .call(yAxis)
  // console.log(vertrouwen.VertrouwenInAndereMensen)

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
