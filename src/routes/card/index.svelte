<script context="module">
  import { getCards } from '../../helper/cards.js';

  let cards;
  let fuse;

  export async function preload(page, session) {
    cards = await getCards(this);
    fuse = new Fuse(cards, { keys: ['name'] });
  }
</script>

<script>
  import Fuse from 'fuse.js';

  import Card from '../../components/Card.svelte';

  let cardName = '';
  let matchedCards = [];

  $: showMatchedCards(cardName);

  const showMatchedCards = (cardName) => {
    if (cardName.length <= 2) { return; }

    const searchResult = fuse.search(cardName).slice(0, 20);

    matchedCards = searchResult.map((resultEntry) => resultEntry.item);
  };
</script>

<style>
  input {
    margin-bottom: 12px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 1px;
  }
</style>

<div>
  <input type="text" bind:value={cardName} />

  <div class="cardResults">
    <ul>
      {#each matchedCards as card}
        <li>
          <Card card={card} />
        </li>
      {/each}
    </ul>
  </div>
</div>