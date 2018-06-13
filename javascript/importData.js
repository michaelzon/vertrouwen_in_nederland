function importData(error, response){

  // check if data gets loaded
  if (error) throw error;

  // creating one big array of all my objects
  bigDatty = [];

  for(i = 0; i < 6; i ++){
    bigDatty.push(response[i])
  }

  console.log("bigDatty: ", bigDatty)

  vertrouwen = (bigDatty[0]["vertrouwen"]);

  // for(var i = 0; i < vertrouwen.length; i ++){
  //   vertrouwen[i].ID = Number(vertrouwen[i].ID); // don't forget to store number value in current value
  //   vertrouwen[i].Periode = Number(vertrouwen[i].Periode);
  //   vertrouwen[i].Ambtenaren = Number(vertrouwen[i].Ambtenaren);
  //   vertrouwen[i].EuropeseUnie = Number(vertrouwen[i].EuropeseUnie);
  //   vertrouwen[i].Pers = Number(vertrouwen[i].Pers);
  //   vertrouwen[i].Politie = Number(vertrouwen[i].Politie);
  //   vertrouwen[i].Rechters = Number(vertrouwen[i].Rechters);
  //   vertrouwen[i].TweedeKamer = Number(vertrouwen[i].TweedeKamer);
  //   vertrouwen[i].VertrouwenInAndereMensen = Number(vertrouwen[i].VertrouwenInAndereMensen);
  // };

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

  // console.log('vertrouwen',vertrouwen)
  // console.log('keys',Object.keys(vertrouwen[0]))
  // console.log('values',Object.values(vertrouwen[0]))


  // totaal[years[0]] = {};
  // totaal[years[0]][Object.keys(vertrouwen[0])[0]] = Object.values(vertrouwen[0])[0]
  // totaal[years[0]][Object.keys(vertrouwen[0])[1]] = Object.values(vertrouwen[0])[1]
  // totaal[years[0]][Object.keys(vertrouwen[0])[2]] = Object.values(vertrouwen[0])[2]
  // totaal[years[0]][Object.keys(vertrouwen[0])[3]] = Object.values(vertrouwen[0])[3]
  // totaal[years[0]][Object.keys(vertrouwen[0])[4]] = Object.values(vertrouwen[0])[4]
  // totaal[years[0]][Object.keys(vertrouwen[0])[5]] = Object.values(vertrouwen[0])[5]
  // totaal[years[0]][Object.keys(vertrouwen[0])[6]] = Object.values(vertrouwen[0])[6]
  // totaal[years[0]][Object.keys(vertrouwen[0])[7]] = Object.values(vertrouwen[0])[7]
  //
  // totaal[years[1]] = {};
  // totaal[years[1]][Object.keys(vertrouwen[1])[0]] = Object.values(vertrouwen[1])[0]
  // totaal[years[1]][Object.keys(vertrouwen[1])[1]] = Object.values(vertrouwen[1])[1]
  // totaal[years[1]][Object.keys(vertrouwen[1])[2]] = Object.values(vertrouwen[1])[2]
  // totaal[years[1]][Object.keys(vertrouwen[1])[3]] = Object.values(vertrouwen[1])[3]
  // totaal[years[1]][Object.keys(vertrouwen[1])[4]] = Object.values(vertrouwen[1])[4]
  // totaal[years[1]][Object.keys(vertrouwen[1])[5]] = Object.values(vertrouwen[1])[5]
  // totaal[years[1]][Object.keys(vertrouwen[1])[6]] = Object.values(vertrouwen[1])[6]
  // totaal[years[1]][Object.keys(vertrouwen[1])[7]] = Object.values(vertrouwen[1])[7]
  //
  // totaal[years[5]] = {};
  // totaal[years[5]][Object.keys(vertrouwen[5])[0]] = Object.values(vertrouwen[5])[0]
  // totaal[years[5]][Object.keys(vertrouwen[5])[1]] = Object.values(vertrouwen[5])[1]
  // totaal[years[5]][Object.keys(vertrouwen[5])[2]] = Object.values(vertrouwen[5])[2]
  // totaal[years[5]][Object.keys(vertrouwen[5])[3]] = Object.values(vertrouwen[5])[3]
  // totaal[years[5]][Object.keys(vertrouwen[5])[4]] = Object.values(vertrouwen[5])[4]
  // totaal[years[5]][Object.keys(vertrouwen[5])[5]] = Object.values(vertrouwen[5])[5]
  // totaal[years[5]][Object.keys(vertrouwen[5])[6]] = Object.values(vertrouwen[5])[6]
  // totaal[years[5]][Object.keys(vertrouwen[5])[7]] = Object.values(vertrouwen[5])[7]


  // nietWesters = {};
  // nietWesters[years[5]] = {}; // dit geeft die error
  // nietWesters[years[5]][Object.keys(vertrouwen[23])[0]] = Object.values(vertrouwen[23])[0]
  // nietWesters[years[5]][Object.keys(vertrouwen[23])[1]] = Object.values(vertrouwen[23])[1]
  // nietWesters[years[5]][Object.keys(vertrouwen[23])[2]] = Object.values(vertrouwen[23])[2]
  // nietWesters[years[5]][Object.keys(vertrouwen[23])[3]] = Object.values(vertrouwen[23])[3]
  // nietWesters[years[5]][Object.keys(vertrouwen[23])[4]] = Object.values(vertrouwen[23])[4]
  // nietWesters[years[5]][Object.keys(vertrouwen[23])[5]] = Object.values(vertrouwen[23])[5]
  // nietWesters[years[5]][Object.keys(vertrouwen[23])[6]] = Object.values(vertrouwen[23])[6]
  // nietWesters[years[5]][Object.keys(vertrouwen[23])[7]] = Object.values(vertrouwen[23])[7]

  // for(var i = 0; i < vertrouwen.length; i ++){
  //   for(var j = 0; j < years.length; j ++){
  //     totaal[years[j]] = {};
  //     for(var k = 0; k < 8; k ++){
  //       // console.log('j:', j, 'i:', i, 'k', k)
  //       totaal[years[j]][Object.keys(vertrouwen[i])[k]] = Object.values(vertrouwen[i])[k]
  //     }
  //   }
  // }

  var years = [2012, 2013, 2014, 2015, 2016, 2017];

  var totaal = {};
  for(var i = 0; i < years.length; i ++){
    totaal[years[i]] = {};
    for(var j = 0; j < 8; j ++){
      totaal[years[i]][Object.keys(vertrouwen[i])[j]] = Object.values(vertrouwen[i])[j]
    }
  }

  var nederlands = {};
  for(var i = 0; i < years.length; i ++){
    nederlands[years[i]] = {};
    for(var j = 0; j < 8; j ++){
      nederlands[years[i]][Object.keys(vertrouwen[i+6])[j]] = Object.values(vertrouwen[i+6])[j]
    }
  }

  var westers = {};
  for(var i = 0; i < years.length; i ++){
    westers[years[i]] = {};
    for(var j = 0; j < 8; j ++){
      westers[years[i]][Object.keys(vertrouwen[i+12])[j]] = Object.values(vertrouwen[i+12])[j]
    }
  }

  var nietWesters = {};
  for(var i = 0; i < years.length; i ++){
    nietWesters[years[i]] = {};
    for(var j = 0; j < 8; j ++){
      nietWesters[years[i]][Object.keys(vertrouwen[i+18])[j]] = Object.values(vertrouwen[i+18])[j]
    }
  }

  vertrouwen = {};
  vertrouwen["totaal"] = totaal
  vertrouwen["nederlands"] = nederlands
  vertrouwen["westers"] = westers
  vertrouwen["nietWesters"] = nietWesters

  // console.log('vertrouwendata',vertrouwen)

  // wat je kan doen om niet het aantal variabelen te hardcoden is de variabelen van de desbetreffende dict in een array pushen met objectkeys functie en daar dan de lengte van nemen

  var dienstverlening = (bigDatty[1]["dienstverlening"])

  for(var i = 0; i < dienstverlening.length; i ++){
    dienstverlening[i].ID = Number(dienstverlening[i].ID);
    dienstverlening[i].Periode = Number(dienstverlening[i].Periode);
    dienstverlening[i].ZoekenOpWebsitesOverheid = Number(dienstverlening[i].ZoekenOpWebsitesOverheid);
    dienstverlening[i].OfficieleDocumentenDownloadenOverheid = Number(dienstverlening[i].OfficieleDocumentenDownloadenOverheid);
    dienstverlening[i].ZoekenOpWebsitesPubliekeSector = Number(dienstverlening[i].ZoekenOpWebsitesPubliekeSector);
    dienstverlening[i].OfficieleDocumentenDownloadenPubliekeSector = Number(dienstverlening[i].OfficieleDocumentenDownloadenPubliekeSector);
  }

  var faciliteiten = (bigDatty[2]["faciliteiten"]);

  for(var i = 0; i < faciliteiten.length; i ++){
    faciliteiten[i].ID = Number(faciliteiten[i].ID);
    faciliteiten[i].Periode = Number(faciliteiten[i].Periode);
    faciliteiten[i].ToegangTotInternet = Number(faciliteiten[i].ToegangTotInternet);
    faciliteiten[i].PersonalComputerPCOfDesktop = Number(faciliteiten[i].PersonalComputerPCOfDesktop);
    faciliteiten[i].Tablet = Number(faciliteiten[i].Tablet);
    faciliteiten[i].MobieleTelefoonOfSmartphone = Number(faciliteiten[i].MobieleTelefoonOfSmartphone);
    faciliteiten[i].Spelcomputer = Number(faciliteiten[i].Spelcomputer);
    faciliteiten[i].SmartTVOfTVMetSetTopBox = Number(faciliteiten[i].SmartTVOfTVMetSetTopBox);
    faciliteiten[i].LaptopOfNetbook = Number(faciliteiten[i].LaptopOfNetbook);
  };

  var gebruik = (bigDatty[3]["gebruik"]);

  for(var i = 0; i < gebruik.length; i ++){
    gebruik[i].ID = Number(gebruik[i].ID);
    gebruik[i].Periode = Number(gebruik[i].Periode);
    gebruik[i].MinderDan3MaandenGeleden = Number(gebruik[i].MinderDan3MaandenGeleden);
    gebruik[i].drieTotTwaalfMaandenGeleden = Number(gebruik[i].drieTotTwaalfMaandenGeleden);
    gebruik[i].MeerDan12MaandenGeleden = Number(gebruik[i].MeerDan12MaandenGeleden);
    gebruik[i].NooitInternetGebruikt = Number(gebruik[i].NooitInternetGebruikt);
    gebruik[i].BijnaElkeDag = Number(gebruik[i].BijnaElkeDag);
    gebruik[i].MinstensEenKeerPerWeek = Number(gebruik[i].MinstensEenKeerPerWeek);
    gebruik[i].MinderDanEenKeerPerWeek = Number(gebruik[i].MinderDanEenKeerPerWeek);
  };

  var interesse = (bigDatty[4]["interesse"]);

  for(var i = 0; i < interesse.length; i ++){
    interesse[i].ID = Number(interesse[i].ID);
    interesse[i].Periode = Number(interesse[i].Periode);
    interesse[i].ZeerGeinteresseerd = Number(interesse[i].ZeerGeinteresseerd);
    interesse[i].TamelijkGeinteresseerd = Number(interesse[i].TamelijkGeinteresseerd);
    interesse[i].WeinigGeinteresseerd = Number(interesse[i].WeinigGeinteresseerd);
    interesse[i].NietGeinteresseerd = Number(interesse[i].NietGeinteresseerd);
  };

  var participatie = (bigDatty[5]["participatie"]);

  for(var i = 0; i < participatie.length; i ++){
    participatie[i].ID = Number(participatie[i].ID);
    participatie[i].Periode = Number(participatie[i].Periode);
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

  // console.log(vertrouwen)

  makeLinegraphCanvas(vertrouwen)

};
