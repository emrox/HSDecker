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

  import { CARD_SETS } from '../../helper/constants.js';

  import CollectionNav from '../../components/Collection/Nav.svelte';
  import Pagination from '../../components/Collection/Pagination.svelte';
  import CardSetChooser from '../../components/Collection/CardSetChooser.svelte';

  export let activeHeroClass;
  export let classCards;
  export let currentPage;

  const cardsPerPage = 8;

  let displayCards;
  let userCardCollection;
  let shownSet = 'STANDARD';

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

  const initializeUserCards = () => {
    $currentUser.cardCollection.get().then((doc) => {
      if (doc.exists) {
        userCards.set(doc.data());
      } else {
        userCards.set({ _initialized: true });
      }
    });
  };

  const filterCardSet = (cards, set) => {
    if (set === 'ALL') {
      return cards;
    }

    const standardSets = Object.entries(CARD_SETS).reduce((sets, [setId, set]) => {
      if (set.inStandard) {
        sets.push(setId);
      }

      return sets;
    });

    return cards.reduce((filteredCards, card) => {
      if (
        (set === 'STANDARD' && standardSets.includes(card.set)) ||
        card.set === set
      ) {
        filteredCards.push(card);
      }

      return filteredCards;
    }, []);
  };

  const changeChoosenCardset = (event) => {
    shownSet = event.detail;
  };
  
  $: {
    const baseSlice = (currentPage - 1) * cardsPerPage;
    displayCards = filterCardSet(classCards, shownSet).slice(baseSlice, baseSlice + cardsPerPage);

    if ($currentUser.loggedIn && !$userCards._initialized) {
      initializeUserCards();
    }

    if (!$currentUser.loggedIn) {
      userCards.set({});
    }
  };
</script>

<style>
  .cards {
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

  .tools {
    display: flex;
  }

  .tools .tool {
    margin-right: 20px;
  }
</style>

<CollectionNav activeHeroClass={activeHeroClass} />

<div class="container cards">
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

<div class="tools">
  <div class="tool pagination">
    <Pagination classCards={classCards} activeHeroClass={activeHeroClass} currentPage={currentPage} />
  </div>

  <div class="tool cardchooser">
    <CardSetChooser shownSet={shownSet} on:chooseCardSet={changeChoosenCardset} />
  </div>
</div>
