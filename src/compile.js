#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const marked = require('marked');
const os = require('os');

const README_PATH = path.join(__dirname, '..', 'README.md');
const OUTPUT_PATH = path.join(__dirname, '../gh-pages/', 'index.html');


function dasherize(str) {
  return str.toLowerCase().replace(/\s/g, '-');
}

function extractTOC(parsedMD) {
  const headings = parsedMD
    .filter(block => block.type === 'heading')
    .filter(block => block.depth !== 1);
  const tocItems = headings.map(heading =>
    `<li><a href=#${dasherize(heading.text)}>${heading.text}</a></li>`
  );
  return `<ul>${tocItems.join('')}</ul>`;
}


function heading(text, level) {
  return `<h${level} id="${dasherize(text)}">${text}<\/h${level}>`;
}

function createTOCRenderer(parsedMD) {
  const TOC = extractTOC(parsedMD);

  const TOCInjectRenderer = new marked.Renderer();

  let h2Seen = false;
  TOCInjectRenderer.heading = function(text, level) {
    if (level === 2 && !h2Seen) {
      h2Seen = true;
      return `${TOC}${heading(text, level)}`;
    }
    return heading(text, level);
  };

  return TOCInjectRenderer;
}

function markdownToHTML(markdownContent) {
  const body = marked(mdContent.toString(), { renderer: TOCInjectRenderer });
  return body;
}

function addContentToTemplate(template, content) {
  return template.replace('${contents}', content);
}

module.exports = {
};
