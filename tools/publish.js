import exec from './src/exec.js';
import readline from 'readline';
import {
  existsSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';
import {
  EXIT_FAILURE,
  EXIT_SUCCESS,
  INDENTATION,
} from './src/constants.js';

const delay = (time,) => new Promise((resolve,) => setTimeout(resolve, time,),);
const NPM_PULL_DELAY = 30000;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
},);
rl.question(
  'Enter version to publish: ',
  (version,) => {
    if (! version.match(/^\d+\.\d+\.\d+$/u,)) {
      console.error('Invalid version.',);
      process.exit(EXIT_FAILURE,);
    }
    for (const file of [
      '/package.json',
      '/framework/package.json',
      '/documentation-website/package.json',
      '/history-website/package.json',
      '/history-microservice/package.json',
    ]) {
      if (! existsSync(process.cwd() + file,)) {
        console.error('File ' + file + ' missing',);
        process.exit(EXIT_FAILURE,);
      }
      const data = JSON.parse(readFileSync(
        process.cwd() + file,
        'utf8',
      ),);
      data.version = version;
      writeFileSync(
        process.cwd() + file,
        // eslint-disable-next-line no-undefined
        JSON.stringify(data, undefined, INDENTATION,),
      );
    }
    exec(
      'npm install',
      true,
    );
    exec(
      'cd framework && npm install',
      true,
    );
    writeFileSync(
      process.cwd() + '/framework/LICENSE',
      readFileSync(process.cwd() + '/LICENSE', 'utf8',),
    );
    rl.question('NPM password: ', async(npmPassword,) => {
      exec('npm logout || true', true,);
      exec(
        'npm adduser <<!\n' +
        'idrinth\n' +
        npmPassword + '\n' +
        'webmaster@idrinth.de\n' +
        '!',
        true,
      );
      exec(
        'cd framework && npm publish',
        true,
      );
      exec('git add .',);
      exec(`git commit -m "release ${ version }"`,);
      await delay(NPM_PULL_DELAY,);
      const main = version.replace(/\..+$/u, '',);
      const feature = version.replace(/\.[^.]+$/u, '',);
      rl.question('Docker password: ', (password,) => {
        writeFileSync('./pw', password,);
        exec('cat pw | docker login -u idrinth --password-stdin', true,);
        rmSync('./pw',);
        const args = [
          `--build-arg="BUILD_VERSION=${ version }"`,
          `--build-arg="BUILD_TIME=${ new Date().toISOString() }"`,
          `--build-arg="BUILD_HASH=${ exec('git rev-parse --short HEAD',) }"`,
        ];
        for (const image of [
          'api-bench-build',
          'api-bench',
          'api-bench-gitea-action',
          'api-bench-gitlab-runner',
        ]) {
          const tags = [
            `-t idrinth/${ image }:latest`,
            `-t idrinth/${ image }:${ version }`,
            `-t idrinth/${ image }:${ feature }`,
            `-t idrinth/${ image }:${ main }`,
          ];
          const params = [
            ...args,
            ...tags,
          ];
          exec(
            `cd containers/${ image } && docker build ${ params.join(' ',) } .`,
            true,
          );
          exec(`docker push -a idrinth/${ image }`, true,);
        }
        exec('docker image prune --force', true,);
        process.exit(EXIT_SUCCESS,);
      },);
    },);
  },
);
