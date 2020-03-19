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

    const randomDeck = classCards.sort(() => 0.5 - Math.random()).slice(0, 30);

    return { deckClass, randomDeck };
  }
</script>

<script>
  import { deckSort } from '../helper/deck.js';
  import Card from '../components/Card.svelte';

  export let randomDeck;
  export let deckClass;
</script>

<style>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 1px;
  }
</style>

<svelte:head>
	<title>HSdecker</title>
</svelte:head>

<h1>Random Deck {deckClass}</h1>

<ul>
  {#each deckSort(randomDeck) as card}
    <li>
      <Card count="1" card={card} />
    </li>
  {/each}
</ul>
