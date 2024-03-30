import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from 'node:fs';
import {
  parse,
} from 'yaml';
import {
  fillTemplate,
} from 'markmap-render';
import {
  minify,
} from 'html-minifier';
import {
  createHash,
} from 'crypto';

const FIRST = 0;
const SECOND = 1;
const cwd = process.cwd();
const data = parse(readFileSync(`${ cwd }/data.yml`, 'utf8',),);
const attributes = 'rel=noreferrer target=_blank';
const convert = (node,) => {
  const nN = {};
  const title = node.description ? ` title="${ node.description }"` : '';
  nN.content = node.url
    ? `<a ${ attributes } href="${ node.url }"${ title }>${ node.text }</a>`
    : `<span${ title }>${ node.text }</span>`;
  if (node.children) {
    nN.children = [];
    for (const child of node.children) {
      nN.children.push(convert(child,),);
    }
  }
  return nN;
};
let html = fillTemplate(
  convert(data,),
  {},
);
html = html.replace(
  '<title>Markmap</title>',
  '<title>MindMap | @idrinth/api-bench</title>',
);
html = minify(
  html,
  {
    collapseBooleanAttributes: true,
    conservativeCollapse: false,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: true,
  },
);
if (! existsSync(`${ cwd }/dist`,)) {
  mkdirSync(`${ cwd }/dist`,);
}
if (! existsSync(`${ cwd }/cache`,)) {
  mkdirSync(`${ cwd }/cache`,);
}
html = html.replace(
  '</head>',
  '<link rel=icon type=image/svg+xml href=iab.svg /></head>',
);
for (const match of html.matchAll(/<style>([^<]+)<\/style>/ug,)) {
  // eslint-disable-next-line no-await-in-loop
  html = html.replace(
    match[FIRST],
    `<style>${ match[SECOND].replace(/\s+/ug, '',) }</style>`,
  );
}
for (const match of html.matchAll(/<script src=([^ >]+)><\/script>/ug,)) {
  const hash = createHash('sha256',)
    .update(match[SECOND],)
    .digest('hex',);
  if (! existsSync(`${ cwd }/cache/${ hash }.min.js`,)) {
    // eslint-disable-next-line no-await-in-loop
    const script = await (await fetch(match[SECOND],)).text();
    writeFileSync(
      `${ cwd }/cache/${ hash }.min.js`,
      script,
      'utf8',
    );
  }
  if (! existsSync(`${ cwd }/dist/${ hash }.min.js`,)) {
    writeFileSync(
      `${ cwd }/dist/${ hash }.min.js`,
      readFileSync(`${ cwd }/cache/${ hash }.min.js`, 'utf8',),
      'utf8',
    );
  }
  html = html.replace(
    match[FIRST],
    `<script src=${ hash }.min.js></script>`,
  );
}
writeFileSync(
  `${ cwd }/dist/iab.svg`,
  readFileSync(`${ cwd }/assets/iab.svg`, 'utf8',),
  'utf8',
);
writeFileSync(
  `${ cwd }/dist/index.html`,
  html,
  'utf8',
);
