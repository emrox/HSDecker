<script>
  let cardName = '';
  let matchedCards = [];

  $: showMatchedCards(cardName);

  const showMatchedCards = (cardName) => {
    if (cardName.length <= 2) { return; }

    matchedCards = [cardName.split('')];
  }
</script>

<div>
  <input type="text" bind:value={cardName} />

  <div class="cardResults">
    {matchedCards.join(' / ')}
  </div>
</div>