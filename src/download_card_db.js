const fs = require('fs');
const path = require('path');
const https = require('https');

const cardDbUrl = 'https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json';
const cardDbPath = path.resolve(`${ __dirname}/../static/data/cards.collectible.json`);

https.get(cardDbUrl, (redirectRes) => {
  // plain and stupid, we always expect a redirect
  const realCardDbUrl = redirectRes.headers.location;

  // now request the real file
  https.get(realCardDbUrl, (res) => {
    const file = fs.createWriteStream(cardDbPath);

    res.pipe(file);
    file.on('finish', () => { file.close(); });
  })
});
