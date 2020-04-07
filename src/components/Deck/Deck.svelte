<script>
  import { stores } from '@sapper/app';
  import { deckSort } from '../../helper/deck.js';
  import { buildUrl } from '../../helper/url.js';

  import CompactDeck from './CompactDeck.svelte';
  import FullDeck from './FullDeck.svelte';

  export let deck;

  const { page } = stores();

  let sortedDeck = deckSort(deck);
  let currentPath = $page.path;
  let currentQueryParams = $page.query;
  let cardMode;
  let cardModeSwitchLink;

  $: {
    cardMode = $page.query.cardMode === 'full' ? 'full' : 'simple';
    cardModeSwitchLink = $page.query && buildUrl(currentPath, {...currentQueryParams, 'cardMode': cardMode === 'full' ? undefined : 'full'});
  };
</script>

<div class="container-fluid">
  {#if cardMode === 'simple'}
    <CompactDeck deck={sortedDeck} cardModeSwitchLink={cardModeSwitchLink} />
  {:else}
    <FullDeck deck={sortedDeck} cardModeSwitchLink={cardModeSwitchLink} />
  {/if}
</div>
