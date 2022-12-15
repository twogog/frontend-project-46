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
  const stylish = readFileSync(getFixturePath('stylish.txt'), 'utf-8');
  const plain = readFileSync(getFixturePath('plain.txt'), 'utf-8');
  const json = readFileSync(getFixturePath('json.txt'), 'utf-8');

  files.forEach((twofiles) => {
    const [file1, file2] = twofiles;
    const filepath1 = getFixturePath(file1);
    const filepath2 = getFixturePath(file2);
    expect(genDiff(filepath1, filepath2)).toEqual(stylish);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plain);
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(json);
  });
});
