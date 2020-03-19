<script context="module">
  import { getCards } from '../helper/cards.js';

  export async function preload(page, session) {
    const cards = await getCards(this);
    const randomDeck = cards.sort(() => 0.5 - Math.random()).slice(0, 30);

    return { randomDeck };
  }
</script>

<script>
  import { deckSort } from '../helper/deck.js';
  import Card from '../components/Card.svelte';

  export let randomDeck;
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

<h1>Random Deck</h1>

<ul>
  {#each deckSort(randomDeck) as card}
    <li>
      <Card count="1" card={card} />
    </li>
  {/each}
</ul>
