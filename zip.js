import * as fs from 'fs';
import * as path from 'path';
import * as unzipper from 'unzipper';

console.log("Enter the path to the ZIP file:");
const zipFilePath = process.argv[2] || 'file.zip';
const extractPath = './extracted/';

fs.createReadStream(zipFilePath)
  .pipe(unzipper.Parse())
  .on('entry', entry => {
    const filePath = path.join(extractPath, entry.path);
    entry.pipe(fs.createWriteStream(filePath));
  })
  .on('error', (err) => {
    console.error('Extraction error:', err);
  })
  .on('finish', () => {
    console.log('Extraction complete.');
  });
