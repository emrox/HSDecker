<script context="module">
  import { getCards } from '../../helper/cards.js';
  import { deckSort } from '../../helper/deck.js';

  export async function preload({ params }) {
    const cards = await getCards(this, false);
    const activeHeroClass = params.slug;

    const classCards = deckSort(cards.reduce((collection, card) => {
      if (
        card.collectible === true &&
        card.cardClass === activeHeroClass.toUpperCase()
      ) {
        collection.push(card);
      }

      return collection;
    }, []));

    return { activeHeroClass, classCards }
  }
</script>

<script>
  import CollectionNav from './_nav.svelte';

  export let activeHeroClass;
  export let classCards;

  let displayCards;
  
  $: {
    displayCards = classCards.slice(0, 8);
  };
</script>

<style>
  .card img {
    max-width: 100%;
  }
</style>

<CollectionNav activeHeroClass={activeHeroClass} />

<div class="container">
  <div class="row">
      {#each displayCards as classCard}
        <div class="card col-3">
          <img src="https://art.hearthstonejson.com/v1/render/latest/enUS/256x/{classCard.id}.png" alt="{classCard.name}" />
        </div>
      {/each}
  </div>
</div>