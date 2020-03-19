export const deckSort = (deckCards) => deckCards.sort((a, b) => {
  const nameA = `${`0${a.cost}`.slice(-2)}${a.name.toUpperCase()}`;
  const nameB = `${`0${b.cost}`.slice(-2)}${b.name.toUpperCase()}`;

  return nameA.localeCompare(nameB, 'en');
})
