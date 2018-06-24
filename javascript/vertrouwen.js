// the following part will be triggered when the page is loaded
window.onload = function(){

  // request for the queries
  d3.queue()
  .defer(d3.json, "data_structure/json/vertrouwen_nederland.json")
  .defer(d3.json, "data_structure/json/gebruik_dienstverlening.json")
  .defer(d3.json, "data_structure/json/internet_faciliteiten.json")
  .defer(d3.json, "data_structure/json/internet_gebruik.json")
  .defer(d3.json, "data_structure/json/politieke_interesse.json")
  .defer(d3.json, "data_structure/json/politieke_participatie.json")
  .awaitAll(importData);

};

function main(vertrouwen, restOfTheData){

  // showing which population is selected, same syntax as in json due to update
  var popGroups = ["totaal", "nederlands", "westers", "nietWesters"];

  // store processed datasets in variables for functionality
  var lineData = vertrouwen;
  var dendroData = restOfTheData;

  // declare initial year and population (bev)
  var getYear = "2012";
  var selectedPop = popGroups[0];

  makeLinegraph(lineData[selectedPop], dendroData, popGroups);
  makeDendrogram(dendroData[selectedPop][getYear], popGroups);
  update(lineData, dendroData, getYear, selectedPop, popGroups);
}

function update(data, secondData, getYear, selectedPop, popGroups){

  // store clickable options from drop down for code readability
  var butTotaal = document.getElementById("selectTotaal");
  var butNederlands = document.getElementById("selectNederlands");
  var butWesters = document.getElementById("selectWesters");
  var butNietWesters = document.getElementById("selectNietWesters");

  // selected population is parralell with the options in above pop. array
  // pass these population to functions
  butTotaal.addEventListener("click", {
    handleEvent: function (event){
      selectedPop = popGroups[0];
      // makeLinegraph(data.totaal, secondData, selectedPop)
      makeLinegraph(data[selectedPop], secondData, selectedPop);
      // makeDendrogram(secondData.totaal[getYear], selectedPop)
      makeDendrogram(secondData[selectedPop][getYear], selectedPop);

      // adding name of population in graph when clicked on in dropdown
      // svg.append("text")
      //     .attr("id", "bevInGraph")
      //     .attr("x", width / 2 - 300)
      //     .attr("y", height / 8)
      //     .text(popGroups[0])

    }
  });

  butNederlands.addEventListener("click", {
    handleEvent: function (event){
      selectedPop = popGroups[1];
      makeLinegraph(data[selectedPop], secondData, selectedPop);
      makeDendrogram(secondData[selectedPop][getYear], selectedPop);
    }
  });

  butWesters.addEventListener("click", {
    handleEvent: function (event) {
      selectedPop = popGroups[2];
      makeLinegraph(data[selectedPop], secondData, selectedPop)
      makeDendrogram(secondData[selectedPop][getYear], selectedPop)
    }
  });

  butNietWesters.addEventListener("click", {
    handleEvent: function (event) {
      selectedPop = popGroups[3];
      makeLinegraph(data[selectedPop], secondData, selectedPop);
      makeDendrogram(secondData[selectedPop][getYear], selectedPop);
    }
  });

};

function makeLinegraph(data, secondData, selectedPop, popGroups){

  // remove current elements when dropdown options is clicked on
  if (d3.select("#linegraph").select("svg")){
    d3.select("#linegraph").select("svg").remove();
    d3.select("#linegraphLegend").select("svg").remove();
  };

  // determing margins for visualisations
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      padding = {top: 60, right: 60, bottom: 60, left: 60},
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
      .tickFormat(function(d){return d+ "%"})
      .tickFormat(d => d+ "%")
      .ticks(7);

  // canvas for the linegraph
  var svg = d3.select("#linegraph")
      .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
      .attr("id", "linechart");

  // svg with grouping element for the lines
  var charts = svg.append("g")
      .attr("transform", "translate(10, 10)");

  // pushing values to arrays for visualization of graph
  var mensenTot = [];
  for(var i = 0; i < years.length; i ++){
    mensenTot.push(data[years[i]]["VertrouwenInAndereMensen"])
  };

  var ambtTot = [];
  for(var i = 0; i < years.length; i ++){
    ambtTot.push(data[years[i]]["Ambtenaren"])
  };

  var euTot = [];
  for(var i = 0; i < years.length; i ++){
    euTot.push(data[years[i]]["EuropeseUnie"])
  };

  var persTot = [];
  for(var i = 0; i < years.length; i ++){
    persTot.push(data[years[i]]["Pers"])
  };

  var politieTot = [];
  for(var i = 0; i < years.length; i ++){
    politieTot.push(data[years[i]]["Politie"])
  };

  var rechtersTot = [];
  for(var i = 0; i < years.length; i ++){
    rechtersTot.push(data[years[i]]["Rechters"])
  };

  var tweedeKamerTot = [];
  for(var i = 0; i < years.length; i ++){
    tweedeKamerTot.push(data[years[i]]["TweedeKamer"])
  };

  // inserting lines for every variable so multiple classes can be created
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
      .call(yAxis);

  // create extra function to show full variablenames in legend
  var legendLines = d3.scaleOrdinal()
      .domain(["Vertrouwen in Andere Mensen", "Ambtenaren", "Europese Unie",
                "de Pers", "Politie", "Rechters", "de Tweede Kamer"])
      .range(colorbrewer.Spectral[7]);

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
      .attr("width", legendWidth)
      .attr("height", legendHeight)

  svgGraphDes.append("g")
      .attr("id", "graphLegend")
      .attr("transform", "translate(20,20)");

  svgGraphDes.select("#graphLegend")
      .call(graphLegend);

  // create variable due to clickabilty of the buttons next to the yearlabels
  var showYear;

  // makeDendrogram(dendroData[popGroups[2]][getYear], popGroups);
  // makeDendrogram(secondData[popGroups[2]][showYear], selectedPop)
  // makeDendrogram(secondData[selectedPop][getYear], selectedPop)
  // console.log('kendrik',secondData[selectedPop])

  // ensure years on x-axis are clickable and initialize visualization functions
  svg.selectAll(".x-axis .tick")
      .on("click", function(d) {
        var year = d;
        showYear = year.toString();
        console.log('jaar',showYear)
        // console.log('kendrik',secondData[selectedPop].showYear)
        makeLinegraph(data, secondData, selectedPop);
        // makeDendrogram(secondData.totaal[showYear], selectedPop)
        makeDendrogram(secondData[selectedPop][showYear], selectedPop);

      });

      // handle on click event
      // d3.select('#opts')
      //   .on('change', function() {
      //     var newData = eval(d3.select(this).property('value'));
      //     updateLegend(newData);
      // });

  // append small buttons next to labels
  svgTick = svg.selectAll(".x-axis .tick")
      .append("circle")
      .attr("id", "checkbox_1")
      .attr("fill", "#FFFFF")
      .attr("stroke", "#000000")
      .attr("r", "8")
      .attr("stroke-width", "2")
      .attr("stroke-miterlimit", "10")
      .attr("transform", "translate (27, 14)");

      // .on("click", {
      //   console.log(showYear);
      //   handleEvent: function (event){
      //     makeLinegraph(data.totaal)
      //     makeDendrogram(secondData.totaal[d])
      //     }
      //   });

      // .append("polygon")
      // .attr("width", "20")
      // .attr("height", "20")
      // .attr("stroke", "#000000")
      // .attr("stroke-miterlimit", "10")


     // text = svgTick.select('text'),
     // bBox = text.node().getBBox();

      // svgTick.insert('rect', ':first-child')
      //    .attr('x', bBox.x - 3)
      //    .attr('y', bBox.y - 3)
      //    .attr('height', bBox.height + 6)
      //    .attr('width', bBox.width + 6)
      //    .attr("class", "yearLabel")

};

function makeDendrogram(data, selectedPop, popGroups){

  if (d3.select("#dendrogram").select("svg")){
    d3.select("#dendrogram").select("svg").remove();
  };

  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      padding = {top: 60, right: 60, bottom: 60, left: 60},
      outerWidth = 1180,
      outerHeight = 980,
      innerWidth = outerWidth - margin.left - margin.right,
      innerHeight = outerHeight - margin.top - margin.bottom,
      width = innerWidth - padding.left - padding.right,
      height = innerHeight - padding.top - padding.bottom;

  // create svg for the dendrogram visualization
  var svg = d3.select("#dendrogram").append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
      .attr("id", "dendrochart")
      .append("g")
      .attr("transform", "translate(55,100)");

  // move grouping elements 20 pixels to the right
  var g = svg.append("g").attr("transform", "translate(20,0)");

  // creating axixes and scaling functions
  var xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, 400]);

  var xAxis = d3.axisTop(xScale)
      .ticks(10);

  // root is the ith node, starting at zero
  var i = 0,
      duration = 500,
      root;

  // declare tree layout
  var tree = d3.tree()
      .size([height, width])

  // assign variable to the root node
  var root = d3.hierarchy(data, d => d.children)
  root.x0 = height / 2;
  root.y0 = 0;

  // collapse the tree
  root.children.forEach(collapse);
  update(root);

  // collapse function nodes and all their children
  function collapse(d) {
    if(d.children) {
      d._children = d.children
      d._children.forEach(collapse)
      d.children = null
    }
  };

  function update(source){

    // determine x and y position for nodes
    var data = tree(root)

    // and the new tree layout, 'nodes' is our data from now on
    var nodes = data.descendants(),

    // links contains same structure as above minus the root node
    links = data.descendants().slice(1)

    // ensure nodes and links are spread across half of the canvas
    nodes.forEach(d => d.y = d.depth * 180);

    // placing bars at the right of the tree
    var getRect = nodes.slice(5, nodes.length)

    // remove bars if node is clicked and other bars are appended
    d3.selectAll("#reccit").remove();

    // make bars a bit bigger by multipling with four for user readability
    getRect.forEach(function(t){
      console.log((t));
      svg.append("rect")
      .attr("id", "reccit")
      .attr("width", t.data.value * 4)
      .attr("height", 20)
      .attr("x", t.y)
      .attr("y", t.x + 40)
      .attr("transform", "translate(350,-50)");
    });

    // update nodes and recursive assigns id's and classes,
    // if node has a other nodes after her she is a momma, otherwise a baby
    var node = svg.selectAll("g.node")
        .data(nodes, d => d.id || (d.id = ++i))
        .attr("class", d => "node" + (d.children ? " nodeMomma" : " nodeBaby"));

    // a new child is born and birth takes place at position of the parent
    var nodeBirth = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", d => "translate(" + source.y0 + "," + source.x0 + ")")
        .on("click", click);

    // add circles to visualize the nodes
    nodeBirth.append("circle")
        .attr("class", "node")
        .attr('r', 5)
        .style("fill", d => {
          // console.log(d);
          d._children ? "#00­99­00" : "#FF­66­00";
        })

    // (conditie = true) ? (dan dit) : (anders dit)

    // adding labels
    nodeBirth.append("text")
        .attr("dy", ".35em")
        .attr("y", d => d.children || d._children ? -15 : 0)  // position of text left or right from node
        .attr("x", d => d.children || d._children ? -13 : 13) // position of text left or right from node
        .attr("text-anchor", d => d.children || d._children ? "middle" : "start")
        .text(d => d.data.name); // data is convert to root so it needs an extra dimension.

    console.log('source',source.y0, source.x0)

    // console.log(nodes);
    // console.log(source.data.children.length);

    var nodeUpdate = nodeBirth.merge(node);

    // transition to the right position
    nodeUpdate.transition()
        .duration(duration)
        .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

    // update nodes, make each node responsive to the mouse pointer.
    nodeUpdate.select("circle.node")
        .attr("r", 5)
        .attr("x", width/2)
        .attr("y", height/2)
        .style("fill", d => d._children ? "#00­99­00" : "#FF­66­00")
        .attr("cursor", "pointer"); //

    // remove nodes including text and circles when update
    var nodeGone = node.exit().transition()
        .duration(duration)
        .attr("transform", d => "translate(" + source.y + "," + source.x + ")")
        .remove();

    nodeGone.select("circle")
        .attr("r", 0);

    nodeGone.select("text")
        .style("fill-opacity", 0);

    // ****************** links section ***************************

    // make update function for the links, returns id's from collapsed nodes
    var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.id; });

    var linkIt = link.enter().insert("path", "g")
        .attr("class", "link")
        .attr('d', function(d){
          var position = {x: source.x0, y: source.y0}
          return diagonal(position, position)
        });

    var linkUpdate = linkIt.merge(link);

    // transition to parent position
    linkUpdate.transition()
        .duration(duration)
        .attr("d", d => diagonal(d, d.parent));

    // delete current links
    var linkDelete = link.exit().transition()
        .duration(duration)
        .attr('d', function(d) {
          var position = {x: source.x, y: source.y}
          return diagonal(position, position)
        })
        .remove();

    // remember the position of nodes so the transition runs smoothly
    nodes.forEach(function(d){
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // function for the path between mothers and baby's
    function diagonal(s, d) {

      path = `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`

      return path
    }

    var g = svg.append("g").attr("transform", "translate(20,0)");       // move right 20px.

    svg.append("g")
        .attr("class", "x-axis")
        // .attr("transform", "translate (0," - height + ","  + ")")
        // .attr("transform", "translate(" - height + "," + innerWidth + ")")
        // .attr("transform", "translate(" + x + "," + y + ")")
        .attr("transform", "translate(710,0)")
        .call(xAxis);

    // switch between state of nodes when clicked on.
    function click(d) {
      if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
      update(d);
    }


  }


};
