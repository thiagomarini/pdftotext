'use strict';

const child_process = require('child_process');

module.exports = async file => {

  const options = {
    encoding: 'utf8'
  };

  const args = ['-enc', 'UTF-8', '-layout', file, '-'];

  return new Promise((resolve, reject) => {
    child_process.execFile('pdftotext', args, options, (error, stdout, stderr) => {
      if (error) {
        console.error('pdftotext exec error:', error);

        reject(error);
      }
      resolve({stdout, stderr});
    });
  })
};