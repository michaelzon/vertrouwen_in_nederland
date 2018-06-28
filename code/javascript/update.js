function updateGraphs(data, secondData, getYear, selectedPop, popGroups,
                      graphTitles){
/* this update functions manipulates the visualizations on the page when a
** option is selected in the dropdown menu */

  // store clickable options from drop down for code readability
  var butTotaal = document.getElementById("selectTotaal");
  var butNederlands = document.getElementById("selectNederlands");
  var butWesters = document.getElementById("selectWesters");
  var butNietWesters = document.getElementById("selectNietWesters");

  // selected population is in line with the options in above pop. array
  butTotaal.addEventListener("click", {
    handleEvent: function (event){
      selectedPop = popGroups[0];
      makeLinegraph(data[selectedPop], secondData, selectedPop, getYear,
                    graphTitles);
      makeDendrogram(secondData[selectedPop][getYear], selectedPop, getYear,
                    graphTitles);
    }
  });

  butNederlands.addEventListener("click", {
    handleEvent: function (event){
      selectedPop = popGroups[1];
      makeLinegraph(data[selectedPop], secondData, selectedPop, getYear,
                    graphTitles);
      makeDendrogram(secondData[selectedPop][getYear], selectedPop, getYear,
                    graphTitles);
    }
  });

  butWesters.addEventListener("click", {
    handleEvent: function (event){
      selectedPop = popGroups[2];
      makeLinegraph(data[selectedPop], secondData, selectedPop, getYear,
                    graphTitles);
      makeDendrogram(secondData[selectedPop][getYear], selectedPop, getYear,
                    graphTitles);
    }
  });

  butNietWesters.addEventListener("click", {
    handleEvent: function (event){
      selectedPop = popGroups[3];
      makeLinegraph(data[selectedPop], secondData, selectedPop, getYear,
                    graphTitles);
      makeDendrogram(secondData[selectedPop][getYear], selectedPop, getYear,
                    graphTitles);
    }
  });

};
