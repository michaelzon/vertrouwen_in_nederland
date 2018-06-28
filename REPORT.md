### REPORT

Het doel is om de gebruiker te laten ontdekken waar de verschillen liggen tussen nederlanders met verschillende migratie-achtergronden jegens vertrouwen in overheid, publieke organisaties, elkaar en met een beter overkoepelende term: de politiek. Verder kan worden geëxploreerd welke variabelen hier mogelijk een effect op hebben.

![](docs/image_25.jpg)

## Technisch ontwerp:

In de onload functie worden alle json bestanden die geschreven zijn via Convert2Json.py doorgestuurd naar importData Hier wordt de data geparsed in het juiste format. Voor de overkoepelende variabelen van de dendrogram was het extra lastig want deze hadden een hele specifieke hiërarchische structuur nodig.  Deze dictionaries worden doorgestuurd naar de main functie in vertrouwen en restOfTheData (respectievelijk voor de lijngrafiek en de dendrogram+barchart) plus nog een dictionary met de variabelnamen voor op de webpagina.

In de main functie worden vervolgens alle drie de functies opgeroepen die nodig zijn om de visualisaties te laten zien en te kunnen laten updaten. De variabelen in de parameters van de functies van makeLinegraph, makeDendrogram, updateGraphs zijn vrijwel gelijk aan elkaar omdat ik globale variabelen wou vermijden. Tevens omdat binnen deze functies opnieuw: 1) een makeLinegraph wordt aangeroepen en 2) een makeDendrogram functie wordt aangeroepen. SVG’s worden namelijk verwijderd en opnieuw getekend met de juiste waarden op basis van selectie door de gebruiker. Zo vind de selectie van de bevolkingsgroep plaats in update.js.

In update.js staat de functie updateGraphs waar de bevolkingsgroep meegegeven wordt aan de visualisatiefuncties aan de hand van een handle event functie. Binnen de handle event wordt dus zowel makeLinegraph als makeDendrogram aangeroepen.

In makeLinegraph wordt de lijngrafiek gemaakt. Het is nodig om binnen de parameters ook de data van de dendrogram door te geven vanwege de interactiviteit van de lijngrafiek op de dendrogram + horizontale staafdiagram. Via selectedPop en showYear worden de geselecteerde waardes gekozen door de gebruiker meegegeven. De graphNames variabelen uit importData zijn nodig om de bevolkingsgroep te weergeven in de lijngrafiek.

In makeDendrogram wordt de dendrogram plus horizontale staafdiagram gemaakt. Deze wordt tevens verwijdert en opnieuw getekend als er een bevolkingsgroep of jaar wordt geselecteerd door de gebruiker. graphNames wordt hier ook gebruikt om de namen van de variabelen beter leesbaar te weergeven.


## Uitdagingen en veranderingen

Initieel zou het project meer over internetgebruik en vertrouwen gaan, maar uiteindelijk leek het me beter met het oog op ‘storytelling’ om het meer toe te spitsen op vertrouwen in overheid/politiek. Daarom besloot ik in de eerste week de datasets over politieke interesse en participatie te importeren. Ik kwam er achter dat mijn datastructuur niet optimaal was voor mijn lijngrafiek en besloot toen dat aan te reconstrueren. Door een fout in de xScale functie deed ik nog best lang over het compleet maken van mijn lijngrafiek. Het bleek dat ik onnodig een dataset tussen blokhaken had gezet.

Het maken van de dendrogram was de grootste uitdaging. Heb dan ook veel in de code van het voorbeeld zitten kijken voordat ik hier aan begon. Kwam er helaas wel laat achter dat mijn datastructuur totaal niet geschikt was voor deze visualisatie. Heb toen heel veel uren en dagen gestoken in het herschrijven van de structuur maar het bleek niet goed genoeg te zijn. In de datastructuur moest duidelijk worden aangegeven welke variabele een parent was en wat een children was. En welke children bij welke parent hoorde. Ik dacht dat de functie d3.hierarchy dit automatisch zou doen maar dat was niet het geval. Gelukkig is het met de hulp van de TA’s goedgekomen.

Op een gegeven moment had ik besloten om de variabelen over faciliteiten van het internet niet te gebruiken. Qua stijl van de dendrogram heb ik besloten om geen tipbox te laten zien boven een latente variabelen (politieke interesse, participatie, internetgebruik en gedrag op dienstverleningswebsites). Uiteindelijk de variabel namen van de bars voor de bars laten verschijnen in plaats van erin, wat initieel het plan was. De kleuren van de bars zijn rood en blauw geworden. De grid in de barchart is toegevoegd zodat de gebruiker duidelijker kan zien wat de percentages van bars zijn. Deze wou ik eerst achter de bars laten verschijnen maar zijn uiteindelijk voor de bars gelaten zodat de percentages nog beter leesbaar zijn.

## Verdediging

De dataset over internet faciliteiten is niet gebruikt omdat het me niet relevant genoeg leek plus zou de dendrogram te groot  en daardoor onprettig qua leesbaarheid worden. De gebruiker zou overspoeld worden met teveel informatie.
Er is gekozen om geen tooltip te laten zien boven een latente variabele in de dendrogram omdat hier niet een precieze waarde kon worden gegeven. Eveneens leek het me onduidelijk voor de gebruiker om hier weer veel tekst in te plakken wat de enige optie gezien de omvang van de variabelen qua data. De namen van de variabelen voor de bars zijn voor de bars gekomen omdat het anders voor overlap tussen bars en namen zou zorgen. Er is gekozen voor een rood en blauw kleurenschema voor de bars zodat deze de Nederlandse vlag representeren aangezien het om Nederlands vertrouwen gaat. De foto van het binnenhof in den Haag is te zien op de website omdat dit symbolisch is voor de Nederlandse politiek.

Als ik meer tijd had gehad zou ik een betere update functie schrijven zodat als een jaar aangeklikt wordt in de lijngrafiek deze ook niet opnieuw wordt geladen. Nu lijkt het net alsof deze functie de lijngrafiek manipuleert wat niet het geval is. Verder zou ik graag nog andere classes aan nodes willen toevoegen zodat ik de kleuren van de bars kan matchen met de kleuren van de nodes. Ik zou een mooiere dropdown menu willen maken omdat deze best wel standaard is. Ook zou ik meer storytelling willen toevoegen en foto’s. Tevens heb ik heel veel herhaling in mijn code. Gezien het gebrek aan tijd ben ik niet toegekomen aan het beknopter maken van code. Dit is vooral het geval bij de importData functie en het tekenen van de lijnen in makeLinegraph. De belangrijkste les van deze opdracht is dat ik mij beter moet inlezen op de vereiste samenstelling van een datastructuur als ik een (noge onbekende) visualisatie ga maken. Had ik dit wel gedaan was ik niet uren kwijt geraakt aan het schrijven van een datastructuur die uiteindelijk niet bruikbaar is. Plus alle uren die ik weer kwijt was om die datastructuur weer om te zetten naar een hiërarchische zodat de tree structuur in de dendrogram gemaakt kon worden.

## Laatste woorden

Uiteindelijk ben ik wel super tevreden over mijn visualisatie want het is een mooie interactieve website en vooral de uitklapbare dendrogram waar een barchart achter verschijnt is mooi. Het zorgt ervoor dat de gebruiker echt de data kan verkennen vanwege het interactieve karakter van de website.
