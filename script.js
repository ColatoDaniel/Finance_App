/*
SOLDO - GESTIONE SPESE PERSONALI: STRUTTURA PER IL JAVASCRIPT
 L'HTML non contiene dati: cifre, movimenti, categorie e totali
 vanno generati da array di oggetti in app.js.

 MODELLO DATI (e chiave localStorage)
 state = { transactions: [], categories: [], budget: 0 }
 transaction = { id, date: "2026-10-18", description, category,
                 type: "income" | "expense", amount (sempre > 0) }
 categories  = ["Casa", "Alimentari", ...]  (array di stringhe)
 Salva:  localStorage.setItem("soldo-data", JSON.stringify(state))
 Carica: JSON.parse(localStorage.getItem("soldo-data")) all'avvio
 Facoltativi (sezioni a fondo pagina): goals [{id,name,saved,target}],
 dues [{id,name,date,amount,note}], user, card.

 1) INSERIMENTO / MODIFICA / ELIMINAZIONE
 - #tx-add-btn apre #tx-dialog (showModal) con il form #tx-form vuoto
 - il form ha il campo nascosto #tx-id: vuoto = nuova, pieno = modifica
 - ogni <li> di #transactions-list ha data-id e due pulsanti
   [data-action="edit"] e [data-action="delete"]
   (usa un solo listener su #transactions-list: delegazione degli eventi)
 - errori di validazione: scrivili in #tx-error e togli "hidden"

 2) CATEGORIE, FILTRI, RICERCA
 - popola #tx-category e #filter-category dall'array categories
 - filtri: #filter-search (testo), #filter-type, #filter-category,
   #filter-reset; combinali tutti con filter() prima di disegnare
 - #transactions-count = numero di movimenti visibili

 3) SALDO E TOTALI MENSILI
 - Saldo totale = somma(income) - somma(expense)  -> #balance-int, #balance-dec
 - Mese scelto in #month-picker (formato "2026-10"):
   #month-income, #month-expense, #month-net, #totals-label
 - #delta-text / #delta-icon = variazione netta del mese scelto

 4) BUDGET
 - #budget-input = budget mensile; #budget-bar = % speso (--p)
 - se speso > budget aggiungi la classe "over" a #budget-track
 - testo in #budget-note (es. quanto resta o di quanto hai sforato)

 5) GRAFICI
 - Spese per categoria (mese scelto): #category-bar, #category-legend,
   #spending-total
 - Andamento saldo: path #chart-area, #chart-line, #chart-marker
   (viewBox 600 x 190: x da 0 a 600, y da 190 in basso a 0 in alto),
   periodo dai pulsanti [data-range] di #chart-range

 TEMPLATE: ogni lista ha un <template id="tpl-..."> con campi
 data-field="...". Clona, compila i campi, aggiungi al contenitore.
 ICONE (id dei <symbol>): home wallet card swap trend target up down
 plus bell bag train tv user edit trash
*/
