# Repo-afspraken

Deze repo bevat twee losse onderdelen. Houd ze gescheiden.

| Onderdeel | Bestanden | Opmerking |
|---|---|---|
| Privé-dashboard | `index.html`, `pgb.html`, `lessen.js`, `slot.js`, `manifest.json`, iconen | Niet aanpassen tenzij expliciet gevraagd. Geen werk-tools hierin opnemen. |
| Offertetool openbare ruimte (MVI-plan Hendrik-Ido-Ambacht) | `offerte.html`, `docs/MVI-plan-offertetool.md`, `docs/OVERDRACHT-offertetool.md` | **Lees eerst `docs/OVERDRACHT-offertetool.md`** voor opbouw, status en open punten. |

## Werkwijze
- Communiceer in het Nederlands.
- Doe geen aannames: ontbrekende gegevens (prijzen, maten, regels) eerst navragen.
- Alle HTML is los, zonder build-stap. Test wijzigingen met Playwright en meld wat wel en niet getest is.
- In `offerte.html` zijn prijzen, opslagen, laagdiktes en verkeersregels voorlopig/testwaarden tot de gebruiker anders aangeeft.
- Werk het overdrachtsdocument bij als de status of open punten veranderen.
