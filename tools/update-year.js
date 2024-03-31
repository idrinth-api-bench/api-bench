import {
  readFileSync,
  writeFileSync,
} from 'fs';
import exec from './src/exec.js';

const PREVIOUS = 1;
const year = new Date().getFullYear();
const previous = year - PREVIOUS;

// eslint-disable-next-line no-template-curly-in-string
const branch = exec('echo ${GITHUB_HEAD_REF:-${GITHUB_REF#refs/heads/}}');
exec('git config --global user.email "bot@idrinth-api-ben.ch"',);
exec('git config --global user.name "idrinth api bench bot"',);
exec('git config --global pull.rebase true',);
exec(
  `git fetch origin ${ branch }`,
  true,
);
exec(
  `git checkout -b ${ branch }`,
  true,
);
exec(`git branch -u origin/${ branch }`, true,);
exec(
  `git pull --force origin ${ branch }`,
  true,
);

let modified = false;
for (const file of [
  '/LICENSE',
  '/documentation-website/src/components/footer.tsx',
  '/documentation-website/src/pages/license/index.tsx',
]) {
  const content = readFileSync(
    `${ process.cwd() }${ file }`,
    'utf-8',
  );
  const changed = content.replace(
    new RegExp(`2020-${ previous }`, 'ug',),
    `2020-${ year }`,
  );
  if (changed !== content) {
    writeFileSync(
      `${ process.cwd() }${ file }`,
      changed,
      'utf-8',
    );
    modified = true;
  }
}
if (modified) {
  exec('git add .',);
  exec(`git commit -m "Update copyright year to ${ year }"`, true,);
  exec(
    'git push',
    true,
  );
}
