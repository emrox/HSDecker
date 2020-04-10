<script>
  import { createEventDispatcher } from 'svelte';
  import { CARD_SETS } from '../../helper/constants.js';

  export let shownSet;

  const dispatch = createEventDispatcher();
</script>

<select class="custom-select" bind:value={shownSet} on:change="{(event) => dispatch('chooseCardSet', event.target.value)}">
  <option value="STANDARD">Standard Cards</option>
  <option value="ALL">All Cards</option>
  {#each Object.entries(CARD_SETS) as [cardSetId, cardSet]}
    <option value={cardSetId}>{cardSet.name}</option>
  {/each}
</select>
