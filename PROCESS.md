# dag 1 (8/6)

* Gisteravond heb ik mijn datasets wat aangepast: ik neem minder variabelen over het internetgebruik in Nederland. Heb twee extra datasets geimporteert via statline: eentje over politieke interesse en eentje over politieke participatie. Zo sluiten de variabelen van mijn visualisaties beter op elkaar aan.

* Vandaag ga ik beginnen aan de prototype.

* Ik hergebruik mijn bootstrap code van de opdracht Linked Views.

* Er is een werkende navigatiebalk!

* Ik heb twee canvassen aangemaakt voor de drie visualisaties. Ik heb het skelet van de margin convention erbij geimporteert want als iets een struikelblok was en ongelooflijk irritant dan was het padden van visualisaties. Nu zie ik precies waar ik "ben" op mijn website.

![](photo/image_3.jpg)

![](photo/image_4.jpg)

* Ik ga nu beginnen aan mijn json data inladen. Om weer even te weten hoe dit ook alweer moest ben ik een tutorial op youtube gaan kijken: https://www.youtube.com/watch?v=duGyc25m9YI&t=415s

# dag 2 (10/6)

* Thuis even werken aan het klaar zetten van mijn data.

# dag 3 (11/6)

* Ga beginnen aan mijn linegraph.

* Was vandaag lang bezig aan mijn linegraph. Heel lang zitten klooien met mijn 'path' want hij kreeg de hele tijd geen data binnen. Uiteindelijk was de oplossing mijn scalefuncties: was vergeten data mee tegeven aan mijn domain. .domain(d3.extent(vertrouwen, function(d) { return d.Periode; })) was eerst .domain(d3.extent(function(d) { return d.Periode; }))

# dag 4 (12/6)

* Ga mijn linegraph verbeteren, hij is nu nog heel ruw:

![](photo/image_5.jpg)

* Zoals je ziet zijn de lijnen allemaal met elkaar verbonden. Dit zijn nu alle values van vertrouwen in alle mensen van alle bevolkingsgroepen. Ik ga nu proberen 1 lijn te trekken voor migratieachtergrond: totaal. Dan verder met de andere variabelen die in deze linegraph moeten.

* Ik heb ondervonden dat mijn json data structuur niet optimaal is. Ik kan zoals ie nu is niet selecteren op migratieachtergrond. Ik ga hem nu eenpassen zodat na een jsonkey bijvoorbeeld "{vertrouwen":[{ alle variabelen}, ik "{vertrouwen": [{"Westers": [{ 2012 {alle variabelen}"" krijg.

* Ben vandaag tot zover gekomen:

![](photo/image_6.jpg)

* Morgen ga ik hier een forloop voor maken en dan kan ik het toepassen op mijn andere jsons, en dan kan ik hopelijk door met mijn visualisaties.

# dag 5 (13/6)

* Eindelijk klaar met reconstructie van mijn data 'vertrouwen'. Nu linegraphtime.

* HEEL lang zitten klooien met mijn linegraph, uiteindelijk na heel veel trail and error heb ik een lijn gekregen voor vertrouwen in andere mensen van het totaal onder de bevolkingsgroepen. Key finding was dat ik mijn xScale functie verkeerd had geschreven. De extent functie voor de jaren stond tussen blokhaken. Ik heb nu in mijn path functie nu data.([array van jaren]). Ik snap eigenlijk alleen nog niet zo goed waarom dit hier moet. Ik weet dat het alleen een array accepteert maar dat zou toch ook anders kunnen. Verder had ik de i geimplimenteerd in de anonieme functie van .y in line functie: y((d,i) => yScale(mensenTot[i])). Hierdoor liepen de values parralel met de jaren. Ik heb alleen mijn array van percentages via een hele specifieke for loop gekregen. Dit is onrealistisch als je kijkt naar hoe groot mijn dataset is dus moet hier denk ik een functie voor schrijven zodat het met elke variabele gedaan kan worden.

* Data structuur is helemaal mooi en af. Je kan nu van alle jsons alles bereiken met 'naamdataset'.'bevolkingsgroep'.'jaar'


# dag 6 (14/6)

* Deze 
