<script>
  import { currentUser } from '../../stores/currentUser.store';
  import { userCards } from '../../stores/userCards.store';

  import Card from '../Card.svelte';
  import ManaCurve from './ManaCurve.svelte';
  import DeckStats from './DeckStats.svelte';
  import DeckDust from './DeckDust.svelte';

  export let deck;
  export let cardModeSwitchLink;
</script>

<style>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul li {
    display: flex;
    margin-bottom: 1px;
  }

  .card-collection-check {
    width: 20px;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
    line-height: 26px;
    cursor: default;
  }

  .card-collection-check--ok {
    background-color: #E0EFCB;
  }

  .card-collection-check--missing {
    background-color: #F08080;
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

<div class="row">
  <div class="col-sm">
    <ul>
      {#each deck as {count, card}}
        <li>
          <Card count={count} card={card} />
          {#if $currentUser.loggedIn}
            {#if $userCards[card.id] >= count}
              <div class="card-collection-check card-collection-check--ok" title="you have the card(s) in your collection">✔</div>
            {:else}
              <div class="card-collection-check card-collection-check--missing" title="number of times the card  is missing in your collection">
                {count - ($userCards[card.id] || 0)}
              </div>
            {/if}
          {/if}
        </li>
      {/each}
    </ul>
    <a href="{cardModeSwitchLink}">full card mode</a>
  </div>

  <div class="col-sm right-side">
    <div><DeckDust deck={deck} /></div>
    <div><ManaCurve deck={deck} /></div>
    <div><DeckStats deck={deck} /></div>
  </div>
</div>
