<script>
  import { createEventDispatcher } from 'svelte';
  import { CARD_SETS } from '../../helper/constants.js';

  export let shownSet;

  const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-no-onchange -->
<select class="custom-select" bind:value={shownSet} on:change="{(event) => dispatch('chooseCardSet', event.target.value)}">
  <optgroup label="Sets">
    <option value="STANDARD">Standard Cards</option>
    <option value="ALL">All Cards</option>
  </optgroup>

  <optgroup label="Standard">
    {#each Object.entries(CARD_SETS).filter(([_i, s]) => s.inStandard) as [cardSetId, cardSet]}
      <option value={cardSetId}>{cardSet.name}</option>
    {/each}
  </optgroup>

  <optgroup label="Wild">
    {#each Object.entries(CARD_SETS).filter(([_i, s]) => !s.inStandard) as [cardSetId, cardSet]}
      <option value={cardSetId}>{cardSet.name}</option>
    {/each}
  </optgroup>
</select>
