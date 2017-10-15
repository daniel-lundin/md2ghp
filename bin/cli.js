'use strict';

const tmp = require('tmp');
const fs = require('fs');
const path = require('path');
const md2html = require(path.join(__dirname, '../src'));

const html = md2html();
const css = fs.readFileSync(path.join(__dirname, './assets/no-class.min.css'));

const tempDir = tmp.dirSync();
const indexPath = path.join(tempDir.name, 'index.html');
const cssPath = path.join(tempDir.name, 'no-class.min.css');
fs.writeFileSync(indexPath, html);
fs.writeFileSync(cssPath, css);


console.log('indexPath', indexPath);
