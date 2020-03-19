export async function cards (context) {
  const cardsRes = await context.fetch('data/cards.collectible.json');
  const allCards = await cardsRes.json();

  const cards = allCards.reduce((acc, card) => {
    if (
      card.collectible &&
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
