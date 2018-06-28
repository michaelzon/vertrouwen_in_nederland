function main(vertrouwen, restOfTheData, graphNames){
/* this main function calls all the visualisation functions and the update
** function after is recieves it data from the importData script */

  // showing which population is selected, same syntax as in json due to update
  var popGroups = ["totaal", "nederlands", "westers", "nietWesters"];

  // store processed datasets in variables for functionality
  var lineData = vertrouwen;
  var dendroData = restOfTheData;

  // declare initial year and population
  var getYear = "2012";
  var selectedPop = popGroups[0];

  makeLinegraph(lineData[selectedPop], dendroData, selectedPop, getYear,
                graphNames);

  makeDendrogram(dendroData[selectedPop][getYear], selectedPop, getYear,
                graphNames);

  updateGraphs(lineData, dendroData, getYear, selectedPop, popGroups,
                graphNames);
}
