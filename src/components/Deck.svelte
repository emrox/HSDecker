<script context="module">
  import { getCards } from '../helper/cards.js';

  export async function preload(page, session) {
  }
</script>

<script>
  import { deckSort } from '../helper/deck.js';
  import Card from '../components/Card.svelte';
  import ManaCurve from '../components/ManaCurve.svelte';
  import DeckStats from '../components/DeckStats.svelte';
  import DeckDust from '../components/DeckDust.svelte';

  export let deck;
</script>

<style>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul li {
    margin-bottom: 1px;
  }

  .right-side {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .right-side > div {
    margin-bottom: 12px;
  }
</style>

<div class="container-fluid">
  <div class="row">
    <div class="col-sm">
      <ul>
        {#each deckSort(deck) as {count, card}}
          <li>
            <Card count={count} card={card} />
          </li>
        {/each}
      </ul>
    </div>

    <div class="col-sm right-side">
      <div><DeckDust deck={deck} /></div>
      <div><ManaCurve deck={deck} /></div>
      <div><DeckStats deck={deck} /></div>
    </div>
  </div>
</div>