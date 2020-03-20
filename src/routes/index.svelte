<script context="module">
  import { getCards } from '../helper/cards.js';

  export async function preload(page, session) {
    const cards = await getCards(this);

    const classes = cards.reduce((a, c) => {
      if(a.indexOf(c.cardClass) < 0 && c.cardClass !== 'NEUTRAL') { a.push(c.cardClass); };

      return a;
    }, []);
    const deckClass = classes.sort(() => 0.5 - Math.random())[0];
    const possibleCardClasses = ['NEUTRAL', deckClass];
    const classCards = cards.reduce((a, c) => { if(possibleCardClasses.includes(c.cardClass)) { a.push(c); }; return a; }, []);
    const randomCards = classCards.sort(() => 0.5 - Math.random());

    let randomDeck = [];
    const deckCardCount = (deck) => deck.reduce((a, c) => a + c.count, 0);

    while(deckCardCount(randomDeck) < 30) {
      randomDeck.push({
        card: randomCards[randomDeck.length],
        count: deckCardCount(randomDeck) >= 29 ? 1 : (Math.random() > 0.5 ? 1 : 2),
      });
    }

    return { deckClass, randomDeck };
  }
</script>

<script>
  import { deckSort } from '../helper/deck.js';
  import { CLASS_HEROS } from '../helper/constants.js';
  import Deck from '../components/Deck.svelte';
  import { encode } from 'deckstrings';

  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  export let randomDeck;
  export let deckClass;

  const deckCodeData = {
    cards: randomDeck.map((card) => ([card.card.dbfId, card.count])),
    heroes: CLASS_HEROS[deckClass],
    format: 2,
  };

  export let deckCode = encode(deckCodeData);
</script>

<style>
  input {
    margin-bottom: 20px;
    width: 100%;
  }
</style>

<svelte:head>
	<title>HSdecker</title>
</svelte:head>

<h1>Random {capitalize(deckClass)} Deck</h1>

<input type="text" value={deckCode} />

<Deck deck={randomDeck} />
