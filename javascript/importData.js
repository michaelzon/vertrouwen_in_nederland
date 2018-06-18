var dendroData = {};

function importData(error, response){

  // check if data gets loaded
  if (error) throw error;

  // creating one big array of all my objects
  var bigDatty = [];

  for(i = 0; i < 6; i ++){
    bigDatty.push(response[i])
  }

  // console.log("bigDatty: ", bigDatty)

  var years = [2012, 2013, 2014, 2015, 2016, 2017];

  var vertrouwen = (bigDatty[0]["vertrouwen"]);

  for(var i = 0; i < vertrouwen.length; i ++){
    delete(vertrouwen[i].ID)
    delete(vertrouwen[i].Migratieachtergrond)
    vertrouwen[i].Periode = Number(vertrouwen[i].Periode);
    vertrouwen[i].Ambtenaren = Number(vertrouwen[i].Ambtenaren);
    vertrouwen[i].EuropeseUnie = Number(vertrouwen[i].EuropeseUnie);
    vertrouwen[i].Pers = Number(vertrouwen[i].Pers);
    vertrouwen[i].Politie = Number(vertrouwen[i].Politie);
    vertrouwen[i].Rechters = Number(vertrouwen[i].Rechters);
    vertrouwen[i].TweedeKamer = Number(vertrouwen[i].TweedeKamer);
    vertrouwen[i].VertrouwenInAndereMensen = Number(vertrouwen[i].VertrouwenInAndereMensen);
  };

  // create an array with all variables from vertrouwen dataset
  var vertrouwenVars = Object.keys(vertrouwen[0])

  var totaal = {};
  for(var i = 0; i < years.length; i ++){
    totaal[years[i]] = {};
    for(var j = 0; j < vertrouwenVars.length; j ++){
      totaal[years[i]][Object.keys(vertrouwen[i])[j]] = Object.values(vertrouwen[i])[j]
    }
  }

  var nederlands = {};
  for(var i = 0; i < years.length; i ++){
    nederlands[years[i]] = {};
    for(var j = 0; j < vertrouwenVars.length; j ++){
      nederlands[years[i]][Object.keys(vertrouwen[i+6])[j]] = Object.values(vertrouwen[i+6])[j]
    }
  }

  var westers = {};
  for(var i = 0; i < years.length; i ++){
    westers[years[i]] = {};
    for(var j = 0; j < vertrouwenVars.length; j ++){
      westers[years[i]][Object.keys(vertrouwen[i+12])[j]] = Object.values(vertrouwen[i+12])[j]
    }
  }

  var nietWesters = {};
  for(var i = 0; i < years.length; i ++){
    nietWesters[years[i]] = {};
    for(var j = 0; j < vertrouwenVars.length; j ++){
      nietWesters[years[i]][Object.keys(vertrouwen[i+18])[j]] = Object.values(vertrouwen[i+18])[j]
    }
  }

  vertrouwen = {};
  vertrouwen["totaal"] = totaal
  vertrouwen["nederlands"] = nederlands
  vertrouwen["westers"] = westers
  vertrouwen["nietWesters"] = nietWesters

  // wat je kan doen om niet het aantal variabelen te hardcoden is de variabelen van de desbetreffende dict in een array pushen met objectkeys functie en daar dan de lengte van nemen

  var dienstverlening = (bigDatty[1]["dienstverlening"])

  for(var i = 0; i < dienstverlening.length; i ++){
    delete(dienstverlening[i].ID)
    delete(dienstverlening[i].Migratieachtergrond)
    delete(dienstverlening[i].Periode)
    // dienstverlening[i].Periode = Number(dienstverlening[i].Periode);
    dienstverlening[i].ZoekenOpWebsitesOverheid = Number(dienstverlening[i].ZoekenOpWebsitesOverheid);
    dienstverlening[i].OfficieleDocumentenDownloadenOverheid = Number(dienstverlening[i].OfficieleDocumentenDownloadenOverheid);
    dienstverlening[i].ZoekenOpWebsitesPubliekeSector = Number(dienstverlening[i].ZoekenOpWebsitesPubliekeSector);
    dienstverlening[i].OfficieleDocumentenDownloadenPubliekeSector = Number(dienstverlening[i].OfficieleDocumentenDownloadenPubliekeSector);
  }

  var dienstverleningVars = Object.keys(dienstverlening[0])

  var totaal = {};
  for(var i = 0; i < years.length; i ++){
    totaal[years[i]] = {};
    for(var j = 0; j < dienstverleningVars.length; j ++){
      totaal[years[i]][Object.keys(dienstverlening[i])[j]] = Object.values(dienstverlening[i])[j]
    }
  }

  var nederlands = {};
  for(var i = 0; i < years.length; i ++){
    nederlands[years[i]] = {};
    for(var j = 0; j < dienstverleningVars.length; j ++){
      nederlands[years[i]][Object.keys(dienstverlening[i+6])[j]] = Object.values(dienstverlening[i+6])[j]
    }
  }

  var westers = {};
  for(var i = 0; i < years.length; i ++){
    westers[years[i]] = {};
    for(var j = 0; j < dienstverleningVars.length; j ++){
      westers[years[i]][Object.keys(dienstverlening[i+12])[j]] = Object.values(dienstverlening[i+12])[j]
    }
  }

  var nietWesters = {};
  for(var i = 0; i < years.length; i ++){
    nietWesters[years[i]] = {};
    for(var j = 0; j < dienstverleningVars.length; j ++){
      nietWesters[years[i]][Object.keys(dienstverlening[i+18])[j]] = Object.values(dienstverlening[i+18])[j]
    }
  }

  var dienstverlening = {};
  dienstverlening["totaal"] = totaal
  dienstverlening["nederlands"] = nederlands
  dienstverlening["westers"] = westers
  dienstverlening["nietWesters"] = nietWesters

  console.log(nietWesters);

  var superKeys = Object.keys(dienstverlening);

  var dendroData = {};



// superKeys.forEach(function(superKey){
//
//   var superTempObject = {};
//
//   years.forEach(function(year){
//     keys = Object.keys(nietWesters[year]);
//     tempArray = [];
//     keys.forEach(function(key) {
//       tempObject = {};
//       tempObject["name"] = key;
//       console.log(nietWesters[year][key])
//       tempObject["value"] = nietWesters[year][key];
//       tempArray.push(tempObject);
//     })
//     superTempArray.push({"name": superKey, "children": tempArray})
//   })
//   superTempObject["name"] = year;
//   superTempObject["children"] = superTempArray;
//   dendroData[year] = superTempObject;
// })

var dendroData = {};

years.forEach(function(year){
  var superTempArray = [];
  superKeys.forEach(function(superKey){
    var tempArray = [];
    console.log(superKey);
    keys = Object.keys(dienstverlening[superKey][year]);
    var uberArray = [];
    keys.forEach(function(key){
      console.log(key)
      uberArray.push({"name": key, "value": dienstverlening[superKey][year][key]})
    })
    tempArray = {"name": "dienstverlening", "children": uberArray};
    superTempArray.push({"name": superKey, "children": [tempArray]});
  })
  dendroData[year] = {"name": year, "children": superTempArray}
})



  console.log(d3.hierarchy(dendroData["2012"]));
  console.log(dendroData);

  var faciliteiten = (bigDatty[2]["faciliteiten"]);

  for(var i = 0; i < faciliteiten.length; i ++){
    delete(faciliteiten[i].ID)
    delete(faciliteiten[i].Migratieachtergrond)
    faciliteiten[i].Periode = Number(faciliteiten[i].Periode);
    faciliteiten[i].ToegangTotInternet = Number(faciliteiten[i].ToegangTotInternet);
    faciliteiten[i].PersonalComputerPCOfDesktop = Number(faciliteiten[i].PersonalComputerPCOfDesktop);
    faciliteiten[i].Tablet = Number(faciliteiten[i].Tablet);
    faciliteiten[i].MobieleTelefoonOfSmartphone = Number(faciliteiten[i].MobieleTelefoonOfSmartphone);
    faciliteiten[i].Spelcomputer = Number(faciliteiten[i].Spelcomputer);
    faciliteiten[i].SmartTVOfTVMetSetTopBox = Number(faciliteiten[i].SmartTVOfTVMetSetTopBox);
    faciliteiten[i].LaptopOfNetbook = Number(faciliteiten[i].LaptopOfNetbook);
  };

  var faciliteitenVars = Object.keys(faciliteiten[0])

  var totaal = {};
  for(var i = 0; i < years.length; i ++){
    totaal[years[i]] = {};
    for(var j = 0; j < faciliteitenVars.length; j ++){
      totaal[years[i]][Object.keys(faciliteiten[i])[j]] = Object.values(faciliteiten[i])[j]
    }
  }

  var nederlands = {};
  for(var i = 0; i < years.length; i ++){
    nederlands[years[i]] = {};
    for(var j = 0; j < faciliteitenVars.length; j ++){
      nederlands[years[i]][Object.keys(faciliteiten[i+6])[j]] = Object.values(faciliteiten[i+6])[j]
    }
  }

  var westers = {};
  for(var i = 0; i < years.length; i ++){
    westers[years[i]] = {};
    for(var j = 0; j < faciliteitenVars.length; j ++){
      westers[years[i]][Object.keys(faciliteiten[i+12])[j]] = Object.values(faciliteiten[i+12])[j]
    }
  }

  var nietWesters = {};
  for(var i = 0; i < years.length; i ++){
    nietWesters[years[i]] = {};
    for(var j = 0; j < faciliteitenVars.length; j ++){
      nietWesters[years[i]][Object.keys(faciliteiten[i+18])[j]] = Object.values(faciliteiten[i+18])[j]
    }
  }

  var faciliteiten = {};
  faciliteiten["totaal"] = totaal
  faciliteiten["nederlands"] = nederlands
  faciliteiten["westers"] = westers
  faciliteiten["nietWesters"] = nietWesters

  var gebruik = (bigDatty[3]["gebruik"]);

  for(var i = 0; i < gebruik.length; i ++){
    delete(gebruik[i].ID)
    delete(gebruik[i].Migratieachtergrond)
    delete(gebruik[i].Periode)
    // gebruik[i].Periode = Number(gebruik[i].Periode);
    gebruik[i].MinderDan3MaandenGeleden = Number(gebruik[i].MinderDan3MaandenGeleden);
    gebruik[i].drieTotTwaalfMaandenGeleden = Number(gebruik[i].drieTotTwaalfMaandenGeleden);
    gebruik[i].MeerDan12MaandenGeleden = Number(gebruik[i].MeerDan12MaandenGeleden);
    gebruik[i].NooitInternetGebruikt = Number(gebruik[i].NooitInternetGebruikt);
    gebruik[i].BijnaElkeDag = Number(gebruik[i].BijnaElkeDag);
    gebruik[i].MinstensEenKeerPerWeek = Number(gebruik[i].MinstensEenKeerPerWeek);
    gebruik[i].MinderDanEenKeerPerWeek = Number(gebruik[i].MinderDanEenKeerPerWeek);
  };

  var gebruikVars = Object.keys(gebruik[0])

  var totaal = {};
  for(var i = 0; i < years.length; i ++){
    totaal[years[i]] = {};
    for(var j = 0; j < gebruikVars.length; j ++){
      totaal[years[i]][Object.keys(gebruik[i])[j]] = Object.values(gebruik[i])[j]
    }
  }

  var nederlands = {};
  for(var i = 0; i < years.length; i ++){
    nederlands[years[i]] = {};
    for(var j = 0; j < gebruikVars.length; j ++){
      nederlands[years[i]][Object.keys(gebruik[i+6])[j]] = Object.values(gebruik[i+6])[j]
    }
  }

  var westers = {};
  for(var i = 0; i < years.length; i ++){
    westers[years[i]] = {};
    for(var j = 0; j < gebruikVars.length; j ++){
      westers[years[i]][Object.keys(gebruik[i+12])[j]] = Object.values(gebruik[i+12])[j]
    }
  }

  var nietWesters = {};
  for(var i = 0; i < years.length; i ++){
    nietWesters[years[i]] = {};
    for(var j = 0; j < gebruikVars.length; j ++){
      nietWesters[years[i]][Object.keys(gebruik[i+18])[j]] = Object.values(gebruik[i+18])[j]
    }
  }

  var gebruik = {};
  gebruik["totaal"] = totaal
  gebruik["nederlands"] = nederlands
  gebruik["westers"] = westers
  gebruik["nietWesters"] = nietWesters


  var interesse = (bigDatty[4]["interesse"]);

  for(var i = 0; i < interesse.length; i ++){
    delete(interesse[i].ID)
    delete(interesse[i].Migratieachtergrond)
    delete(interesse[i].Periode)
    // interesse[i].Periode = Number(interesse[i].Periode);
    interesse[i].ZeerGeinteresseerd = Number(interesse[i].ZeerGeinteresseerd);
    interesse[i].TamelijkGeinteresseerd = Number(interesse[i].TamelijkGeinteresseerd);
    interesse[i].WeinigGeinteresseerd = Number(interesse[i].WeinigGeinteresseerd);
    interesse[i].NietGeinteresseerd = Number(interesse[i].NietGeinteresseerd);
  };


  var interesseVars = Object.keys(interesse[0])

  var totaal = {};
  for(var i = 0; i < years.length; i ++){
    totaal[years[i]] = {};
    for(var j = 0; j < interesseVars.length; j ++){
      totaal[years[i]][Object.keys(interesse[i])[j]] = Object.values(interesse[i])[j]
    }
  }

  var nederlands = {};
  for(var i = 0; i < years.length; i ++){
    nederlands[years[i]] = {};
    for(var j = 0; j < interesseVars.length; j ++){
      nederlands[years[i]][Object.keys(interesse[i+6])[j]] = Object.values(interesse[i+6])[j]
    }
  }

  var westers = {};
  for(var i = 0; i < years.length; i ++){
    westers[years[i]] = {};
    for(var j = 0; j < interesseVars.length; j ++){
      westers[years[i]][Object.keys(interesse[i+12])[j]] = Object.values(interesse[i+12])[j]
    }
  }

  var nietWesters = {};
  for(var i = 0; i < years.length; i ++){
    nietWesters[years[i]] = {};
    for(var j = 0; j < interesseVars.length; j ++){
      nietWesters[years[i]][Object.keys(interesse[i+18])[j]] = Object.values(interesse[i+18])[j]
    }
  }

  var interesse = {};
  interesse["totaal"] = totaal
  interesse["nederlands"] = nederlands
  interesse["westers"] = westers
  interesse["nietWesters"] = nietWesters

  var participatie = (bigDatty[5]["participatie"]);

  for(var i = 0; i < participatie.length; i ++){
    delete(participatie[i].ID)
    delete(participatie[i].Migratieachtergrond)
    delete(participatie[i].Periode)
    // participatie[i].Periode = Number(participatie[i].Periode);
    participatie[i].RadioTelevisieOfKrantIngeschakeld = Number(participatie[i].RadioTelevisieOfKrantIngeschakeld);
    participatie[i].PolitiekeOrganisatieIngeschakeld = Number(participatie[i].PolitiekeOrganisatieIngeschakeld);
    participatie[i].MeegedaanAanBijeenkomstOverheid = Number(participatie[i].MeegedaanAanBijeenkomstOverheid);
    participatie[i].ContactOpgenomenMetPoliticus = Number(participatie[i].ContactOpgenomenMetPoliticus);
    participatie[i].MeegedaanAanActiegroep = Number(participatie[i].MeegedaanAanActiegroep);
    participatie[i].MeegedaanAanProtestactie = Number(participatie[i].MeegedaanAanProtestactie);
    participatie[i].MeegedaanAanHandtekeningenactie = Number(participatie[i].MeegedaanAanHandtekeningenactie);
    participatie[i].MeegedaanPolitiekeActieViaInternet = Number(participatie[i].MeegedaanPolitiekeActieViaInternet);
    participatie[i].Anders = Number(participatie[i].Anders);
  };

  // console.log('par', participatie[0].Migratieachtergrond)

  var parData = d3.nest()
      .key(d => participatie[0].Migratieachtergrond)
      .entries(participatie)

  // console.log('pardata',parData)


  // var nest = d3.nest()
  //     .key(function(d){return d.dienstverlening[2012].Migratieachtergrond})
  //     .entries(nl);

  var participatieVars = Object.keys(participatie[0])

  var totaal = {};
  for(var i = 0; i < years.length; i ++){
    totaal[years[i]] = {};
    for(var j = 0; j < participatieVars.length; j ++){
      totaal[years[i]][Object.keys(participatie[i])[j]] = Object.values(participatie[i])[j]
    }
  }

  // console.log('tot',totaal)

  var nederlands = {};
  for(var i = 0; i < years.length; i ++){
    nederlands[years[i]] = {};
    for(var j = 0; j < participatieVars.length; j ++){
      nederlands[years[i]][Object.keys(participatie[i+6])[j]] = Object.values(participatie[i+6])[j]
    }
  }

  var westers = {};
  for(var i = 0; i < years.length; i ++){
    westers[years[i]] = {};
    for(var j = 0; j < participatieVars.length; j ++){
      westers[years[i]][Object.keys(participatie[i+12])[j]] = Object.values(participatie[i+12])[j]
    }
  }

  var nietWesters = {};
  for(var i = 0; i < years.length; i ++){
    nietWesters[years[i]] = {};
    for(var j = 0; j < participatieVars.length; j ++){
      nietWesters[years[i]][Object.keys(participatie[i+18])[j]] = Object.values(participatie[i+18])[j]
    }
  }

  var participatie = {};
  participatie["totaal"] = totaal;
  participatie["nederlands"] = nederlands;
  participatie["westers"] = westers;
  participatie["nietWesters"] = nietWesters;

  // console.log('vertrouwen', vertrouwen)
  // console.log('dienstverlening', dienstverlening)
  // console.log('faciliteiten', faciliteiten)
  // console.log('gebruik', gebruik)
  // console.log('interesse', interesse)
  // console.log('participatie', participatie)

  // bigMomma = [];
  // bigMomma.push(gebruik)
  // bigMomma.push(dienstverlening)
  // bigMomma.push(participatie)
  // bigMomma.push(interesse)
  // console.log('mom', bigMomma)

  var dendroData = {};
  dendroData["internetgebruik"] = gebruik;
  dendroData["dienstverlening"] = dienstverlening;
  dendroData["participatie"] = participatie;
  dendroData["interesse"] = interesse;

  // console.log('dendro',dendroData)


  // dendroData.push(gebruik)
  // dendroData.push(dienstverlening)
  // dendroData.push(participatie)
  // dendroData.push(interesse)

  // var alles = (d,i => dendroData[i].nederlands);
  // console.log(alles)

  // for(var i = 0; i < )

  // var dataTotaal = {}
  // dataTotaal["internetgebruik"] = dendroData.internetgebruik.totaal;
  // dataTotaal["dienstverlening"] = dendroData.dienstverlening.totaal;
  // dataTotaal["participatie"] = dendroData.participatie.totaal;
  // dataTotaal["interesse"] = dendroData.interesse.totaal;
  //
  // var totaal = [];
  // totaal.push(dataTotaal)
  //
  // var nestTotaal = d3.nest()
  //     .key(function(d){return d.dienstverlening[2012].Migratieachtergrond})
  //     .entries(totaal);
  // console.log(nestTotaal)

  makeLinegraph(vertrouwen.nederlands)
  updateLines(vertrouwen)
  makeDendrogramCanvas(dendroData)

};
