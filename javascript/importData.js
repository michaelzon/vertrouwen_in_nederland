function importData(error, response){

  // check if data gets loaded
  if (error) throw error;

  // creating one big array of all my objects
  bigDatty = [];

  for(i = 0; i < 6; i ++){
    bigDatty.push(response[i])
  }

  console.log("bigDattaaay", bigDatty)

  var vertrouwen = (bigDatty[0]["vertrouwen"]);

  for(var i = 0; i < vertrouwen.length; i ++){
    vertrouwen[i].ID = Number(vertrouwen[i].ID); // don't forget to store number value in current value
    vertrouwen[i].Periode = Number(vertrouwen[i].Periode);
    vertrouwen[i].Ambtenaren = Number(vertrouwen[i].Ambtenaren);
    vertrouwen[i].EuropeseUnie = Number(vertrouwen[i].EuropeseUnie);
    vertrouwen[i].Pers = Number(vertrouwen[i].Pers);
    vertrouwen[i].Politie = Number(vertrouwen[i].Politie);
    vertrouwen[i].Rechters = Number(vertrouwen[i].Rechters);
    vertrouwen[i].TweedeKamer = Number(vertrouwen[i].TweedeKamer);
    vertrouwen[i].VertrouwenInAndereMensen = Number(vertrouwen[i].VertrouwenInAndereMensen);
  };

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

  function(d) {return d}

  // makeLinegraphCanvas(vertrouwen)

};
