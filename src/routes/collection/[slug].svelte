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
  import { currentUser } from '../../stores/currentUser.store';
  import { userCards } from '../../stores/userCards.store';

  import CollectionNav from '../../components/Collection/Nav.svelte';
  import Pagination from '../../components/Collection/Pagination.svelte';

  export let activeHeroClass;
  export let classCards;
  export let currentPage;

  const cardsPerPage = 8;

  let displayCards;
  let userCardCollection;

  const addCardToCollection = (cardId) => {
    if (!$currentUser.loggedIn) { return; }

    if ($userCards[cardId]) {
      $userCards[cardId] = 2;
    } else {
      $userCards[cardId] = 1;
    }

    $currentUser.cardCollection.set($userCards);
  };

  const removeCardFromCollection = (cardId) => {
    if (!$currentUser.loggedIn) { return; }
    if (!$userCards[cardId]) { return; }

    $userCards[cardId] = $userCards[cardId] - 1;
    $currentUser.cardCollection.set($userCards);
  };
  
  $: {
    const baseSlice = (currentPage - 1) * cardsPerPage;
    displayCards = classCards.slice(baseSlice, baseSlice + cardsPerPage);

    if ($currentUser.loggedIn && !$userCards._initialized) {
      $currentUser.cardCollection.get().then((doc) => {
        if (doc.exists) {
          userCards.set(doc.data());
        } else {
          userCards.set({ _initialized: true });
        }
      });
    }

    if (!$currentUser.loggedIn) {
      userCards.set({});
    }
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

          {#if $currentUser.loggedIn}
            <div class="ctrl-container">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-sm btn-warning ctrl-plus" on:click={addCardToCollection(classCard.id)}>+</button>
                <button type="button" class="btn btn-sm btn-light ctrl-cnt" disabled>{$userCards[classCard.id] || '0'}</button>
                <button type="button" class="btn btn-sm btn-warning ctrl-minus" on:click={removeCardFromCollection(classCard.id)}>-</button>
              </div>
            </div>
          {/if}
        </div>
      {/each}
  </div>
</div>

<Pagination classCards={classCards} activeHeroClass={activeHeroClass} currentPage={currentPage} />
