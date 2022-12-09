import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('genDiff', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const files = [['file1.json', 'file2.json'], ['file1.yaml', 'file2.yaml']];
  const expected = readFileSync(getFixturePath('expected.txt'), 'utf-8');

  files.forEach((twofiles) => {
    const [file1, file2] = twofiles;
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    expect(genDiff(filepath1, filepath2)).toEqual(expected);
  });
});

// test('trying to understand', () => {
//   const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
//   const filepath1 = getFixturePath('tests1.json');
//   const filepath2 = getFixturePath('tests2.json');
//   const expected = readFileSync(getFixturePath('test.txt'), 'utf-8');
//   expect(genDiff(filepath1, filepath2)).toEqual(expected);
// });
