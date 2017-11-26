'use strict';

const fs = require('fs');
const path = require('path');

const GH_CORNER_TEMPLATE = '../assets/gh-corner.html.tpl';
const TEMPLATE_PATH = path.join(__dirname, '../assets/gh-page.html.tpl');

function renderGhCorner(repository) {
  if (!repository || !repository.url) return '';

  const cornerPath = path.join(__dirname, GH_CORNER_TEMPLATE);
  return fs.readFileSync(cornerPath)
    .toString()
    .replace('${github-link}', repository.url);
}

function render(data) {
  const template = fs.readFileSync(TEMPLATE_PATH).toString();
  return template
    .replace('${gh-corner}', renderGhCorner(data.repository))
    .replace('${contents}', data.readme)
    .replace(/\$\{title\}/g, data.name)
    .replace(/\$\{description\}/g, data.description)
    .replace('${author}', data.author)
    .replace('${sharingImage}', data.headerImage ? data.headerImage.ref : '');
}

module.exports = {
  render
};
