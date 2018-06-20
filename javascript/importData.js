  // var dendroData = {};

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

  // console.log(nietWesters);

  var superKeys = Object.keys(dienstverlening);

  var dataDienstverlening = {};

  years.forEach(function(year){
    var superTempArray = [];
    superKeys.forEach(function(superKey){
      var tempArray = [];
      // console.log(superKey);
      keys = Object.keys(dienstverlening[superKey][year]);
      var uberArray = [];
      keys.forEach(function(key){
        // console.log(key)
        uberArray.push({"name": key, "value": dienstverlening[superKey][year][key]})
      })
      tempArray = {"name": "dienstverlening", "children": uberArray};
      superTempArray.push({"name": superKey, "children": [tempArray]});
    })
    dataDienstverlening[year] = {"name": year, "children": superTempArray}
  })


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

  var superKeys = Object.keys(gebruik);

  var dataGebruik = {};

  years.forEach(function(year){
    var superTempArray = [];
    superKeys.forEach(function(superKey){
      var tempArray = [];
      // console.log(superKey);
      keys = Object.keys(gebruik[superKey][year]);
      var uberArray = [];
      keys.forEach(function(key){
        // console.log(key)
        uberArray.push({"name": key, "value": gebruik[superKey][year][key]})
      })
      tempArray = {"name": "internetgebruik", "children": uberArray};
      superTempArray.push({"name": superKey, "children": [tempArray]});
    })
    dataGebruik[year] = {"name": year, "children": superTempArray}
  })



  // console.log('hee',d3.hierarchy(dataGebruik["2012"]));
  // console.log('geb',dataGebruik);

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

  var superKeys = Object.keys(interesse);

  var dataInteresse = {};

  years.forEach(function(year){
    var superTempArray = [];
    superKeys.forEach(function(superKey){
      var tempArray = [];
      // console.log(superKey);
      keys = Object.keys(interesse[superKey][year]);
      var uberArray = [];
      keys.forEach(function(key){
        // console.log(key)
        uberArray.push({"name": key, "value": interesse[superKey][year][key]})
      })
      tempArray = {"name": "interesse", "children": uberArray};
      superTempArray.push({"name": superKey, "children": [tempArray]});
    })
    dataInteresse[year] = {"name": year, "children": superTempArray}
  })

  // console.log('hee',d3.hierarchy(dataInteresse["2012"]));
  // console.log('int',dataInteresse);


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

  // var parData = d3.nest()
  //     .key(d => participatie[0].Migratieachtergrond)
  //     .entries(participatie)

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

  var superKeys = Object.keys(participatie);

  var dataParticipatie = {};

  // thanks Tim
  years.forEach(function(year){
    var superTempArray = [];
    superKeys.forEach(function(superKey){
      var bevolkingArray = [];
      var tempArray = [];
      // console.log(superKey);
      keys = Object.keys(participatie[superKey][year]);
      var uberArray = [];
      keys.forEach(function(key){
        // console.log(key)
        uberArray.push({"name": key, "value": participatie[superKey][year][key]})
      })
      tempArray = {"name": "participatie", "children": uberArray};
      bevolkingArray.push(tempArray);

      // interesse variabelen aan bevolkingArray pushen
      var interesseKeys = Object.keys(interesse[superKey][year]);
      var interesseArray = [];
      interesseKeys.forEach(function(key){
        // console.log(key)
        interesseArray.push({"name": key, "value": interesse[superKey][year][key]})
      })
      tempArray = {"name": "interesse", "children": interesseArray};
      bevolkingArray.push(tempArray);

      // internetgebruik variabelen aan bevolkingArray pushen
      var gebruikKeys = Object.keys(gebruik[superKey][year]);
      var gebruikArray = [];
      gebruikKeys.forEach(function(key){
        // console.log(key)
        gebruikArray.push({"name": key, "value": gebruik[superKey][year][key]})
      })
      tempArray = {"name": "internetgebruik", "children": gebruikArray};
      bevolkingArray.push(tempArray);

      // dienstverlening variables aan bevolkingArray pushen
      var dienstKeys = Object.keys(dienstverlening[superKey][year]);
      var dienstArray = [];
      dienstKeys.forEach(function(key){
        // console.log(key)
        dienstArray.push({"name": key, "value": dienstverlening[superKey][year][key]})
      })
      tempArray = {"name": "dienstverlening", "children": dienstArray};
      bevolkingArray.push(tempArray);

      superTempArray.push({"name": superKey, "children": bevolkingArray});
    })
    dataParticipatie[year] = {"name": year, "children": superTempArray}
  })


  var dendrogramData = dataParticipatie;
  var dendrotot = {};
  years.forEach(function(year){
    console.log(dendrogramData[year].children[0])
    dendrotot[year] = (dendrogramData[year].children[0])
  })
  console.log(dendrotot);
  var dendroTotaal = dendrogramData["2012"].children[0];
  var dendroNederlands = dendrogramData["2012"].children[1];
  var dendroWesters = dendrogramData["2012"].children[2];
  var dendroNietWesters = dendrogramData["2012"].children[3];

  console.log(dendroTotaal)
  // console.log(dendroNederlands)
  // console.log(dendroWesters)
  // console.log(dendroNietWesters)

  var dendroData = {};
  dendroData["totaal"] = dendroTotaal;
  dendroData["nederlands"] = dendroNederlands;
  dendroData["westers"] = dendroWesters;
  dendroData["nietWesters"] = dendroNietWesters;

  // console.log(dendroData)

  // years.forEach(function(year){
  //
  //   dataParticipatie[year] = {"name": year, "children": superTempArray}
  //
  // })

  // console.log(dendrogramData["2012"])

  makeLinegraph(vertrouwen.nederlands)
  updateLines(vertrouwen)
  makeDendrogram(dataParticipatie["2012"].children[0])

  // console.log('hee',d3.hierarchy(dataParticipatie["2012"]));

  // het totaal van 2012
  // console.log("dataGebruik", dataGebruik['2012'].children[0])

  // console.log("dataDienstverlening", dataDienstverlening)
  // console.log("dataParticipatie", dataParticipatie)
  // console.log("dataInteresse", dataInteresse)

  // this[0].name

  // var groups = ["totaal", "nederlands", "westers", "nietWesters"];
  //
  // var children = ["gebruik", "dienstverlening", "participatie", "interesse"];

  // years.forEach(function(year){
  //   groups.forEach(function(group){
  //       // console.log(child)
  //       // console.log('sdfsdfs',dataGebruik[year]["name"])
  //     console.log('ksdfaewk',dataGebruik[year].children)
  //     dataGebruik[year]["children"][group].push(dataDienstverlening[year]["children"][group])
  //   })
  // });

  //

  // console.log('vertrouwen', vertrouwen)
  // console.log('dienstverlening', dienstverlening)
  // console.log('faciliteiten', faciliteiten)
  // console.log('gebruik', gebruik)
  // console.log('interesse', interesse)
  // console.log('participatie', participatie)

  // niet verwijderen, dit was mijn struct voordat tim ging helpen
  // var dendroData = {};
  // dendroData["internetgebruik"] = gebruik;
  // dendroData["dienstverlening"] = dienstverlening;
  // dendroData["participatie"] = participatie;
  // dendroData["interesse"] = interesse;

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


};
