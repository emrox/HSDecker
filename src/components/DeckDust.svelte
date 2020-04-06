<script>
  export let deck;

  const costMapping = { 'FREE': 0, 'COMMON': 40, 'RARE': 100, 'EPIC': 400, 'LEGENDARY': 1600 };

  const fullManaCost = deck.reduce((manaSum, { card, count }) => {
    return manaSum + (costMapping[card.rarity] * count);
  }, 0);
</script>

<div>
  Dust cost: {fullManaCost} <img src="/img/dust.png" alt="dust" />
</div>