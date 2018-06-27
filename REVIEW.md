## Code review
Review code van Michael door Marc:
Comments: Prima, paar toevoegen, af en toe onduidelijk dat er een functie wordt aangeroepen(ligt ook aan naam van functie) en paar duidelijker maken. Bijvoorbeeld bij dendogram meer beschrijven. Dat is een wat lastigere functie; 3

Names: duidelijke namen. vanzelfsprekend; 4

Formatting: consistent indenetation. code is ingedeeld in blokken die bij elkaar horen. niet te lange regels; 4

Organization; zit normale orde in functies die opgeroepen worden komen na elkaar, zoas diagonals(). Verder hebben alle functies een logische volgorde. Nog paar uitgecommende code regels weghalen; 3

Flow: arrays pushen data for loop ipv 6x doen. Paar keer repetition. Niet onnodige nesting, code heeft een duidelijk doel; 2

Idiom: datastructuren zijn duidelijk en goed gebruikt, data naar de juist structuur omgeschreven zoals voor dendogram. Gebruikt ook bestaande functies waar mogelijk; 4

Structure; functies zijn per tekening gemaakt dus het doel is duidelijk. Ze zijn wel aan de lange kant. Wel op twee verschillende plekken in files wordt data bewerkt, in de functies en in import data. Kan beter een functie per diagram data laten processen; 3


Extra notities tijdens review:

- Onnodige inline comments
- Let op 80 karakters conventie
- Zet update functie onderaan en andere naam (er is ook een aparte updatefunctie genaamd update in dendrogram functie).
- Minder magic numbers
- Geen variabelnamen zoals uberarray in importdata.js
