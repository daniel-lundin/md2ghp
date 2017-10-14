'use strict';

const fs = require('fs');
const path = require('path');

function getReadmeContent() {
  const filenames = ['README.md', 'README.MD', 'readme.md', 'readme.MD'];
  const file = filenames.find((filename) => fs.existsSync(path.join(process.cwd(), filename)));
  if (!file) {
    console.error('No readme found'); // eslint-disable-line
    process.exit(1);
  }
  return fs.readFileSync(file).toString();
}

function getPackageContent() {
  const packagePath = path.join(process.cwd(), 'package.json');
  return require(packagePath);
}

module.exports = {
  getReadmeContent,
  getPackageContent
};
