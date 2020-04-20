<script>
  import { currentUser } from '../../stores/currentUser.store';
  import { userCards } from '../../stores/userCards.store';

  export let deck;

  const costMapping = { 'FREE': 0, 'COMMON': 40, 'RARE': 100, 'EPIC': 400, 'LEGENDARY': 1600 };

  const fullManaCost = deck.reduce((manaSum, { card, count }) => {
    return manaSum + (costMapping[card.rarity] * count);
  }, 0);

  let userManaCost = fullManaCost;

  userCards.subscribe(ucards => {
    userManaCost = deck.reduce((manaSum, { card, count }) => {
      const needCount = count - (ucards[card.id] || 0);

      if (needCount <= 0) { return manaSum; }

      return manaSum + (costMapping[card.rarity] * needCount);
    }, 0);
  });
</script>

<div>
  Dust cost:
  
  {userManaCost}

  {#if fullManaCost !== userManaCost}
    ({fullManaCost})
  {/if}

  <img src="/img/dust.png" alt="dust" />
</div>
