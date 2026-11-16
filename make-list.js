const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, 'public', 'photos');
const outputFile = path.join(__dirname, 'public', 'photos.js');

fs.mkdirSync(photosDir, { recursive: true });

const photos = fs.readdirSync(photosDir, { withFileTypes: true })
  .filter(entry => entry.isFile() && /\.(jpe?g|png|webp)$/i.test(entry.name))
  .map(entry => entry.name)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

fs.writeFileSync(outputFile, `const PHOTOS = ${JSON.stringify(photos, null, 2)};\n`);
console.log(`Wrote ${photos.length} photo filename(s) to public/photos.js`);
