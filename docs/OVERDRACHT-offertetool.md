# Overdracht: Offertetool openbare ruimte (MVI-plan Hendrik-Ido-Ambacht)

Dit document is bedoeld om in een nieuwe Claude Code-sessie verder te bouwen. Lees dit eerst.

## Doel
Opdrachtgever logt in, vult adres in, kiest via een eenvoudige beslisboom het soort werk, beantwoordt een paar vragen en krijgt direct een indicatieve offerte op basis van de eenheidsprijzen uit het raambestek. Onderdeel van het MVI-plan (minder schouwritten, hergebruik materiaal, transparantie).
- **1.0** (nu): vragen + beslisboom + sjablonen.
- **2.0** (later): opdrachtgever tekent alleen lijnen/vlakken op de kaart; software haalt wegtype/verharding/breedte zelf op en rekent direct.

## Bestanden
| Bestand | Inhoud |
|---|---|
| `offerte.html` | Prototype 1.0, één los HTML-bestand (geen build). **Bewust niet** gekoppeld aan het privé-dashboard (`index.html`). |
| `docs/MVI-plan-offertetool.md` | Tekst voor het MVI-plan. |
| `docs/OVERDRACHT-offertetool.md` | Dit document. |

Branch: `claude/offerte-tool-mvi-hia-v0wtmu`.

## Opbouw van `offerte.html` (in het `<script>`)
1. **`PRIJZEN`** — één tabel met alle eenheidsprijzen (`code`, `oms`, `eh`, `p`). **Alle prijzen zijn TESTPRIJZEN.** Na ontvangst raambestek alleen deze tabel vervangen; `code` = postnummer uit het raambestek.
   `OPSLAG` — uitvoeringskosten 8%, onvoorzien 5%, btw 21% (test, nog vaststellen).
   `MVI` — voorbeeldfactoren CO₂ (te vervangen door DuboCalc/MKI-waarden).
2. **`SJABLONEN`** — per aanvraagtype: `vragen` (variabelen), `posten(a)` (lijst `[prijsKey, hoeveelheid]`), `dagen(a)`, `locatie` (`trottoir`/`rijbaan`), optioneel `oppFn` en `geenOpp`.
   Typen: `inrit`, `trottoir`, `rijweg`, `pv_aanleg`, `pv_verw`, `markering`.
   Standaard ophoging 5 cm. Laagdiktes (ontgraven 25 cm, fundering 20 cm e.d.) zijn **aannames**.
3. **`verkeersmaatregel()`** — VOORLOPIGE regel: trottoir → werkvakafzetting; rijbaan → halve rijbaan als resterende breedte ≥ 2,75 m (30 km) / ≥ 3,25 m (50 km), anders omleiding. **Moet getoetst worden aan CROW 96a/96b.**
4. **Kaart** — Leaflet 1.9.4 (cdnjs), PDOK BRT-achtergrondkaart + luchtfoto, adres via PDOK Locatieserver (geen API-sleutel). Vlak tekenen op kaart → oppervlak (m²). Fallback als Leaflet niet laadt.
5. **Stappen** — 0 inloggen (gesimuleerd, niets opgeslagen) → 1 adres → 2 soort werk → 3 vragen → 4 offerte (tabel, verkeersmaatregel, MVI-indicatie, print/PDF).

## Getest
Playwright: alle 6 typen leveren een offerte, adreskeuze en vlak tekenen werken. Kaart en PDOK waren in de testomgeving geblokkeerd en zijn nagebootst; **echte kaart/adres nog niet live gecontroleerd**.

## Open punten / volgende stappen (prioriteit)
1. **Echte voorbeeldoffertes** (start: inrit) aanleveren → sjablonen en laagdiktes kalibreren; doel ±10% van werkelijke offerte.
2. **Raambestekprijzen** invullen in `PRIJZEN` (evt. inlezen uit Excel-export, zoals eerder bij raambestekken in het dashboard).
3. **Verkeersmaatregelen** uitwerken volgens CROW 96a/96b; second opinion door verkeerskundige.
4. **"Offerte aanvragen"-knop** koppelen (nu een melding): bijv. Make-webhook → pdf in OneDrive + e-mail naar aanvrager en ons.
5. **Echte login + AVG**: wie krijgt een account (gemeente / particulier / corporatie)? Indicatief of bindend?
6. **Maatwerkgrens**: bomen, kabels/leidingen, hoogteverschillen → "neem contact op".
7. **2.0-voorbereiding**: wegtype/rijbaanbreedte uit NWB, verharding uit BGT (PDOK WFS/OGC API) automatisch ophalen.
8. **Koppeling bestekadministratie**: zelfde postcodes (RAW) gebruiken, export van geaccepteerde offerte.

## Werkafspraken
- Taal: Nederlands. Geen aannames: ontbrekende gegevens eerst navragen.
- Na elke wijziging testen (Playwright) en melden wat wel/niet getest is.
- Privé-dashboard (`index.html`, `pgb.html`) niet aanpassen voor deze tool.
