<script context="module">
  import { decode } from 'deckstrings';
  import { getCards } from '../../helper/cards.js';

  export async function preload(page, session) {
    const { slug } = page.params;
    const deckCode = slug.join('/');
    const rawDeck = decode(deckCode);
    const cards = await getCards(this, false);

    const findCard = (dbfId) => cards.find((card) => card.dbfId === dbfId);

    const deck = rawDeck.cards.map(([dbfId, count]) => {
      return {
        card: findCard(dbfId),
        count,
      };
    });

    return { deck, deckCode, hero: findCard(rawDeck.heroes[0]) };
  }
</script>

<script>
  import Deck from '../../components/Deck/Deck.svelte';
  import { deckSort } from '../../helper/deck.js';

  export let deck;
  export let deckCode;
</script>

<style>
  input {
    margin-bottom: 20px;
    width: 100%;
  }
</style>

<svelte:head>
	<title>HSdecker :: Deckcode Viewer</title>
</svelte:head>

<h1>Deckcode Viewer</h1>

<input type="text" value={deckCode} />

<Deck deck={deck} />
