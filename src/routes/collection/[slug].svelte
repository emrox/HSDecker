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
  import { buildUrl } from '../../helper/url.js';
  import CollectionNav from './_nav.svelte';

  export let activeHeroClass;
  export let classCards;
  export let currentPage;

  const cardsPerPage = 8;

  let displayCards;
  let prevPageLink;
  let nextPageLink;
  
  $: {
    const baseSlice = (currentPage - 1) * cardsPerPage;
    displayCards = classCards.slice(baseSlice, baseSlice + cardsPerPage);

    const baseLink = `/collection/${activeHeroClass}`;
    prevPageLink = buildUrl(baseLink, { page: currentPage > 1 ? currentPage - 1 : 1 });
    nextPageLink = buildUrl(baseLink, { page: currentPage + 1 });
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

<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" class:disabled={currentPage <= 1}>
      <a class="page-link" href="{prevPageLink}" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    <li class="page-item" class:disabled={currentPage * cardsPerPage > classCards.length}>
      <a class="page-link" href="{nextPageLink}" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
