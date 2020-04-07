<script>
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

<div class="row">
  <div class="col-sm">
    <ul>
      {#each deck as {count, card}}
        <li>
          <Card count={count} card={card} />
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
