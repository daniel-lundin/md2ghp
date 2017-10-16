const { test } = require('kuta');
const { expect } = require('chai');
const cheerio = require('cheerio');

const md2html = require('../src');

test('convert README.md into html', () => {
  const html = md2html();

  const $html = cheerio.load(html);
  expect($html('title').text()).to.equal('md2ghp');
  expect($html('meta[name="description"]').attr('content')).to.equal('Turn README.md to a pretty, search-friendly gh-page');
  expect($html('meta[name="author"]').attr('content')).to.equal('d-dog@d-dog.se');
  expect($html('h1').text()).to.equal('md2ghp');
  expect($html('h2').first().text()).to.equal('Usage');
});
