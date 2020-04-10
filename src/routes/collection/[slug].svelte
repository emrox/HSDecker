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
  .container {
    margin-bottom: 20px;
  }

  .hscard img {
    max-width: 100%;
  }

  .ctrl-container {
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
  }

  .ctrl-cnt {
    width: 40px;
    cursor: default;
    color: #000;
  }

  .ctrl-plus,
  .ctrl-minus {
    width: 30px;
  }
</style>

<CollectionNav activeHeroClass={activeHeroClass} />

<div class="container">
  <div class="row">
      {#each displayCards as classCard}
        <div class="col-3 hscard">
          <img src="https://art.hearthstonejson.com/v1/render/latest/enUS/256x/{classCard.id}.png" alt="{classCard.name}" />

          <div class="ctrl-container">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-sm btn-warning ctrl-plus">+</button>
              <button type="button" class="btn btn-sm btn-light ctrl-cnt" disabled>0</button>
              <button type="button" class="btn btn-sm btn-warning ctrl-minus">-</button>
            </div>
          </div>
        </div>
      {/each}
  </div>
</div>

<Pagination classCards={classCards} activeHeroClass={activeHeroClass} currentPage={currentPage} />
