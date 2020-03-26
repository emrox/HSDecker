const path = require('path');
const fs = require('fs');

const fullCardDbPath = path.resolve(`${ __dirname}/../static/data/cards.collectible.json`);
const simplifiedCardDbPath = path.resolve(`${ __dirname}/../static/data/cards.collectible.simplified.json`);

const fullCardDb = JSON.parse(fs.readFileSync(fullCardDbPath, 'utf8'));
const simplifiedCardDb = fullCardDb.map((card) => {
  const { cardClass, collectible, cost, dbfId, id, name, rarity, set, type } = card;

  return { cardClass, collectible, cost, dbfId, id, name, rarity, set, type };
});

fs.writeFileSync(simplifiedCardDbPath, JSON.stringify(simplifiedCardDb, null, 0), { encoding: 'utf-8', flag: 'w' });
