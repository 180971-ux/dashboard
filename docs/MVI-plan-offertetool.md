# Offertetool openbare ruimte (MVI-plan Hendrik-Ido-Ambacht)

## Aanleiding
Kleine aanvragen in de openbare ruimte (inritten, herstraatwerk, parkeervakken, markering) vragen nu elk een schouw, een handmatige calculatie en meerdere contactmomenten. Dat kost tijd, autokilometers en levert per aanvraag een andere opbouw van de offerte op.

## Voorstel
Wij ontwikkelen een online offertetool waarmee de opdrachtgever zelf, binnen enkele minuten, een indicatieve offerte opvraagt.

1. **Inloggen**: de opdrachtgever kiest "Offerte aanvragen".
2. **Locatie**: adres met huisnummer invullen; de kaart zoomt in (PDOK-kaart en luchtfoto).
3. **Beslisboom**: keuze uit inrit aanleggen, trottoir herstraten/vervangen, rijweg herstraten/vervangen, parkeervak aanleggen, parkeervak verwijderen of markering aanbrengen.
4. **Sjabloon**: achter elke keuze staat een vaste set bestekposten (RAW-systematiek). Alleen de variabelen worden gevraagd: afmetingen (of intekenen op de kaart), herstraten of vervangen, ophoging (standaard 5 cm), type verharding.
5. **Verkeersmaatregel**: de tool bepaalt op basis van wegtype en resterende rijbaanbreedte of een werkvakafzetting, halve rijbaanafzetting of omleiding nodig is (uit te werken volgens CROW 96a/96b).
6. **Offerte**: hoeveelheden × eenheidsprijzen uit het raambestek, plus opslagen en btw. Direct als pdf beschikbaar; definitieve prijs na schouw en KLIC-melding.

## MVI-winst
- **Minder CO₂ en vervoer**: geen schouwrit vooraf bij standaardaanvragen.
- **Circulair**: herstraten met vrijgekomen materiaal is de standaardkeuze; de offerte toont hergebruikte m² en vermeden CO₂ (te onderbouwen met DuboCalc/MKI).
- **Transparant en gelijk**: elke aanvraag wordt met dezelfde posten en prijzen berekend.
- **Ontzorgen**: de opdrachtgever heeft direct inzicht in kosten en maatregelen.

## Fasering
| Fase | Inhoud |
|---|---|
| 1.0 | Vragen + beslisboom + sjablonen, prijzen uit het nieuwe raambestek. Klikbaar prototype gereed (`offerte.html`, testprijzen). |
| Leerfase | 5 à 10 afgeronde offertes als testset; tool moet binnen ±10% van de werkelijke offerte uitkomen. |
| 2.0 | Opdrachtgever tekent alleen lijnen/vlakken op de kaart; wegtype, verharding en breedte automatisch uit BGT/NWB (PDOK); offerte direct berekend. |
| Koppeling | Geaccepteerde offerte met dezelfde postcodes door naar de bestekadministratie. |

## Nog uit te werken
- Wie krijgt een account (gemeente, particulieren, corporaties) en is de offerte indicatief of bindend.
- AVG bij inloggen en opslaan van adresgegevens.
- Beslisregels verkeersmaatregelen (CROW 96a/96b) en grenzen voor maatwerk (bomen, kabels/leidingen, hoogteverschillen).
- Beheer van de prijzen (één bron, geldigheidsdatum, indexatie).
- Aansluiting op de bestekadministratie.
