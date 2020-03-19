<script context="module">
  import { cards } from '../helper/cards.js'

  export async function preload(page, session) {
    return { cards: await cards(this) };
  }
</script>

<script>
  import Card from '../components/Card.svelte';

  export let cards;
  export const randomDeck = cards.sort(() => 0.5 - Math.random()).slice(0, 30).sort((a, b) => {
    const nameA = `${`0${a.cost}`.slice(-2)}${a.name.toUpperCase()}`;
    const nameB = `${`0${b.cost}`.slice(-2)}${b.name.toUpperCase()}`;

    return nameA.localeCompare(nameB, 'en');
  })
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
  {#each randomDeck as card}
    <li>
      <Card count="1" card={card} />
    </li>
  {/each}
</ul>
