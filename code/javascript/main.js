function main(vertrouwen, restOfTheData, graphTitles){

  // showing which population is selected, same syntax as in json due to update
  var popGroups = ["totaal", "nederlands", "westers", "nietWesters"];

  // store processed datasets in variables for functionality
  var lineData = vertrouwen;
  var dendroData = restOfTheData;

  // declare initial year and population
  var getYear = "2012";
  var selectedPop = popGroups[0];

  makeLinegraph(lineData[selectedPop], dendroData, selectedPop, getYear, graphTitles);
  makeDendrogram(dendroData[selectedPop][getYear], selectedPop, getYear, graphTitles);
  updateGraphs(lineData, dendroData, getYear, selectedPop, popGroups, graphTitles);
}
