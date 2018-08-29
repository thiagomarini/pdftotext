'use strict';

const crypto = require('crypto');
const path = require('path');
const https = require('https');
const fs = require('fs');
const responses = require('../responses');

module.exports.read = async (event, callback, execFile) => {

  const body = JSON.parse(event.body);

  if (!body.url) {
    callback('"url" must be present in the body');
    return;
  }

  await downloader(body.url)
    .then(tmpPath => execFile(tmpPath))
    .then(({stdout}) => stdout)
    .then(text => callback(null, responses.success({text: text})))
    .catch(error => callback(error));
};

const downloader = url => {
  const tmpPath = path.join(
    '/tmp',
    `body${crypto.randomBytes(32).toString('hex')}`
  );

  return writeFile(tmpPath, url).then(() => tmpPath);
};

const writeFile = (dest, url) =>
  new Promise((resolve, reject) => {
    let file = fs.createWriteStream(dest);
    // download and get the PDF content
    https.get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => resolve());
    }).on('error', err => reject(err));
  });
