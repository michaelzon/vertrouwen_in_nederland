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
