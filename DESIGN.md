# Design document voor data visualisatie
**Lijst van databronnen**
https://opendata.cbs.nl/statline/#/CBS/nl/

Vertrouwen tabel: https://opendata.cbs.nl/statline/#/CBS/nl/dataset/82378NED/table?ts=1528124155885

Internet: toegang, gebruik en faciliteiten tabel:
https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83429NED/table?ts=1528118836615

Alle data is afkomstig van Statline. Op deze website staat alle open data van het CBS.
Op statline heb je als gebruiker de mogelijkheid om data te bestanden te downloaden in json-format.
Deze optie zal ik dan ook gebruiken om het vervolgens in te laden in mijn website.
Een nadeel is dat Statline hun gebruikers maximaal twintig variabelen laat kiezen bij één bestand. Dus ik zal het in csv bestand moeten downloaden en dan zelf schrijven naar een json format óf een API request moeten gebruiken. Ik denk dat ik voor het eerste ga omdat er anders veel tijd verloren gaat bij het laden van de webpagina.
In vorige opdrachten ben ik ietwat onhandig omgegaan met het verwerken van mijn data. Ik pushte uiteindelijk veel waarden naar een lijst vanaf json-format, om het vervolgens variabelen te koppelen
aan specifieke lijsten. Aankomende weken wil ik handiger kunnen worden met de d.[key] syntax, zodat ik
niet per se de hele tijd met lijsten hoef te werken.

**Diagram met componenten**

![](photo/image_2.jpg)


**Beschrijving van de componenten**

Index.html: hier gebeurt het inladen van alle externe bibliotheken plus hoe de website er uit ziet met bootstrap.

Convert2json.py: Converteren van csv-bestand in json format zal een apart python bestand worden. Hier verwerk ik beide bestanden naar json format.

Main.js: strict voor het oproepen van alle functies.

createLinegraph.js deze functie zal worden gebruikt om een Multi-series linechart te tekenen op het canvas.

updateLinegraph.js deze functie update de multiple linegraph wanneer er een bevolkingsgroep wordt aangeklikt in het dropdown menu.

createDendogramBars.js: deze functie zal worden gebruikt om de dendogram te maken en de aangekoppelde grouped horizontal barchart. Ik kies er voor om dit in een functie te schrijven omdat het anders te lastig wordt wat betreft scaling. Het lijkt me lastig om er voor te zorgen dat de correcte bars precies aan het uiteinde van de dendrogram te krijgen.

updateDendogramBars.js: als er een bevolkingsgroep wordt gekozen in de dropdown wordt de dendogramBars geupdated. Tevens wordt deze functie aangroepen wanneer er op een jaar wordt geklikt in de linegraph.

**Lijst van API'S/d3 plugins**

De volgende d3 functies ga ik gebruiken:

d3.json > om data in te laden
data.forEach > om voor elk datapunt X actie uit te voeren

Linegraph:

d3.timeScale > zorgen dat juiste jaartallen correct worden weergeven op x-as.  
d3.scaleLinear > scalen van de waarden op de y-as.  
d3.scaleOrdinal > het kleuren van de lijnen in de chart.  
d3.range d3.domain, d3.min and d3.max > correct plotten van datapunten.  
d3.svg.axis > weergeven van axes.  
d3.svg.line > weergeven van de lijn.  

Dendrogram + grouped horizontal barchart.  
d3.cluster > zet de dendrogram en diens datumpunten op de juiste positie.  
d3.seperation > zorgt voor ruimte tussen nodes in de trie.  
d3.size > bepaald de ruimte voor de trie.  
