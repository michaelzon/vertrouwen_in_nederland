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

  // declare initial year and population
  var getYear = "2012";
  var selectedPop = popGroups[0];

  makeLinegraph(lineData[selectedPop], dendroData, selectedPop, getYear);
  makeDendrogram(dendroData[selectedPop][getYear], selectedPop, getYear);
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
      makeLinegraph(data[selectedPop], secondData, selectedPop, getYear);
      makeDendrogram(secondData[selectedPop][getYear], selectedPop, getYear);
    }
  });

  butNederlands.addEventListener("click", {
    handleEvent: function (event){
      selectedPop = popGroups[1];
      makeLinegraph(data[selectedPop], secondData, selectedPop, getYear);
      makeDendrogram(secondData[selectedPop][getYear], selectedPop, getYear);
    }
  });

  butWesters.addEventListener("click", {
    handleEvent: function (event) {
      selectedPop = popGroups[2];
      makeLinegraph(data[selectedPop], secondData, selectedPop, getYear);
      makeDendrogram(secondData[selectedPop][getYear], selectedPop, getYear);
    }
  });

  butNietWesters.addEventListener("click", {
    handleEvent: function (event) {
      selectedPop = popGroups[3];
      makeLinegraph(data[selectedPop], secondData, selectedPop, getYear);
      makeDendrogram(secondData[selectedPop][getYear], selectedPop, getYear);
    }
  });

};

function makeLinegraph(data, secondData, selectedPop, showYear){

  // remove current elements when dropdown options is clicked on
  if (d3.select("#linegraph").select("svg")){
    d3.select("#linegraph").select("svg").remove();
    d3.select("#linegraphLegend").select("svg").remove();
  };

  // determing margins for visualisations
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

  var graphTitles = {};
  graphTitles["totaal"] = "Totale gemiddelde";
  graphTitles["nederlands"] = "Geen migratieachtergrond";
  graphTitles["westers"] = "Westerse migratieachtergrond";
  graphTitles["nietWesters"] = "Niet-westerse migratieachtergrond";

  // adding name of population in graph when clicked on in dropdown
  svg.append("text")
      .attr("id", "popInGraph")
      .attr("x", width / 2 - 450)
      .attr("y", height / 8)
      .text(graphTitles[selectedPop]);

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

  // dummyTot = [80, 80, 80, 80, 80, 80];
  // dummyTot = [(width,height), (width,height),(width,height),(width,height),(width,height), (width,height)]
  // dummyTot = [(width,20), (width,20),(width,20),(width,20),(width,20), (width,20)]
  // dummyTot = [(20,20), (20,20),(20,20),(20,20),(20,20), (20,20)]

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
      .y((d,i) => yScale(politieTot[i])) // pass a list of all percentages from mensenvertrouwen of totaalbev
      .curve(d3.curveLinear);

  charts.append("path")
      .data([years])
      .attr("id", "linePolitie")
      .attr("class", "lines")
      .attr("d", dummyMen);

  var lineRechters = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(rechtersTot[i])) // pass a list of all percentages from mensenvertrouwen of totaalbev
      .curve(d3.curveLinear);

  charts.append("path")
      .data([years])         //array with years
      .attr("id", "lineRechters")
      .attr("class", "lines")
      .attr("d", dummyMen);

  var lineTweedeKamer = d3.line()
      .x(d => xScale(d))
      .y((d,i) => yScale(tweedeKamerTot[i])) // pass a list of all percentages from mensenvertrouwen of totaalbev
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

  // append small buttons next to labels, each circle gets different id
  // for coloring
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
      // .on("click", function(d){
      //   var year = d;
      //   showYear = year.toString();
      //   makeLinegraph(data, secondData, selectedPop, showYear);
      //   makeDendrogram(secondData[selectedPop][showYear], selectedPop, showYear);
      // })
      .on("click", d => {
        var year = d;
        showYear = year.toString();
        makeLinegraph(data, secondData, selectedPop, showYear);
        makeDendrogram(secondData[selectedPop][showYear], selectedPop, showYear);})

  // color the checkbox of the selected year and
  function colorChecks(){
      svg.selectAll(".checkboxes")
          .style("fill", "FFFFF");
      svg.select("#checkbox" + showYear)
          .style("fill", "FF0000");
    };

  colorChecks()

};

function makeDendrogram(data, selectedPop, showYear){

  if (d3.select("#dendrogram").select("svg")){
    d3.select("#dendrogram").select("svg").remove();
  };

  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      padding = {top: 60, right: 60, bottom: 60, left: 60},
      lilPad = 10,
      outerWidth = 1380,
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
      .attr("transform", "translate(135,100)");

  // adding name of population in graph when clicked on in dropdown
  svg.append("text")
      .attr("id", "yearInDendro")
      .attr("x", width / 2 - 600)
      .attr("y", height / 12)
      .attr("transform", "translate(20,-80)")
      .text(showYear);

  // move grouping elements 20 pixels to the right
  var g = svg.append("g").attr("transform", "translate(20,0)");

  // creating axixes and scaling functions for barchart
  var xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, 400]);

  var xAxis = d3.axisTop(xScale)
      .tickFormat(function(d){return d+ "%"})
      .tickFormat(d => d+ "%")
      .ticks(10);

  // root is the ith node, starting at zero
  var i = 0,
      duration = 500,
      root;

  // declare tree layout
  var tree = d3.tree()
      .size([height, width]);

  // assign variable to the root node
  var root = d3.hierarchy(data, d => d.children);
  root.x0 = height / 2;
  root.y0 = 0;

  // collapse the tree
  root.children.forEach(collapse);
  update(root);

  // collapse function nodes and all their children
  function collapse(d){
    if(d.children) {
      d._children = d.children
      d._children.forEach(collapse)
      d.children = null
    }
  };

  function update(source){

    // determine x and y position for nodes
    var data = tree(root),

    // and the new tree layout, 'nodes' is our data from now on
        nodes = data.descendants(),

    // links contains same structure as above minus the root node
        links = data.descendants().slice(1);

    // ensure nodes and links are spread across half of the canvas
    nodes.forEach(d => d.y = d.depth * 180);

    // placing bars at the right of the tree
    var getRect = nodes.slice(5, nodes.length);

    // remove bars if node is clicked and other bars are appended
    d3.selectAll("#reccit").remove();
    d3.selectAll("#axisDendro").remove();

    // gridlines in x axis function
    function make_x_gridlines() {
        return d3.axisBottom(xScale)
            .ticks(10);
    }

    var graphTitles = {};
    graphTitles["totaal"] = "Totale gemiddelde";
    graphTitles["nederlands"] = "Geen migratieachtergrond";
    graphTitles["westers"] = "Westerse migratieachtergrond";
    graphTitles["nietWesters"] = "Niet-westerse migratieachtergrond";
    graphTitles["participatie"] = "Politieke participatie";
    graphTitles["interesse"] = "Politieke interesse";
    graphTitles["internetgebruik"] = "Frequentie internetgebruik";
    graphTitles["dienstverlening"] =
    "Gedrag dienstverleningswebsites";
    graphTitles["RadioTelevisieOfKrantIngeschakeld"] =
    "Radio, televisie of krant ingeschakeld";
    graphTitles["PolitiekeOrganisatieIngeschakeld"] =
    "Politieke organisatie ingeschakeld";
    graphTitles["MeegedaanAanBijeenkomstOverheid"] = "Meegedaan aan bijeenkomst van de overheid";
    graphTitles["ContactOpgenomenMetPoliticus"] = "Contact opgenomen met politicus";
    graphTitles["MeegedaanAanActiegroep"] = "Meegedaan aan actiegroep";
    graphTitles["MeegedaanAanProtestactie"] = "Meegedaan aan protestactie";
    graphTitles["MeegedaanAanHandtekeningenactie"] = "Meegedaan aan handtekeningenactie";
    graphTitles["MeegedaanPolitiekeActieViaInternet"] = "Meegedaan met politieke actie via internet";
    graphTitles["Anders"] = "Anders";
    graphTitles["ZeerGeinteresseerd"] = "Zeer geïnteresseerd";
    graphTitles["TamelijkGeinteresseerd"] = "Tamelijk geïnteresseerd";
    graphTitles["WeinigGeinteresseerd"] = "Weinig geïnteresseerd";
    graphTitles["NietGeinteresseerd"] = "Niet geïnteresseerd";
    graphTitles["MinderDan3MaandenGeleden"] = "Minder dan drie maanden geleden";
    graphTitles["drieTotTwaalfMaandenGeleden"] = "Drie tot twaalf maanden geleden";
    graphTitles["MeerDan12MaandenGeleden"] = "Meer dan twaalf maanden geleden";
    graphTitles["NooitInternetGebruikt"] = "Nooit internet gebruikt";
    graphTitles["BijnaElkeDag"] = "Bijna elke dag";
    graphTitles["MinstensEenKeerPerWeek"] = "Minstens een keer per week";
    graphTitles["MinderDanEenKeerPerWeek"] = "Minder dan een keer per week";
    graphTitles["ZoekenOpWebsitesOverheid"] = "Zoeken op websites overheid";
    graphTitles["OfficieleDocumentenDownloadenOverheid"] = "Officiële documenten downloaden overheid";
    graphTitles["ZoekenOpWebsitesPubliekeSector"] = "Zoeken op websites publieke sector";
    graphTitles["OfficieleDocumentenDownloadenPubliekeSector"] = "Officiële documenten downloaden publieke sector";

    // colorfunction with colorbrewer for those who suffer from bad eyes
    var colorBars = d3.scaleOrdinal()
        .domain(24)
        .range(colorbrewer.RdBu[4]);

    // append bars and x axis when node is clicked on
    getRect.forEach(function(t){
      // console.log(('t',t));
      svg.append("rect")
          .attr("id", "reccit")
          .attr("width", 0)
          .attr("height", 20)
          .attr("rx", 3)
          .attr("ry", 3)
          .attr("transform", "translate(370,-50)")
          .transition()
              .duration(600)
              .attr("x", t.y)
              .attr("y", t.x + 40)
              .attr("width", d => xScale(t.data.value));

      d3.selectAll("#axisDendro").remove();

      // placing x-axis, placing at 710 is used due to trial and error
      svg.append("g")
          .attr("class", "x-axis")
          .attr("id", "axisDendro")
          .attr("transform", "translate(730,0)")
          .transition()
              .duration(600)
          .call(xAxis);

// "translate(" + padding + "," + padding + ")")

      d3.select("#dendrogram").selectAll(".grid").remove();
      svg.append("g")
          .attr("class", "grid")
          .attr("transform", "translate(730, 820)")
          .call(make_x_gridlines()
              .tickSize(-height)
              .tickFormat("")
          );
      });

    svg.selectAll("rect")
        .attr("fill", (d,i) => colorBars(i));

    // update nodes and recursive assigns id's and classes,
    // if node has another nodes after her she is a momma, otherwise a baby
    var node = svg.selectAll("g.node")
        .data(nodes, d => d.id || (d.id = ++i))
        .attr("class", d => "node" + (d.children ? " nodeMomma" : " nodeBaby"));

    // a new child is born and birth takes place at position of the momma
    var nodeBirth = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", d => "translate(" + source.y0 + "," + source.x0 + ")")
        .on("click", click);

    // add circles to visualize the nodes
    nodeBirth.append("circle")
        .attr("class", "node")
        .attr('r', 5);

    // (conditie = true) ? (dan dit) : (anders dit)

    // adding text label with variablenames of the nodes
    nodeBirth.append("text")
        .attr("dy", ".35em")
        .attr("y", d => d.children || d._children ? -15 : 0)
        .attr("x", d => d.children || d._children ? -13 : 13)          // position of text left or right from node
        .attr("text-anchor", d => d.children || d._children ? "middle" : "start")
        // .text(d => d.data.name);                                       // data is convert to root so it needs an extra dimension.
        .text(d => graphTitles[d.data.name]);                                       // data is convert to root so it needs an extra dimension.

    // when node is clicked she gives birth to a bunch of other nodes
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
        .attr("cursor", "pointer");

    // remove nodes including text and circles when update
    var nodeGone = node.exit().transition()
        .duration(duration)
        .attr("transform", d => "translate(" + source.y + "," + source.x + ")")
        .remove();

    // let node shrink to zero radius when they are gone
    nodeGone.select("circle")
        .attr("r", 0);

    nodeGone.select("text")
        .style("fill-opacity", 0);

    // make update function for the links, returns id's from collapsed nodes
    var link = svg.selectAll("path.link")
        .data(links, d => d.id);

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
        .attr('d', function(d){
          var position = {x: source.x, y: source.y}
          return diagonal(position, position)
        })
        .remove();

    // remember the position of nodes so the transition runs smoothly
    nodes.forEach(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // function for the path between mothers and baby's
    function diagonal(s, d){

      path = `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;

      return path;
    };

    // switch between state of nodes when clicked on
    function click(d) {
      if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
      update(d);
    };
  };
};
