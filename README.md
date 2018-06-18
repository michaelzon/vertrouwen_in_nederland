# Project
[My site!](https://michaelzon.github.io/vertrouwen_in_nederland/)

## Probleemstelling

Sinds het touwtje uit de brievenbus van Jan Terlouw die een emotionele toespraak hield over het verloren vertrouwen onder de mens, bekommert men zich of het vertrouwen in elkaar inderdaad verloren is gegaan. Brexit, het afschaffen van de dividendbelasting, de overwinning van Trump, zijn mogelijke oorzaken op de verloren vertrouwen kwestie. Men verzameld over dit soort zaken informatie via mediakanalen op het internet. Het doel is ook om te ontdekken of er een correlatie is tussen vertrouwen en media/internet consumptie, en of dit verschilt tussen Nederlandse bevolkingsgroepen.

## Oplossing

Vertrouwen in (overheid)instanties en de pers wordt gevisualiseerd in een linegraph.

Activiteiten die bevolkingsgroepen ondergaan op internet wordt weerspiegeld aan de hand van een Dendrogram + grouped horizontal barchart.

Via de labels (op de horizontale as) van de linegraph kan worden gekozen welk jaar de data in de grouped horizontal barchart wordt weergeven.

Boven de knoppen van de Dendrogram verschijnt een tipbox met totale waarde van een variabele van een specifieke bevolkingsgroep.

Via een dropdown menu kan worden gekozen welke bevolkingsgroep (Migratieachtergrond: Nederlands/ Westers / Niet-Westers) er wordt weergeven in de Dendrogram.

Al het bovenstaande behoort tot de MVP. Een optionele vierde (1e visualisatie: linegraph, 2e visualisatie: Dendrogram, 3e visualisatie: horizontal grouped barchart) is een verticale barchart waar de gebruiker per variabele uit de horizontale grouped barchart de waarde van die variabele kan zien per bevolkingsgroep.

## Voorwaarden

**Lijst van Databronnen:**

https://opendata.cbs.nl/statline/#/CBS/nl/

Vertrouwen tabel: https://opendata.cbs.nl/statline/#/CBS/nl/dataset/82378NED/table?ts=1528124155885

Internet: toegang, gebruik en faciliteiten tabel:
https://opendata.cbs.nl/statline/#/CBS/nl/dataset/83429NED/table?ts=1528118836615

Ik ga de data op zo'n wijze transformeren dat ik de juiste variabelen aan klik, daar vervolgens de json bestand van download en die vervolgens laat inladen. Het is mogelijk om bestanden in json format te downloaden binnen Statline.

**Externe Componenten:**

colorbrewer.min.js
d3-legend.js
d3.tip.js
d3.v4.js

**Vergelijkbare Visualisaties:**

https://bl.ocks.org/dahis39/f28369f0b17b456ac2f1fa9b937c5002

Hier is het iets duidelijker wat ik precies ga doen: ik koppel de grouped horizontal barchart aan de uiteindes van de Dendrogram, wat de variabelen zijn. Ik doe het op deze manier omdat de waarden van mijn variabelen tezamen niet oplopen tot honderd procent. Dat komt omdat er overlap is, men leest op sociale media bijvoorbeeld webblogs maar gebruikt ook hun chatdiensten.

**Het Lastigste Deel:**

Ik hoop dat ik niet in de knoop kom met de update functies omdat ik dat nog wel het lastigste vind van data visualiseren. Daarnaast hoop ik dat mijn variabelen tenzamen wel betekenis geven aan het storytelling gedeelte van mijn website, en dat dit ook voor de gebruiker duidelijk is.


![](photo/image.jpg)
