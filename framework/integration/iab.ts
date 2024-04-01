import mock from 'mock-fs';
import run from '../src/cli/cli';
import {
  expect,
} from 'chai';
import 'mocha';
import {
  spawn,
} from 'child_process';
import url from 'url';
import Counter from '../src/counter';
import {
  STATUSCODE_FAILURE,
} from '../src/constants';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url,),);

const WAIT_CHECK = 7500;
const WAIT_TEST = 15000;
const WAIT_DELAY = 2500;
const delay = (time,) => new Promise((resolve,) => setTimeout(resolve, time,),);

describe('iab-cli', function() {
  before(() => {
    spawn('node', [
      __dirname + '../fixtures/server.cjs',
      '48912',
    ],);
    const config = {
      '/mocked-cli': mock.directory({},),
    };
    config[process.cwd()] = mock.load(process.cwd(),);
    mock(config, {
      createCwd: false,
    },);
    Counter.clear();
  },);
  after(() => {
    mock.restore();
    Counter.clear();
  },);
  it('bench', async() => {
    await delay(WAIT_DELAY,);
    const status = await run([
      '',
      '',
      'bench',
    ], process.cwd() + '/fixtures',);
    await delay(WAIT_CHECK,);
    expect(status,).to.be.eq(STATUSCODE_FAILURE,);
  },).timeout(WAIT_TEST + WAIT_DELAY,);
  it('content', async() => {
    await delay(WAIT_DELAY,);
    const status = await run([
      '',
      '',
      'content',
    ], process.cwd() + '/fixtures',);
    await delay(WAIT_CHECK,);
    expect(status,).to.be.eq(STATUSCODE_FAILURE,);
  },).timeout(WAIT_TEST + WAIT_DELAY,);
},);
