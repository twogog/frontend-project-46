import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('genDiff', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const files = [['file1.json', 'file2.json'], ['file1.yaml', 'file2.yaml']];
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  files.forEach((twofiles) => {
    const [file1, file2] = twofiles;
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    expect(genDiff(filepath1, filepath2)).toEqual(expected);
  });
});
