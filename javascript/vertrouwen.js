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

  // hier komt eventhandler

};

function updateLines(data){

  // console.log('verververver', data)

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

  // console.log('dat', data)

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

function makeDendrogramCanvas(dendroData){
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      padding = {top: 60, right: 60, bottom: 60, left: 60},
      outerWidth = 960,
      outerHeight = 1100,
      innerWidth = outerWidth - margin.left - margin.right,
      innerHeight = outerHeight - margin.top - margin.bottom,
      width = innerWidth - padding.left - padding.right,
      height = innerHeight - padding.top - padding.bottom;

  var dataTotaal = {}
  dataTotaal["internetgebruik"] = dendroData.internetgebruik.totaal;
  dataTotaal["dienstverlening"] = dendroData.dienstverlening.totaal;
  dataTotaal["participatie"] = dendroData.participatie.totaal;
  dataTotaal["interesse"] = dendroData.interesse.totaal;

  var totaal = [];
  totaal.push(dataTotaal)

  var nestTotaal = d3.nest()
      .key(function(d){return d.dienstverlening[2012].Migratieachtergrond})
      .entries(totaal);

  var dataNederlanders = {}
  dataNederlanders["internetgebruik"] = dendroData.internetgebruik.nederlands;
  dataNederlanders["dienstverlening"] = dendroData.dienstverlening.nederlands;
  dataNederlanders["participatie"] = dendroData.participatie.nederlands;
  dataNederlanders["interesse"] = dendroData.interesse.nederlands;

  var nl = [];
  nl.push(dataNederlanders)

  var nestNL = d3.nest()
      .key(function(d){return d.dienstverlening[2012].Migratieachtergrond})
      .entries(nl);

  console.log('nestNL',nestNL)

  var svg = d3.select("#dendrogram")
      .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
      .attr("id", "dendrochart")

  // append 20 pixels to the right
  var g = svg.append("g")
      .attr("transform", "translate(20,0)");

  // creating axis and scale
  var xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, 400]); // the width

  // axis for top of the page
  var xAxis = d3.axisTop(xScale)
      .tickFormat(function(d){return d+ "%"})
      .tickFormat(d => d+ "%")
      .ticks(10);

  // create rootNode (bevolkingsgroep x)
  var root = d3.hierarchy(nestNL)

  // create a cluster layout for dendrogram visualisation
  var tree = d3.cluster()
      .size([height, width - 460])
      .separation((a, b) => ((a.parent == b.parent ? 1 : 2) / a.depth))

  console.log("tree", tree)
  console.log('root',root)
  console.log('rootdescendants', root.descendants())

  // make a path between nodes in the tree.
  var link = g.selectAll(".link")
      .data(root.descendants().slice(1))
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", d => "M" + d.y + "," + d.x
              + "C" + (d.parent.y + 100) + "," + d.x
              + " " + (d.parent.y + 100) + "," + d.parent.x
              + " " + d.parent.y + "," + d.parent.x);

  console.log("link", link)
  // data is nu de root node, maar dit moet eigenlijk bevolkingsgroep worden dus maybe jsons opslitsen ofzo?

  // determine position for every variable in the dendrogram
  var node = g.selectAll(".node")
      data.()
};
