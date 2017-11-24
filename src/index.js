'use strict';

const { markdownToHTML } = require('./markdown-parser');
const templating = require('./templating');
const contentFetch = require('./content-fetch.js');

module.exports = function() {
  const readme = contentFetch.getReadmeContent();
  const packageData = contentFetch.getPackageContent();

  const { images, body: readmeAsHTML } = markdownToHTML(readme);
  const templateData = Object.assign({}, { readme: readmeAsHTML }, packageData, { headerImage: images[0] });

  return templating.render(templateData);
};
