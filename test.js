import { promisify } from 'util';
import fs from 'fs';
import execa from 'execa';
import test from 'ava';

process.chdir(__dirname);

const readFile = promisify(fs.readFile);

test('show version', async t => {
  const { stdout } = await execa('./bin/imagezip.js', ['--version']);
  t.is(stdout, require('./package.json').version);
});
