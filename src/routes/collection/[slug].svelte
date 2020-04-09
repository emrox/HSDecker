<script context="module">
  import { getCards } from '../../helper/cards.js';
  import { deckSort } from '../../helper/deck.js';

  export async function preload({ params, query }) {
    const cards = await getCards(this, true);
    const activeHeroClass = params.slug;
    const currentPage = query.page ? parseInt(query.page) : 1;

    const classCards = deckSort(cards.reduce((collection, card) => {
      if (
        card.collectible === true &&
        card.cardClass === activeHeroClass.toUpperCase()
      ) {
        collection.push(card);
      }

      return collection;
    }, []));

    return { activeHeroClass, classCards, currentPage }
  }
</script>

<script>
  import CollectionNav from '../../components/Collection/Nav.svelte';
  import Pagination from '../../components/Collection/Pagination.svelte';

  export let activeHeroClass;
  export let classCards;
  export let currentPage;

  const cardsPerPage = 8;

  let displayCards;
  
  $: {
    const baseSlice = (currentPage - 1) * cardsPerPage;
    displayCards = classCards.slice(baseSlice, baseSlice + cardsPerPage);
  };
</script>

<style>
  .hscard img {
    max-width: 100%;
  }
</style>

<CollectionNav activeHeroClass={activeHeroClass} />

<div class="container">
  <div class="row">
      {#each displayCards as classCard}
        <div class="col-3 hscard">
          <img src="https://art.hearthstonejson.com/v1/render/latest/enUS/256x/{classCard.id}.png" alt="{classCard.name}" />
        </div>
      {/each}
  </div>
</div>

<Pagination classCards={classCards} activeHeroClass={activeHeroClass} currentPage={currentPage} />
