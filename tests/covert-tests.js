const { test } = require('kuta');
const { expect } = require('chai');
const cheerio = require('cheerio');

const md2html = require('../src');

test('convert README.md into html', () => {
  const html = md2html();

  const $html = cheerio.load(html);
  expect($html('h1').text()).to.equal('md2ghp');
  expect($html('h2').text()).to.equal('This is another section');
  expect($html('h3').text()).to.equal('Sub-sub-section');
});
