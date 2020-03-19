export const deckSort = (deckCards) => deckCards.sort((a, b) => {
  const cardA = a.card || a;
  const cardB = b.card || b;

  const nameA = `${`0${cardA.cost}`.slice(-2)}${cardA.name.toUpperCase()}`;
  const nameB = `${`0${cardB.cost}`.slice(-2)}${cardB.name.toUpperCase()}`;

  return nameA.localeCompare(nameB, 'en');
})
