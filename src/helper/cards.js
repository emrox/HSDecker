export async function getCards (context, reduce = true) {
  const cardsRes = await context.fetch('data/cards.collectible.json');
  const allCards = await cardsRes.json();

  if (!reduce) { return allCards; }

  const cards = allCards.reduce((acc, card) => {
    if (
      card.collectible &&
      card.set !== 'HERO_SKINS' &&
      (
        (card.type === 'HERO' && card.cost) ||
        (card.type === 'MINION') ||
        (card.type === 'SPELL') ||
        (card.type === 'WEAPON')
      )
    ) {
      acc.push(card);
    }

    return acc;
  }, []);

  return cards;
}
