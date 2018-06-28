/* Name: Michael Zonneveld
** Studentnumber: 11302984
** Date: 28/06/18 */

function makeLinegraph(data, secondData, selectedPop, showYear, graphNames){
/* this function creates the multiple linegraph visualisation
** paths are drawn one for one depending on which array is selected
** the ticks beneath the x-axis represent buttons to select a year for the
** dendrogram */

  // remove current elements when dropdown options is clicked on
  if (d3.select("#linegraph").select("svg")){
    d3.select("#linegraph").select("svg").remove();
    d3.select("#linegraphLegend").select("svg").remove();
  };

  // margins for visualisations
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      padding = {top: 60, right: 60, bottom: 60, left: 60},
      lilPad = 10,
      outerWidth = 1160,
      outerHeight = 600,
      innerWidth = outerWidth - margin.left - margin.right,
      innerHeight = outerHeight - margin.top - margin.bottom,
      width = innerWidth - padding.left - padding.right,
      height = innerHeight - padding.top - padding.bottom;
      legendHeight = 230;
      legendWidth = 220;

  // create an array of years and convert the type to number for axixes
  var years = (Object.keys(data))
  for(var i = 0; i < years.length; i ++){
    years[i] = Number(years[i])
  };

  // width scaling of the graph domain returns 2012 (min) and 2017 (max)
  var xScale = d3.scaleLinear()
      .domain(d3.extent(years))
      .range([0, width]);

  // there are no percentages lower or higher than 20 and 80 respectively
  var yScale = d3.scaleLinear()
      .domain([20, 80])
      .range([height, 0]);

  // function for creating axixes
  var xAxis = d3.axisBottom(xScale)
      .tickFormat((d,i) => years[i])
      .ticks(6);

  // ensure labels are shown in percentages
  var yAxis = d3.axisLeft(yScale)
      .tickFormat(d => d+ "%")
      .ticks(7);

  // canvas for the linegraph
  var svg = d3.select("#linegraph")
      .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
      .attr("id", "linechart");

  // adding name of population in graph when clicked on in dropdown
  svg.append("text")
      .attr("id", "popInGraph")
      .attr("x", width / 2 - 450)
      .attr("y", height / 8)
      .text(graphNames[selectedPop]);

  // gridlines in x axis function
  function make_x_gridlines() {
      return d3.axisBottom(xScale)
          .ticks(6);
  };

  // gridlines in y axis function
  function make_y_gridlines() {
      return d3.axisLeft(yScale)
          .ticks(7);
  };

  // add the X gridlines
  svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(10," + (height + lilPad) + ")")
      .call(make_x_gridlines()
          .tickSize(-height)
          .tickFormat("")
      );

  // add the Y gridlines
  svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(10,10)")
      .call(make_y_gridlines()
          .tickSize(-width)
          .tickFormat("")
      );

  // svg with grouping element for the lines
  var charts = svg.append("g")
      .attr("transform", "translate(10, 10)");

  // pushing values to arrays for visualization of graph
  var mensenTot = [];
  for(var i = 0; i < years.length; i ++){
    mensenTot.push(data[years[i]]["VertrouwenInAndereMensen"]);
  };

  var ambtTot = [];
  for(var i = 0; i < years.length; i ++){
    ambtTot.push(data[years[i]]["Ambtenaren"]);
  };

  var euTot = [];
  for(var i = 0; i < years.length; i ++){
    euTot.push(data[years[i]]["EuropeseUnie"]);
  };

  var persTot = [];
  for(var i = 0; i < years.length; i ++){
    persTot.push(data[years[i]]["Pers"]);
  };

  var politieTot = [];
  for(var i = 0; i < years.length; i ++){
    politieTot.push(data[years[i]]["Politie"]);
  };

  var rechtersTot = [];
  for(var i = 0; i < years.length; i ++){
    rechtersTot.push(data[years[i]]["Rechters"]);
  };

  var tweedeKamerTot = [];
  for(var i = 0; i < years.length; i ++){
    tweedeKamerTot.push(data[years[i]]["TweedeKamer"]);
  };

  // starting positions for the lines with transition
  var dummyTot = [20, 20, 20, 20, 20, 20];

  // inserting lines for every variable so multiple classes can be created
  var lineMen = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(mensenTot[i]))
      .curve(d3.curveLinear);

  var dummyMen = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(dummyTot[i]))
      .curve(d3.curveLinear);

  // the data is the list with years
  charts.append("path")
      .data([years])
      .attr("id", "lineMen")
      .attr("class", "lines")
      .attr("d", dummyMen);

  // pass the list with years to x-scaling function
  var lineAmbt = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(ambtTot[i]))
      .curve(d3.curveLinear);

  charts.append("path")
    .data([years])
    .attr("id", "lineAmbt")
    .attr("class", "lines")
    .attr("d", dummyMen);

  // and pass the list with percentages to y-scaling function
  var lineEu = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(euTot[i]))
      .curve(d3.curveLinear);

  charts.append("path")
      .data([years])
      .attr("id", "lineEu")
      .attr("class", "lines")
      .attr("d", dummyMen);

  var linePers = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(persTot[i]))
      .curve(d3.curveLinear);

  charts.append("path")
      .data([years])
      .attr("id", "linePers")
      .attr("class", "lines")
      .attr("d", dummyMen);

  var linePolitie = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(politieTot[i]))
      .curve(d3.curveLinear);

  charts.append("path")
      .data([years])
      .attr("id", "linePolitie")
      .attr("class", "lines")
      .attr("d", dummyMen);

  var lineRechters = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(rechtersTot[i]))
      .curve(d3.curveLinear);

  charts.append("path")
      .data([years])
      .attr("id", "lineRechters")
      .attr("class", "lines")
      .attr("d", dummyMen);

  var lineTweedeKamer = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(tweedeKamerTot[i]))
      .curve(d3.curveLinear);

  charts.append("path")
      .data([years])
      .attr("id", "lineTweedeKamer")
      .attr("class", "lines")
      .attr("d", dummyMen);

  charts.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate (0," + height + ")")
      .call(xAxis);

  charts.append("g")
      .attr("class", "y-axis")
      .call(yAxis);

  // ensure lines are appear smoothly when page is loaded or update is called
  var trans = charts.transition();
  var duration = 1000;

  // transition didn't worked when selected on all lines via classes
  trans.select("#lineMen").duration(duration)
      .attr("d", lineMen(years));

  trans.select("#lineAmbt").duration(duration)
      .attr("d", lineAmbt(years));

  trans.select("#lineEu").duration(duration)
      .attr("d", lineEu(years));

  trans.select("#linePers").duration(duration)
      .attr("d", linePers(years));

  trans.select("#linePolitie").duration(duration)
      .attr("d", linePolitie(years));

  trans.select("#lineRechters").duration(duration)
      .attr("d", lineRechters(years));

  trans.select("#lineTweedeKamer").duration(duration)
      .attr("d", lineTweedeKamer(years));

  // create extra function to show full variablenames in legend
  var legendLines = d3.scaleOrdinal()
      .domain(["Vertrouwen in Andere Mensen", "Ambtenaren", "Europese Unie",
                "de Pers", "Politie", "Rechters", "de Tweede Kamer"])
      .range(colorbrewer.Set2[7]);

  // creating legend
  var graphLegend = d3.legendColor()
      .shape("path", d3.symbol()
      .type(d3.symbolSquare)
      .size(700)())
      .labelOffset(12)
      .scale(legendLines);

  // placing legend
  var svgGraphDes = d3.select("#linegraphLegend")
      .append("svg")
      .attr("id", "legendbox")
      .attr("width", legendWidth)
      .attr("height", legendHeight);

  svgGraphDes.append("g")
      .attr("id", "graphLegend")
      .attr("transform", "translate(20,20)");

  svgGraphDes.select("#graphLegend")
      .call(graphLegend);

  // create buttons next to labels, each circle gets different id for coloring
  svgTick = svg.selectAll(".x-axis .tick")
      .append("circle")
      .attr("class", "checkboxes")
      .attr("id", d => "checkbox" + d)
      .attr("stroke", "#000000")
      .attr("r", "8")
      .attr("stroke-width", "2")
      .attr("stroke-miterlimit", "10")
      .attr("transform", "translate (27, 14)");

  // ensure years on x-axis are clickable and initialize visualization functions
  svg.selectAll(".x-axis .tick")
      .on("click", d => {
        var year = d;
        showYear = year.toString();
        makeLinegraph(data, secondData, selectedPop, showYear, graphNames);
        makeDendrogram(secondData[selectedPop][showYear], selectedPop, showYear,
                      graphNames);})

  // color the checkbox of the selected year and
  function colorChecks(){
      svg.selectAll(".checkboxes")
          .style("fill", "FFFFF");
      svg.select("#checkbox" + showYear)
          .style("fill", "FF0000");
    };

  colorChecks()

  // scroll to dendrogram when year is selected
  $(".tick").click(function() {
    $('html, body').animate({
        scrollTop: $("#secondVis").offset().top
    }, 1000);
  });

};
