/* Name: Michael Zonneveld
** Studentnumber: 11302984
** Date: 28/06/18 */

function importData(error, response){
/* Checks if data is loaded, parses the data into correct format and sends it to
** the main function */

  // check if data gets loaded
  if (error) throw error;

  // creating one big array of all the objects
  var bigDatty = [];

  for(i = 0; i < 5; i ++){
    bigDatty.push(response[i])
  };

  var years = [2012, 2013, 2014, 2015, 2016, 2017];

  // fetching data and parse it to numbers or delete inrelevant data
  var vertrouwen = (bigDatty[0]["vertrouwen"]);

  for(var i = 0; i < vertrouwen.length; i ++){
    delete(vertrouwen[i].ID);
    delete(vertrouwen[i].Migratieachtergrond);
    vertrouwen[i].Periode = Number(vertrouwen[i].Periode);
    vertrouwen[i].Ambtenaren = Number(vertrouwen[i].Ambtenaren);
    vertrouwen[i].EuropeseUnie = Number(vertrouwen[i].EuropeseUnie);
    vertrouwen[i].Pers = Number(vertrouwen[i].Pers);
    vertrouwen[i].Politie = Number(vertrouwen[i].Politie);
    vertrouwen[i].Rechters = Number(vertrouwen[i].Rechters);
    vertrouwen[i].TweedeKamer = Number(vertrouwen[i].TweedeKamer);
    vertrouwen[i].VertrouwenInAndereMensen =
      Number(vertrouwen[i].VertrouwenInAndereMensen);
  };

  // create an array with all variables from vertrouwen dataset
  var vertrouwenVars = Object.keys(vertrouwen[0]);

  // push to dicts with populationgroups as key
  var totaal = {};
  for(var i = 0; i < years.length; i ++){
    totaal[years[i]] = {};
    for(var j = 0; j < vertrouwenVars.length; j ++){
      totaal[years[i]][Object.keys(vertrouwen[i])[j]] =
      Object.values(vertrouwen[i])[j];
    };
  };

  var nederlands = {};
  for(var i = 0; i < years.length; i ++){
    nederlands[years[i]] = {};
    for(var j = 0; j < vertrouwenVars.length; j ++){
      nederlands[years[i]][Object.keys(vertrouwen[i+6])[j]] =
      Object.values(vertrouwen[i+6])[j];
    };
  };

  var westers = {};
  for(var i = 0; i < years.length; i ++){
    westers[years[i]] = {};
    for(var j = 0; j < vertrouwenVars.length; j ++){
      westers[years[i]][Object.keys(vertrouwen[i+12])[j]] =
      Object.values(vertrouwen[i+12])[j];
    };
  };

  var nietWesters = {};
  for(var i = 0; i < years.length; i ++){
    nietWesters[years[i]] = {};
    for(var j = 0; j < vertrouwenVars.length; j ++){
      nietWesters[years[i]][Object.keys(vertrouwen[i+18])[j]] =
      Object.values(vertrouwen[i+18])[j];
    };
  };

  var vertrouwen = {};
  vertrouwen["totaal"] = totaal;
  vertrouwen["nederlands"] = nederlands;
  vertrouwen["westers"] = westers;
  vertrouwen["nietWesters"] = nietWesters;

  var dienstverlening = (bigDatty[1]["dienstverlening"]);

  for(var i = 0; i < dienstverlening.length; i ++){
    delete(dienstverlening[i].ID);
    delete(dienstverlening[i].Migratieachtergrond);
    delete(dienstverlening[i].Periode);
    dienstverlening[i].ZoekenOpWebsitesOverheid =
      Number(dienstverlening[i].ZoekenOpWebsitesOverheid);
    dienstverlening[i].OfficieleDocumentenDownloadenOverheid =
      Number(dienstverlening[i].OfficieleDocumentenDownloadenOverheid);
    dienstverlening[i].ZoekenOpWebsitesPubliekeSector =
      Number(dienstverlening[i].ZoekenOpWebsitesPubliekeSector);
    dienstverlening[i].OfficieleDocumentenDownloadenPubliekeSector =
      Number(dienstverlening[i].OfficieleDocumentenDownloadenPubliekeSector);
  };

  var dienstverleningVars = Object.keys(dienstverlening[0]);

  var totaal = {};
  for(var i = 0; i < years.length; i ++){
    totaal[years[i]] = {};
    for(var j = 0; j < dienstverleningVars.length; j ++){
      totaal[years[i]][Object.keys(dienstverlening[i])[j]] =
      Object.values(dienstverlening[i])[j];
    };
  };

  var nederlands = {};
  for(var i = 0; i < years.length; i ++){
    nederlands[years[i]] = {};
    for(var j = 0; j < dienstverleningVars.length; j ++){
      nederlands[years[i]][Object.keys(dienstverlening[i+6])[j]] =
      Object.values(dienstverlening[i+6])[j];
    };
  };

  var westers = {};
  for(var i = 0; i < years.length; i ++){
    westers[years[i]] = {};
    for(var j = 0; j < dienstverleningVars.length; j ++){
      westers[years[i]][Object.keys(dienstverlening[i+12])[j]] =
      Object.values(dienstverlening[i+12])[j];
    };
  };

  var nietWesters = {};
  for(var i = 0; i < years.length; i ++){
    nietWesters[years[i]] = {};
    for(var j = 0; j < dienstverleningVars.length; j ++){
      nietWesters[years[i]][Object.keys(dienstverlening[i+18])[j]] =
      Object.values(dienstverlening[i+18])[j];
    };
  };

  var dienstverlening = {};
  dienstverlening["totaal"] = totaal;
  dienstverlening["nederlands"] = nederlands;
  dienstverlening["westers"] = westers;
  dienstverlening["nietWesters"] = nietWesters;

  var superKeys = Object.keys(dienstverlening);

  var dataDienstverlening = {};

  // ensure data is in tree hierarchy
  years.forEach(function(year){
    var superTempArray = [];
    superKeys.forEach(function(superKey){
      var tempArray = [];
      keys = Object.keys(dienstverlening[superKey][year]);
      var uberArray = [];
      keys.forEach(function(key){
        uberArray.push({"name": key, "value": dienstverlening[superKey][year][key]})
      })
      tempArray = {"name": "dienstverlening", "children": uberArray};
      superTempArray.push({"name": superKey, "children": [tempArray]});
    })
    dataDienstverlening[year] = {"name": year, "children": superTempArray}
  });

  var gebruik = (bigDatty[2]["gebruik"]);

  for(var i = 0; i < gebruik.length; i ++){
    delete(gebruik[i].ID);
    delete(gebruik[i].Migratieachtergrond);
    delete(gebruik[i].Periode);
    gebruik[i].MinderDan3MaandenGeleden =
      Number(gebruik[i].MinderDan3MaandenGeleden);
    gebruik[i].drieTotTwaalfMaandenGeleden =
      Number(gebruik[i].drieTotTwaalfMaandenGeleden);
    gebruik[i].MeerDan12MaandenGeleden =
      Number(gebruik[i].MeerDan12MaandenGeleden);
    gebruik[i].NooitInternetGebruikt = Number(gebruik[i].NooitInternetGebruikt);
    gebruik[i].BijnaElkeDag = Number(gebruik[i].BijnaElkeDag);
    gebruik[i].MinstensEenKeerPerWeek =
      Number(gebruik[i].MinstensEenKeerPerWeek);
    gebruik[i].MinderDanEenKeerPerWeek =
      Number(gebruik[i].MinderDanEenKeerPerWeek);
  };

  var gebruikVars = Object.keys(gebruik[0]);

  var totaal = {};
  for(var i = 0; i < years.length; i ++){
    totaal[years[i]] = {};
    for(var j = 0; j < gebruikVars.length; j ++){
      totaal[years[i]][Object.keys(gebruik[i])[j]] =
        Object.values(gebruik[i])[j];
    };
  };

  var nederlands = {};
  for(var i = 0; i < years.length; i ++){
    nederlands[years[i]] = {};
    for(var j = 0; j < gebruikVars.length; j ++){
      nederlands[years[i]][Object.keys(gebruik[i+6])[j]] =
        Object.values(gebruik[i+6])[j];
    };
  };

  var westers = {};
  for(var i = 0; i < years.length; i ++){
    westers[years[i]] = {};
    for(var j = 0; j < gebruikVars.length; j ++){
      westers[years[i]][Object.keys(gebruik[i+12])[j]] =
        Object.values(gebruik[i+12])[j];
    };
  };

  var nietWesters = {};
  for(var i = 0; i < years.length; i ++){
    nietWesters[years[i]] = {};
    for(var j = 0; j < gebruikVars.length; j ++){
      nietWesters[years[i]][Object.keys(gebruik[i+18])[j]] =
        Object.values(gebruik[i+18])[j];
    };
  };

  var gebruik = {};
  gebruik["totaal"] = totaal;
  gebruik["nederlands"] = nederlands;
  gebruik["westers"] = westers;
  gebruik["nietWesters"] = nietWesters;

  var superKeys = Object.keys(gebruik);

  var dataGebruik = {};

  years.forEach(function(year){
    var superTempArray = [];
    superKeys.forEach(function(superKey){
      var tempArray = [];
      keys = Object.keys(gebruik[superKey][year]);
      var uberArray = [];
      keys.forEach(function(key){
        uberArray.push({"name": key, "value": gebruik[superKey][year][key]});
      });
      tempArray = {"name": "internetgebruik", "children": uberArray};
      superTempArray.push({"name": superKey, "children": [tempArray]});
    });
    dataGebruik[year] = {"name": year, "children": superTempArray};
  });

  var interesse = (bigDatty[3]["interesse"]);

  for(var i = 0; i < interesse.length; i ++){
    delete(interesse[i].ID);
    delete(interesse[i].Migratieachtergrond);
    delete(interesse[i].Periode);
    interesse[i].ZeerGeinteresseerd = Number(interesse[i].ZeerGeinteresseerd);
    interesse[i].TamelijkGeinteresseerd =
      Number(interesse[i].TamelijkGeinteresseerd);
    interesse[i].WeinigGeinteresseerd =
      Number(interesse[i].WeinigGeinteresseerd);
    interesse[i].NietGeinteresseerd = Number(interesse[i].NietGeinteresseerd);
  };

  var interesseVars = Object.keys(interesse[0]);

  var totaal = {};
  for(var i = 0; i < years.length; i ++){
    totaal[years[i]] = {};
    for(var j = 0; j < interesseVars.length; j ++){
      totaal[years[i]][Object.keys(interesse[i])[j]] =
        Object.values(interesse[i])[j];
    };
  };

  var nederlands = {};
  for(var i = 0; i < years.length; i ++){
    nederlands[years[i]] = {};
    for(var j = 0; j < interesseVars.length; j ++){
      nederlands[years[i]][Object.keys(interesse[i+6])[j]] =
        Object.values(interesse[i+6])[j];
    };
  };

  var westers = {};
  for(var i = 0; i < years.length; i ++){
    westers[years[i]] = {};
    for(var j = 0; j < interesseVars.length; j ++){
      westers[years[i]][Object.keys(interesse[i+12])[j]] =
        Object.values(interesse[i+12])[j];
    };
  };

  var nietWesters = {};
  for(var i = 0; i < years.length; i ++){
    nietWesters[years[i]] = {};
    for(var j = 0; j < interesseVars.length; j ++){
      nietWesters[years[i]][Object.keys(interesse[i+18])[j]] =
        Object.values(interesse[i+18])[j];
    };
  };

  var interesse = {};
  interesse["totaal"] = totaal;
  interesse["nederlands"] = nederlands;
  interesse["westers"] = westers;
  interesse["nietWesters"] = nietWesters;

  var superKeys = Object.keys(interesse);

  var dataInteresse = {};

  years.forEach(function(year){
    var superTempArray = [];
    superKeys.forEach(function(superKey){
      var tempArray = [];
      keys = Object.keys(interesse[superKey][year]);
      var uberArray = [];
      keys.forEach(function(key){
        uberArray.push({"name": key, "value": interesse[superKey][year][key]});
      });
      tempArray = {"name": "interesse", "children": uberArray};
      superTempArray.push({"name": superKey, "children": [tempArray]});
    });
    dataInteresse[year] = {"name": year, "children": superTempArray}
  });

  var participatie = (bigDatty[4]["participatie"]);

  for(var i = 0; i < participatie.length; i ++){
    delete(participatie[i].ID);
    delete(participatie[i].Migratieachtergrond);
    delete(participatie[i].Periode);
    participatie[i].RadioTelevisieOfKrantIngeschakeld =
      Number(participatie[i].RadioTelevisieOfKrantIngeschakeld);
    participatie[i].PolitiekeOrganisatieIngeschakeld =
      Number(participatie[i].PolitiekeOrganisatieIngeschakeld);
    participatie[i].MeegedaanAanBijeenkomstOverheid =
      Number(participatie[i].MeegedaanAanBijeenkomstOverheid);
    participatie[i].ContactOpgenomenMetPoliticus =
      Number(participatie[i].ContactOpgenomenMetPoliticus);
    participatie[i].MeegedaanAanActiegroep =
      Number(participatie[i].MeegedaanAanActiegroep);
    participatie[i].MeegedaanAanProtestactie =
      Number(participatie[i].MeegedaanAanProtestactie);
    participatie[i].MeegedaanAanHandtekeningenactie =
      Number(participatie[i].MeegedaanAanHandtekeningenactie);
    participatie[i].MeegedaanPolitiekeActieViaInternet =
      Number(participatie[i].MeegedaanPolitiekeActieViaInternet);
    participatie[i].Anders = Number(participatie[i].Anders);
  };

  var participatieVars = Object.keys(participatie[0]);

  var totaal = {};
  for(var i = 0; i < years.length; i ++){
    totaal[years[i]] = {};
    for(var j = 0; j < participatieVars.length; j ++){
      totaal[years[i]][Object.keys(participatie[i])[j]] =
        Object.values(participatie[i])[j];
    };
  };

  var nederlands = {};
  for(var i = 0; i < years.length; i ++){
    nederlands[years[i]] = {};
    for(var j = 0; j < participatieVars.length; j ++){
      nederlands[years[i]][Object.keys(participatie[i+6])[j]] =
        Object.values(participatie[i+6])[j];
    };
  };

  var westers = {};
  for(var i = 0; i < years.length; i ++){
    westers[years[i]] = {};
    for(var j = 0; j < participatieVars.length; j ++){
      westers[years[i]][Object.keys(participatie[i+12])[j]] =
        Object.values(participatie[i+12])[j];
    };
  };

  var nietWesters = {};
  for(var i = 0; i < years.length; i ++){
    nietWesters[years[i]] = {};
    for(var j = 0; j < participatieVars.length; j ++){
      nietWesters[years[i]][Object.keys(participatie[i+18])[j]] =
        Object.values(participatie[i+18])[j];
    };
  };

  var participatie = {};
  participatie["totaal"] = totaal;
  participatie["nederlands"] = nederlands;
  participatie["westers"] = westers;
  participatie["nietWesters"] = nietWesters;

  var superKeys = Object.keys(participatie);

  var dataParticipatie = {};

  // pass all data from above to a new dictionary so we get it all in one place
  years.forEach(function(year){
    var superTempArray = [];
    superKeys.forEach(function(superKey){
      var bevolkingArray = [];
      var tempArray = [];
      keys = Object.keys(participatie[superKey][year]);
      var uberArray = [];
      keys.forEach(function(key){
        uberArray.push({"name": key, "value": participatie[superKey][year][key]});
      });
      tempArray = {"name": "participatie", "children": uberArray};
      bevolkingArray.push(tempArray);

      // push all the variabels to the same array: bevolkingArray
      var interesseKeys = Object.keys(interesse[superKey][year]);
      var interesseArray = [];
      interesseKeys.forEach(function(key){
        interesseArray.push({"name": key, "value": interesse[superKey][year][key]});
      });
      tempArray = {"name": "interesse", "children": interesseArray};
      bevolkingArray.push(tempArray);

      var gebruikKeys = Object.keys(gebruik[superKey][year]);
      var gebruikArray = [];
      gebruikKeys.forEach(function(key){
        gebruikArray.push({"name": key, "value": gebruik[superKey][year][key]});
      });
      tempArray = {"name": "internetgebruik", "children": gebruikArray};
      bevolkingArray.push(tempArray);

      var dienstKeys = Object.keys(dienstverlening[superKey][year]);
      var dienstArray = [];
      dienstKeys.forEach(function(key){
        dienstArray.push({"name": key, "value": dienstverlening[superKey][year][key]});
      });
      tempArray = {"name": "dienstverlening", "children": dienstArray};
      bevolkingArray.push(tempArray);

      superTempArray.push({"name": superKey, "children": bevolkingArray});
    })

    // push all to the data to the "participatie" data
    dataParticipatie[year] = {"name": year, "children": superTempArray};
  })

  // and change its name so it makes more sense
  var dendrogramData = dataParticipatie;

  // and divide by population group for searching within dictionary
  var dendroTotaal = {};
  var dendroNederlands = {};
  var dendroWesters = {};
  var dendroNietWesters = {};

  years.forEach(function(year){
    dendroTotaal[year] = (dendrogramData[year].children[0]);
    dendroNederlands[year] = dendrogramData[year].children[1];
    dendroWesters[year] = dendrogramData[year].children[2];
    dendroNietWesters[year] = dendrogramData[year].children[3];
  });

  var restOfTheData = {};
  restOfTheData["totaal"] = dendroTotaal;
  restOfTheData["nederlands"] = dendroNederlands;
  restOfTheData["westers"] = dendroWesters;
  restOfTheData["nietWesters"] = dendroNietWesters;

  // linking variables with strings for better readability for the user
  var graphNames = {};
  graphNames["totaal"] = "Totale gemiddelde";
  graphNames["nederlands"] = "Geen migratieachtergrond";
  graphNames["westers"] = "Westerse migratieachtergrond";
  graphNames["nietWesters"] = "Niet-westerse migratieachtergrond";
  graphNames["participatie"] = "Politieke participatie";
  graphNames["interesse"] = "Politieke interesse";
  graphNames["internetgebruik"] = "Frequentie internetgebruik";
  graphNames["dienstverlening"] =
  "Gedrag dienstverleningswebsites";
  graphNames["RadioTelevisieOfKrantIngeschakeld"] =
  "Radio, televisie of krant ingeschakeld";
  graphNames["PolitiekeOrganisatieIngeschakeld"] =
  "Politieke organisatie ingeschakeld";
  graphNames["MeegedaanAanBijeenkomstOverheid"] =
    "Meegedaan aan bijeenkomst van de overheid";
  graphNames["ContactOpgenomenMetPoliticus"] =
    "Contact opgenomen met politicus";
  graphNames["MeegedaanAanActiegroep"] =
    "Meegedaan aan actiegroep";
  graphNames["MeegedaanAanProtestactie"] =
    "Meegedaan aan protestactie";
  graphNames["MeegedaanAanHandtekeningenactie"] =
    "Meegedaan aan handtekeningenactie";
  graphNames["MeegedaanPolitiekeActieViaInternet"] =
    "Meegedaan met politieke actie via internet";
  graphNames["Anders"] = "Anders";
  graphNames["ZeerGeinteresseerd"] = "Zeer geïnteresseerd";
  graphNames["TamelijkGeinteresseerd"] = "Tamelijk geïnteresseerd";
  graphNames["WeinigGeinteresseerd"] = "Weinig geïnteresseerd";
  graphNames["NietGeinteresseerd"] = "Niet geïnteresseerd";
  graphNames["MinderDan3MaandenGeleden"] = "Minder dan drie maanden geleden";
  graphNames["drieTotTwaalfMaandenGeleden"] =
    "Drie tot twaalf maanden geleden";
  graphNames["MeerDan12MaandenGeleden"] = "Meer dan twaalf maanden geleden";
  graphNames["NooitInternetGebruikt"] = "Nooit internet gebruikt";
  graphNames["BijnaElkeDag"] = "Bijna elke dag";
  graphNames["MinstensEenKeerPerWeek"] = "Minstens een keer per week";
  graphNames["MinderDanEenKeerPerWeek"] = "Minder dan een keer per week";
  graphNames["ZoekenOpWebsitesOverheid"] = "Zoeken op websites overheid";
  graphNames["OfficieleDocumentenDownloadenOverheid"] =
    "Officiële documenten downloaden overheid";
  graphNames["ZoekenOpWebsitesPubliekeSector"] =
    "Zoeken op websites publieke sector";
  graphNames["OfficieleDocumentenDownloadenPubliekeSector"] =
    "Officiële documenten downloaden publieke sector";

  // pass the parsed data, restOfTheData is in tree-hierarchy and the titles
  main(vertrouwen, restOfTheData, graphNames);


};
