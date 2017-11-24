'use strict';

const marked = require('marked');

function dasherize(str) {
  return str.toLowerCase().replace(/\s/g, '-');
}

function heading(text, level) {
  return `<h${level} id="${dasherize(text)}">${text}<\/h${level}>`;
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

function createRenderer(mdContent) {
  const parsedMD = marked.lexer(mdContent.toString());
  const TOC = extractTOC(parsedMD);

  const renderer = new marked.Renderer();

  let h2Seen = false;
  const images = [];
  renderer.heading = function(text, level) {
    if (level === 2 && !h2Seen) {
      h2Seen = true;
      return `${TOC}${heading(text, level)}`;
    }
    return heading(text, level);
  };

  renderer.image = function(ref, title, text) {
    images.push({ ref, title, text });
    return `<img src="${ref}" alt=${text}" title="${title}" style="max-width: 100%;">`;
  };

  return { images, renderer };
}

function markdownToHTML(markdownContent) {
  const { images, renderer } = createRenderer(markdownContent);
  const body = marked(markdownContent, { renderer });
  return { images, body };
}

module.exports = {
  markdownToHTML
};
