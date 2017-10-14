'use strict';

const { markdownToHTML } = require('./markdown-parser');
const templating = require('./templating');
const {
  getReadmeContent,
  getPackageContent
} = require('./content-fetch.js');

module.exports = function() {
  const readme = getReadmeContent();
  const packageData = getPackageContent();

  const readmeAsHTML = markdownToHTML(readme);
  const templateData = Object.assign({}, { readme: readmeAsHTML }, packageData);

  return templating.render(templateData);
};
