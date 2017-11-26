const { test } = require('kuta');
const { expect } = require('chai');
const cheerio = require('cheerio');

const md2html = require('../src');
const contentFetch = require('../src/content-fetch.js');

test('convert README.md into html', () => {
  const html = md2html();

  const $html = cheerio.load(html);
  expect($html('title').text()).to.equal('md2ghp');
  expect($html('meta[property="og:title"]').attr('content')).to.equal('md2ghp');
  expect($html('meta[property="og:description"]').attr('content')).to.equal('Turn README.md to a pretty, search-friendly gh-page');
  expect($html('meta[name="description"]').attr('content')).to.equal('Turn README.md to a pretty, search-friendly gh-page');
  expect($html('meta[name="author"]').attr('content')).to.equal('d-dog@d-dog.se');
  expect($html('h1').text()).to.equal('md2ghp');
  expect($html('h2').first().text()).to.equal('Usage');
});

test.group('images', (t) => {
  const originalGetReadme = contentFetch.getReadmeContent;
  let READMEMock = '';

  t.before(() => {
    contentFetch.getReadmeContent = () => READMEMock;
  });

  t.after(() => {
    contentFetch.getReadmeContent = originalGetReadme;
  });

  t('should turn first found image into og:image', () => {
    READMEMock = `
# first header

![alt text](http://url.to/image.png)
`;
    const $html = cheerio.load(md2html());
    expect($html('meta[property="og:image"]').attr('content')).to.equal('http://url.to/image.png');
  });
});
