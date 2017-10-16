'use strict';

const tmp = require('tmp');
const fs = require('fs');
const path = require('path');
const ghpages = require('gh-pages');
const md2html = require(path.join(__dirname, '../src'));

const html = md2html();
const css = fs.readFileSync(path.join(__dirname, './assets/no-class.min.css'));

const tempDir = tmp.dirSync();
const indexPath = path.join(tempDir.name, 'index.html');
const cssPath = path.join(tempDir.name, 'no-class.min.css');
fs.writeFileSync(indexPath, html);
fs.writeFileSync(cssPath, css);


ghpages.publish(tempDir.name, (err) => {
  if (err) {
    console.log('Error publishing gh-page', err); // eslint-disable-line
  }
});
