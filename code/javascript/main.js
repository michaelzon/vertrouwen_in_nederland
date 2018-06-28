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
  updateGraphs(lineData, dendroData, getYear, selectedPop, popGroups);
}
