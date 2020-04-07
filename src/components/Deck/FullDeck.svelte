<script>
  import Card from '../Card.svelte';
  import ManaCurve from './ManaCurve.svelte';
  import DeckStats from './DeckStats.svelte';
  import DeckDust from './DeckDust.svelte';

  export let deck;
  export let cardModeSwitchLink;
</script>

<style>
  .card {
    display: inline-block;
    margin: 3px;
    flex-direction: row;
  }

  .card-count {
    position: absolute;
    left: 40%;
    right: 40%;
    bottom: 1px;
    padding: 1px 10px;
    border: 4px solid #886D3C;
    border-radius: 5px;
    background-color: #C4AD7E;
    color: #44392A;
    font-weight: bold;
    text-align: center;
  }
</style>

<div class="row">
  <a href="{cardModeSwitchLink}">compact card mode</a>
</div>

<div class="row">
  <div class="col">
    {#each deck as {count, card}}
      <div class="card">
        <div class="card-count">{count}x</div>
        <img src="https://art.hearthstonejson.com/v1/render/latest/enUS/256x/{card.id}.png" alt="{card.name}" />
      </div>
    {/each}
  </div>
</div>

<div class="row">
  <div class="col">
    <div class="container">
      <div class="row">
        <div class="col">
          <DeckDust deck={deck} />
          <ManaCurve deck={deck} />
        </div>
        <div class="col"><DeckStats deck={deck} /></div>
      </div>
    </div>
  </div>
</div>
