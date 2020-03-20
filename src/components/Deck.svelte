<script context="module">
  import { getCards } from '../helper/cards.js';

  export async function preload(page, session) {
  }
</script>

<script>
  import { deckSort } from '../helper/deck.js';
  import Card from '../components/Card.svelte';

  export let deck;
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

<ul>
  {#each deckSort(deck) as {count, card}}
    <li>
      <Card count={count} card={card} />
    </li>
  {/each}
</ul>
